import { Emit, EmitEventMap } from "@interface/Emit";
import { socketUrl } from "@util/development";
import { io } from "socket.io-client";

export class MultiplayerConnectionError extends Error {
	public static readonly notConnected = "Not connected to server.";
	public static readonly connctionNotEstablish =
		"Connection is not establish.";
}

export class MultiplayerClient implements Emit<EmitEventMap> {
	socket = io(socketUrl, {
		autoConnect: false,
	});

	get connected(): boolean {
		return this.socket.connected;
	}

	get socketId(): string {
		if (this.socket.id) return this.socket.id;
		throw MultiplayerConnectionError.notConnected;
	}

	connect(callback: () => void) {
		this.socket.connect();
		console.log("[socket] connecting...");
		this.socket.on("connect", () => {
			console.log("[socket] connected.");
			callback();
		});
	}

	disconnect() {
		this.socket.disconnect();
	}

	error(callback: (error: any) => void) {
		this.socket.on("connect_error", (error) => {
			callback(error);
			throw error;
		});
	}

	emit<T extends keyof EmitEventMap>(event: T, data: EmitEventMap[T]): void {
		this.socket.emit(<string>event, data);
	}

	on<T extends keyof EmitEventMap>(
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
