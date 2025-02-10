import { TransactionInformation, User } from "@interface/Emit";
import { FilterQuery } from "mongoose";
import OnlineUserModel, { OnlineUserDocument } from "./../model/OnlinUsers";
import { dbConnect } from "./../util/dbConnect";

export class OnlineUser {
	constructor() {
		dbConnect();
	}

	get countUser() {
		return new Promise((resolve) => {
			OnlineUserModel.countDocuments().then((count) => {
				resolve(count);
			});
		});
	}

	/**
	 * If the user is already in the database update it's socketId otherwise add the document.
	 * @param userInformation {SocketUser} user information to be add to an array.
	 */
	async addOrUpdateUser({ uid, ...userInformation }: User) {
		return await OnlineUserModel.findOneAndUpdate(
			{
				uid,
			},
			userInformation,
			{
				upsert: true,
			}
		);
		// return await onlineUser.save();
	}

	/**
	 * Remove user from the list.
	 * @param predicate remove user on the basics of predicate function.
	 */
	async removeUser(filter?: FilterQuery<OnlineUserDocument> | undefined) {
		return await OnlineUserModel.deleteMany(filter);
	}

	/**
	 * Give a single user from the OnlineUsers Collection.
	 * @param uid
	 * @returns
	 */
	getUserById(uid: User["uid"]) {
		return OnlineUserModel.findOne({ uid });
	}

	/**
	 * Give the user from the list on the basis of predicate function.
	 * @param predicate
	 * @returns
	 */
	filterUsers(predicate: (value: User) => boolean) {
		// const users = new OnlineUser();
		// users.onlineUsers = this.onlineUsers.filter(predicate);
		// return users;
	}

	async findUserBySocketId(socketId: TransactionInformation["socketId"]) {
		return await OnlineUserModel.findOne({ socketId });
	}

	getAllUsers() {
		return OnlineUserModel.find(
			{},
			{
				_id: false,
				__v: false,
			}
		);
	}
}
