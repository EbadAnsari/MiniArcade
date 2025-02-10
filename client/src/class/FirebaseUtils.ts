import { auth } from "@util/firebase-config";
import {
	User as FirebaseUser,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { Email, UID } from "./user";

export class FirebaseUtils {
	private _uid: UID;
	get uid(): UID {
		return this._uid;
	}
	set uid(uid: UID) {
		this._uid = uid;
	}

	private _email: Email;
	get email(): Email {
		return this._email;
	}
	set email(email: Email) {
		this._email = email;
	}

	private _profilePhoto: FirebaseUser["photoURL"] = null;
	get photoUrl(): FirebaseUser["photoURL"] {
		return this._profilePhoto;
	}
	set photoUrl(value: FirebaseUser["photoURL"]) {
		this._profilePhoto = value;
	}

	constructor(uid: UID, email: Email) {
		this._uid = uid;
		this._email = email;
	}

	async login(email: string, password: string) {
		console.log("[login] processing...");
		const login = await signInWithEmailAndPassword(auth, email, password);
		console.log("[login] done.");
		return login;
	}

	async signin(email: string, password: string) {
		return createUserWithEmailAndPassword(auth, email, password);
	}

	async logout() {
		console.log("[logout] processing...");
		const logout = await signOut(auth);
		console.log("[logout] done.");
		return logout;
	}
}
