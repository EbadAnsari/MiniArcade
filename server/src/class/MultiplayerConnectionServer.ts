import { Server as HTTPSServer } from "http";
import { Server, ServerOptions, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

import {
	DisconnectEvent,
	Emit,
	EmitEventMap,
	OnlineUser,
	TransactionInformation,
} from "@interface/Emit";
import { GameNamespaceRoute } from "./../interface/GameNamespaceRoute";
import { OnlineUsers } from "./OnlineUsers";

export class MultiplayerConnectionServerError extends Error {
	static notConnected = "Not connected to server.";
	static connctionNotEstablish = "Connection is not establish.";

	constructor(message: string) {
		super(message);
	}
}

export class MultiplayerConnectionServer implements Emit<EmitEventMap> {
	io: Server;

	private onlineUsers = new OnlineUsers();

	private onlineNamespace: Socket<
		DefaultEventsMap,
		DefaultEventsMap,
		DefaultEventsMap,
		any
	> | null = null;

	private checkSocket(socket: Socket | null): socket is Socket {
		if (!this.onlineNamespace)
			throw new MultiplayerConnectionServerError(
				MultiplayerConnectionServerError.notConnected
			);

		return true;
	}

	get onlineCount(): number {
		return this.onlineUsers.length;
	}

	constructor(srv: HTTPSServer, opts: Partial<ServerOptions>) {
		this.io = new Server(srv, opts);

		for (let index = 0; index < 15; index++) {
			this.onlineUsers.addUser({
				email: "user" + index + "@gmail.com",
				onlineUserId: "user-" + index,
				uid: "user" + index,
				userName: "user" + index,
			});
		}
	}

	connect(callback?: () => void) {
		this.io.on("connection", (socket) => {
			this.onlineNamespace = socket;
			callback?.();
		});
	}

	sendOnlineUsers() {
		this.sendData("get.online", this.onlineUsers.toArray());
	}

	/**
	 * Set online user when set.online hit.
	 */
	setOnlineUser(callback?: (onlineUser: OnlineUsers) => void) {
		if (this.checkSocket(this.onlineNamespace))
			this.onlineNamespace.on("set.online", (user: OnlineUser) => {
				// if (this.checkSocket(this.onlineNamespace))
				// 	this.onlineUsers.addUser({
				// 		...user,
				// 		onlineUserId: this.onlineNamespace.id,
				// 	});

				callback?.(this.onlineUsers);
			});
	}

	startGame(gameNamespace: GameNamespaceRoute) {
		this.io.of("/" + gameNamespace).on("tic.tac.toe", (data) => {});
	}

	sendData<T extends keyof EmitEventMap>(
		event: T,
		data: EmitEventMap[T]
	): void {
		// if (this.checkSocket(this.socket))
		this.io.emit(<string>event, data);
	}

	recieveData<T extends keyof EmitEventMap>(
		event: T,
		callback: (
			data: EmitEventMap[T],
			transaction: TransactionInformation
		) => void
	): void {
		this.io.on(<string>event, (data) => {
			if (this.checkSocket(this.onlineNamespace))
				callback(data, {
					onlineUserId: this.onlineNamespace.id,
				});
		});
	}

	respond(transaction: TransactionInformation) {
		// this.io.to(transaction.onlineUserId).;
	}

	disconnect(callback: (event: DisconnectEvent) => void): void {
		this.io.on("disconnect", (reason) => {
			console.log("dc");
			if (this.checkSocket(this.onlineNamespace))
				callback({
					onlineUserId: this.onlineNamespace.id,
					reason,
				});
		});
	}

	error(callback: (error: any) => void): void {
		this.io.on("connection_error", callback);
	}
}
