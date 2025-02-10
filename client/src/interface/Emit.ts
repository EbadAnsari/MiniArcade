import { Cords, Player } from "../class/matrix-types";
import { UserInformation } from "../class/user";

export interface GameList {
	"tic.tac.toe": PlayerPayload;
	"2048": NumberBattlePayload;
}

export interface PlayerPayload {
	cords: Cords;
	player: Player;
}

export interface NumberBattlePayload {}

export interface User
	extends Pick<UserInformation, "email" | "userName" | "uid"> {}

export interface TransactionInformation {
	/**
	 * Socket id of the user.
	 */
	socketId: string;
}

export interface SocketUser extends User, TransactionInformation {}

/**
 * Interface is used to send request to opposite player.
 */
export interface Request extends User {
	/**
	 * Socket id of the opposite user.
	 */
	oppositePlayerUID: string;

	/**
	 * Game to play with oppisite player.
	 */
	game: keyof GameList;
}

export interface Response extends TransactionInformation {}

export type Acknowledge = {
	status: { message: string } & (
		| { sucess: true; error?: false }
		| { error: true; sucess?: false }
	);
};

export interface OnlineEventMap {
	/**
	 * Set the online user.
	 */
	"set.online": User;

	/**
	 * Get all the online users.
	 */
	"get.online": User[];

	/**
	 * Remove the already login user from the current computer.
	 */
	"remove.online": User;

	/**
	 * Receive the currently join player to all the other players.
	 */
	"add.online": User;

	/**
	 * Acknowledge the remove user.
	 */
	"ack.remove.online": SocketUser & Acknowledge;
}

export interface RequestEventMap {
	/**
	 * Play request from another user to user.
	 */
	"play.request": Request;

	/**
	 * Get all the players who requested to play.
	 */
	"get.play.request": Request[];
}

export interface ResponseEventMap {
	/**
	 * Play response from user to another user.
	 */
	"play.response": Response;
}

export interface EmitEventMap
	extends GameList,
		OnlineEventMap,
		RequestEventMap,
		ResponseEventMap {}

export interface Emit<Map> {
	/**
	 * Connect is used to connect the player to the socket server.
	 * @param callback a callback function to listen to the connect event.
	 */
	connect(callback: () => void): void;

	/**
	 * Disconnect is used to disconnect the player to the socket server.
	 */
	disconnect(): void;

	/**
	 * Send the data to all the users in the connection according to the event.
	 * @param event type of event, whether it is request or response, etc.
	 * @param data payload depend on the event.
	 */
	emit<T extends keyof Map>(event: T, data: Map[T]): void;

	// /**
	//  * Send the data to the particular users (socketId) in the connection according to the event.
	//  * @param socketId unique identifier of the user to send the to data.
	//  * @param event type of event, whether it is request or response, etc.
	//  * @param data payload depend on the event.
	//  */
	// emitTo<T extends keyof Map>(
	// 	socketId: TransactionInformation["socketId"],
	// 	event: T,
	// 	data: Map[T],
	// ): void;

	/**
	 * An event listener to listen to the event.
	 * @param event type of event to listen.
	 * @param callback a callback function to listen to the event.
	 */
	on<T extends keyof Map>(event: T, callback: (data: Map[T]) => void): void;

	/**
	 * An event listener to listen to the error event.
	 * @param callback a callback function to listen to the event.
	 */
	error(callback: (error: any) => void): void;
}
