import { Server as HTTPSServer } from "http";
import { Server, ServerOptions, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

import {
	DisconnectEvent,
	Emit,
	EmitEventMap,
	TransactionInformation,
} from "@interface/Emit";
import { GameNamespaceRoute } from "./../interface/GameNamespaceRoute";
import { OnlineUser } from "./OnlineUsers";

export class MultiplayerConnectionServerError extends Error {
	static notConnected = "Not connected to server.";
	static connctionNotEstablish = "Connection is not establish.";

	constructor(message: string) {
		super(message);
	}
}

export class MultiplayerConnectionServer implements Emit<EmitEventMap> {
	io: Server;

	onlineUsers = new OnlineUser();

	onlineNamespace: Socket<
		DefaultEventsMap,
		DefaultEventsMap,
		DefaultEventsMap,
		any
	> | null = null;

	// get onlineCount(): number {
	// return this.onlineUsers.length;
	// }

	constructor(srv: HTTPSServer, opts: Partial<ServerOptions>) {
		this.io = new Server(srv, opts);

		// for (let index = 0; index < 15; index++) {
		// 	this.onlineUsers.addUser({
		// 		email: "user" + index + "@gmail.com",
		// 		socketId: "user-" + (index + 1),
		// 		uid: "user" + (index + 1),
		// 		userName: "user" + (index + 1),
		// 	});
		// }
	}

	getSocketById(socketId: TransactionInformation["socketId"]) {
		return this.io.sockets.sockets.get(socketId);
	}

	connect(callback?: () => void) {
		this.io.on("connection", (socket) => {
			this.onlineNamespace = socket;
			callback?.();
		});
	}

	disconnect(socketId?: TransactionInformation["socketId"]) {
		if (this.onlineNamespace === undefined) return;
		if (socketId) this.getSocketById(socketId)?.disconnect(true);
		else this.onlineNamespace?.disconnect(true);
	}

	// sendOnlineUsers() {
	// 	this.emit("get.online", this.onlineUsers.toArray());
	// }

	startGame(gameNamespace: GameNamespaceRoute) {
		this.io.of("/" + gameNamespace).on("tic.tac.toe", (data) => {});
	}

	emit<T extends keyof EmitEventMap>(event: T, data: EmitEventMap[T]): void {
		this.io.emit(<string>event, data);
	}

	emitTo<T extends keyof EmitEventMap>(
		socketId: string | string[],
		event: T,
		data: EmitEventMap[T]
	): void {
		this.io.to(socketId).emit(<string>event, data);
	}

	on<T extends keyof EmitEventMap>(
		event: T,
		callback: (
			data: EmitEventMap[T],
			socket: Socket<
				DefaultEventsMap,
				DefaultEventsMap,
				DefaultEventsMap,
				any
			>
		) => void
	): void {
		const onlineNamespace = this.onlineNamespace;
		if (onlineNamespace) {
			onlineNamespace.on(<string>event, (data) => {
				callback(data, onlineNamespace);
			});
		}
	}

	once<T extends keyof EmitEventMap>(
		event: T,
		callback: (data: EmitEventMap[T]) => void
	): void {
		if (this.onlineNamespace) {
			this.onlineNamespace.once(<string>event, (data) => {
				callback(data);
			});
		}
	}

	// requestUser(req: Request) {
	// 	// console.log(req);
	// 	this.io.to(req.oppositePlayerUID).emit("play.request", req);
	// }

	respond(transaction: TransactionInformation) {
		// this.io.to(transaction.onlineUserId).;
	}

	disconnecting(
		callback: (
			event: DisconnectEvent,
			socket: Socket<
				DefaultEventsMap,
				DefaultEventsMap,
				DefaultEventsMap,
				any
			>
		) => void
	): void {
		const onlineNamespace = this.onlineNamespace;
		if (onlineNamespace)
			onlineNamespace.on("disconnecting", (reason) => {
				callback({ reason }, onlineNamespace);
			});
	}

	error(callback: (error: any) => void): void {
		this.io.on("connection_error", callback);
	}
}
