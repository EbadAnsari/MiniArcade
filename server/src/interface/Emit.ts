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

export interface NumberBattlePayload {}

export interface OnlineUser
	extends Pick<UserInformation, "email" | "userName" | "uid"> {}

export interface TransactionInformation {
	onlineUserId: string;
}

export interface Request extends TransactionInformation {}

export interface Respond {}

export interface DisconnectEvent extends TransactionInformation {
	reason: any;
}

export interface EmitEventMap {
	"tic.tac.toe": PlayerPayload;
	"2048": NumberBattlePayload;
	"set.online": OnlineUser;
	"get.online": OnlineUser[];
	request: Request;
}

export interface Emit<Map> {
	sendData<T extends keyof Map>(event: T, data: Map[T]): void;
	recieveData<T extends keyof Map>(
		event: T,
		callback: (data: Map[T], transaction: TransactionInformation) => void
	): void;
	error(callback: (error: any) => void): void;
	disconnect(callbac: (event: DisconnectEvent) => void): void;
}
