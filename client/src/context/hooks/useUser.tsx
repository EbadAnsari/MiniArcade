import { UserContext } from "@context/providers/DatabaseProvider";
import { useContext } from "react";

export function useUser() {
	const user = useContext(UserContext);
	if (user === null)
		throw new Error("'useUser' must be wrap inside the 'TicTacToe'.");
	return user;
}
