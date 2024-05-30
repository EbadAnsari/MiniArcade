import { OnlineUsers } from "@class/OnlineUsers";
import { Cords, Player } from "../class/matrix-types";
import { UserInformation } from "../class/user";

export interface PlayerPayload {
	cords: Cords;
	player: Player;
}

export interface NumberBattlePayload {}

export interface OnlineUser
	extends Pick<UserInformation, "email" | "userName" | "uid"> {}

export type UserList = OnlineUsers;

export interface TransactionInformation {
	onlineUserId: string;
}

export interface EmitEventMap {
	"tic.tac.toe": PlayerPayload;
	"2048": NumberBattlePayload;
	"set.online": OnlineUser;
	"get.online": (OnlineUser & TransactionInformation)[];
}

export interface Emit<Map> {
	emitData<T extends keyof Map>(event: T, data: Map[T]): void;
	getData<T extends keyof Map>(
		event: T,
		callback: (data: Map[T]) => void,
	): void;
	error(callback: (error: any) => void): void;
}
