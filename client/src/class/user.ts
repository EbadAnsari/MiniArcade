import { User } from "firebase/auth";

export interface CPUScore {
	you: number;
	cpu: number;
}

export type UserName = string | undefined;

export type UID = User["uid"];
export type Email = NonNullable<User["email"]> | undefined;

export enum Collections {
	score = "score",
}

export interface UserInformation {
	score: CPUScore;
	uid: UID;
	userName: UserName;
	photoUrl: User["photoURL"];
	email: Email;
}
