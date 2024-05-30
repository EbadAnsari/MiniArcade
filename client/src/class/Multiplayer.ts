import { Emit, EmitEventMap } from "@interface/Emit";
import { socketUrl } from "@util/development";
import { io } from "socket.io-client";

export class MultiplayerConnectionError extends Error {
	static notConnected = "Not connected to server.";
	static connctionNotEstablish = "Connection is not establish.";

	constructor(message: string) {
		super(message);
	}
}

export class MultiplayerConnection implements Emit<EmitEventMap> {
	private socket = io(socketUrl);

	get connected(): boolean {
		return this.socket.connected;
	}

	get id(): string {
		if (this.socket.id) return this.socket.id;
		throw new MultiplayerConnectionError(
			MultiplayerConnectionError.notConnected,
		);
	}

	get userId(): string {
		if (this.socket.id) return this.socket.id;
		throw new MultiplayerConnectionError(
			MultiplayerConnectionError.notConnected,
		);
	}

	connect(callback: () => void) {
		this.socket.on("connect", () => {
			callback();
		});
	}

	error(callback: (error: any) => void) {
		this.socket.on("connect_error", (error) => {
			callback(error);
			throw error;
		});
	}

	emitData<T extends keyof EmitEventMap>(
		event: T,
		data: EmitEventMap[T],
	): void {
		this.socket.emit(<string>event, data);
	}

	getData<T extends keyof EmitEventMap>(
		event: T,
		callback: (data: EmitEventMap[T]) => void,
	): void {
		this.socket.on(<string>event, callback);
	}

	setOnlineUser(): void {
		this.socket.emit("set.online", {
			uid: "<firebase-id>",
		});
	}

	getOnlineUsers(callback: (onlineUsers: string[]) => void): void {
		this.socket.on("get.online", (onlineUsers) => {
			callback(onlineUsers);
		});
	}
}
