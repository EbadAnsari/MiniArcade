import { TransactionInformation, User } from "@interface/Emit";
import { useState } from "react";

export function useUserList(users?: (User & TransactionInformation)[]) {
	const [usersList, setUsersList] = useState<User[]>(users ?? []);

	function addUser(userInformation: User) {
		// if (
		// 	usersList.findIndex(
		// 		(value) => value.uid === userInformation.uid,
		// 	) === -1
		// )
		setUsersList([...usersList, userInformation]);
	}

	function removeUser(predicate: (user: User) => boolean) {
		setUsersList(usersList.filter((user) => !predicate(user)));
	}

	return { usersList, addUser, removeUser, setUsersList };
}
