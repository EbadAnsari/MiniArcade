import { FirebaseUtils } from "@class/FirebaseUtils";
import { CustomDispatch } from "@class/HandleDispatch";
import {
	CPUScore,
	Collections,
	Email,
	UserInformation,
	UserName,
} from "@class/user";
import { firestore } from "@util/firebase-config";
import { FirebaseError } from "firebase/app";
import { User as FirebaseUser } from "firebase/auth";
import {
	DocumentData,
	DocumentReference,
	doc,
	getDoc,
	setDoc,
	updateDoc,
} from "firebase/firestore";

export class ScoreCollection extends FirebaseUtils {
	private readonly collectionName: Collections = Collections.score;
	private docRef: (
		uid: string,
	) => DocumentReference<DocumentData, DocumentData> = (uid: string) =>
		doc(firestore, this.collectionName, uid);
	private _score: CPUScore;
	private _userName: UserName;

	get score(): CPUScore {
		return this._score;
	}
	set score(score: CPUScore) {
		this._score = score;
	}

	get userName(): UserName {
		return this._userName;
	}
	set userName(userName: UserName) {
		this._userName = userName;
	}

	get isLoggedIn() {
		return this.email !== undefined;
	}

	private dispatch: CustomDispatch<UserInformation>;

	private run(userInformation?: UserInformation) {
		this.dispatch(
			userInformation ?? {
				score: this.score,
				uid: this.uid,
				userName: this.userName,
				photoUrl: this.photoUrl,
				email: this.email,
			},
		);
	}

	constructor(
		data: UserInformation,
		dispatch: CustomDispatch<UserInformation>,
	) {
		super(data.uid, data.email);

		this.dispatch = dispatch;

		if (data.uid) this.uid = data.uid;

		this._score = data.score;
		this._userName = data.userName;
	}

	private async getUserInformation(uid: string) {
		return await getDoc(this.docRef(uid));
	}

	private initializeInformation(data: UserInformation) {
		if (data.userName === undefined)
			throw new Error("userName is not set.");
		if (this.uid === undefined) throw new Error("uid is not set.");
		return setDoc(this.docRef(this.uid), data);
	}

	async updateScore(score: CPUScore) {
		if (this.uid === undefined) throw new Error("User id is not.");
		try {
			await updateDoc(this.docRef(this.uid), { score });
		} catch (error) {
			if (error instanceof FirebaseError) {
				console.log(error.message);
			}
		}
	}

	async setUser(user: FirebaseUser) {
		this.uid = user.uid;
		this.photoUrl = user.photoURL;
		this.email = user.email as Email;

		const snapshot = await this.getUserInformation(this.uid);

		const userInformation: UserInformation = snapshot.exists()
			? <UserInformation>snapshot.data()
			: {
					score: this.score,
					uid: this.uid,
					userName: this.userName,
					photoUrl: this.photoUrl,
					email: this.email,
				};

		if (!snapshot.exists()) {
			await this.initializeInformation(userInformation);
		}
		this.score = userInformation.score;
		this.userName = userInformation.userName;
		this.email = userInformation.email;

		this.run(userInformation);
	}

	unSetUser() {
		this.uid = "";
		this.userName = undefined;
		this.score = { cpu: 0, you: 0 };
		this.photoUrl = null;
		this.email = undefined;

		this.run();
	}
}
