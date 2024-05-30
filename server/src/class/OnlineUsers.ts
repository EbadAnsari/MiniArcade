import { OnlineUser, TransactionInformation } from "@interface/Emit";

export class OnlineUsers {
	private onlineUsers: (OnlineUser & TransactionInformation)[] = [];

	get length(): number {
		return this.onlineUsers.length;
	}

	/**
	 * Add new online user to the list.
	 * @param userInformation {OnlineUser} user information to be add to an array.
	 */
	addUser(userInformation: OnlineUser & TransactionInformation) {
		if (
			this.onlineUsers.findIndex(
				(value) => value.uid === userInformation.uid
			) === -1
		)
			this.onlineUsers.push(userInformation);
	}

	/**
	 * Remove user from the list.
	 * @param predicate remove user on the basics of predicate function.
	 */
	removeUser(
		predicate: (value: OnlineUser & TransactionInformation) => boolean
	) {
		let iter = 0;
		for (let index = 0; index < this.onlineUsers.length; index++) {
			if (predicate(this.onlineUsers[index])) {
				this.onlineUsers[iter] = this.onlineUsers[index];
				iter++;
			}
		}
		this.onlineUsers.length = iter;
	}

	/**
	 * Give a single user from the list.
	 * @param index
	 * @returns
	 */
	getUser(index: number) {
		return this.onlineUsers.at(index);
	}

	/**
	 * Give the user from the list on the basis of predicate function.
	 * @param predicate
	 * @returns
	 */
	filterUsers(
		predicate: (value: OnlineUser & TransactionInformation) => boolean
	) {
		const users = new OnlineUsers();
		users.onlineUsers = this.onlineUsers.filter(predicate);
		return users;
	}

	toArray() {
		return [...this.onlineUsers];
	}
}
