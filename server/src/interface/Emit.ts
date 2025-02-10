import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

type Player = "X" | "O";

type Coordinates = 0 | 1 | 2;

type Cords = { row: Coordinates; column: Coordinates };

export interface UserInformation {
	uid: string;
	userName: string;
	email: string;
}

export interface PlayerPayload {
	cords: Cords;
	player: Player;
}

export interface GameList {
	"tic.tac.toe": PlayerPayload;
	"2048": NumberBattlePayload;
}

export interface NumberBattlePayload {}

export interface User
	extends Pick<UserInformation, "email" | "userName" | "uid"> {}

export interface TransactionInformation {
	/**
	 * Socket id of the user.
	 */
	socketId: Socket["id"];
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

export interface DisconnectEvent {
	reason: any;
}

interface AcknowledgeBody {
	message: string;
	status: boolean;
}

export type Acknowledge = {
	status: { message: string } & (
		| { sucess: true; error?: undefined }
		| { error: true; sucess?: undefined }
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
	 * Send this newly joined player to all the other players.
	 */
	"add.online": User;

	/**
	 * Remove the already login user from the current computer.
	 */
	"remove.online": User;

	/**
	 * Acknowledge the remove user.
	 */
	"ack.remove.online": User & Acknowledge;
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
	 * Send the data to all the users in the connection according to the event.
	 * @param event type of event, whether it is request or response, etc.
	 * @param data payload depend on the event.
	 */
	emit<T extends keyof Map>(event: T, data: Map[T]): void;

	/**
	 * Send the data to the particular users (socketId) in the connection according to the event.
	 * @param socketId unique identifier of the user to send the to data.
	 * @param event type of event, whether it is request or response, etc.
	 * @param data payload depend on the event.
	 */
	emitTo<T extends keyof Map>(
		socketId: TransactionInformation["socketId"],
		event: T,
		data: Map[T]
	): void;

	/**
	 * An event listener to listen to the event.
	 * @param event type of event to listen.
	 * @param callback a callback function to listen to the event.
	 */
	on<T extends keyof Map>(
		event: T,
		callback: (
			data: Map[T],
			socket: Socket<
				DefaultEventsMap,
				DefaultEventsMap,
				DefaultEventsMap,
				any
			>
		) => void
	): void;

	/**
	 * An event listener to listen to the event only once.
	 * @param event type of event to listen.
	 * @param callback a callback function to listen to the event.
	 */
	once<T extends keyof Map>(event: T, callback: (data: Map[T]) => void): void;

	/**
	 * An event listener to listen to the error event.
	 * @param callback a callback function to listen to the event.
	 */
	error(callback: (error: any) => void): void;

	/**
	 * An event listener to listen to the disconnect event.
	 * @param callback a callback function to listen to the event.
	 */
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
	): void;
}
