import { ScoreCollection } from "@class/Score";
import { UserInformation } from "@class/user";
import { auth } from "@util/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import {
	PropsWithChildren,
	createContext,
	useEffect,
	useMemo,
	useState,
} from "react";

export const UserContext = createContext<{
	user: ScoreCollection;
} | null>(null);

export default function DatabaseProvider({
	children,
}: Readonly<PropsWithChildren>) {
	const [userInformation, setUserInformation] = useState<UserInformation>({
		userName: undefined,
		score: {
			cpu: 0,
			you: 0,
		},
		uid: "",
		photoUrl: null,
		email: undefined,
	});

	const userFunctions = new ScoreCollection(
		userInformation,
		setUserInformation,
	);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				userFunctions.setUser(user);
			}
		});
		return () => {
			unsubscribe();
		};
	}, []);

	const user = useMemo<{ user: ScoreCollection }>(
		() => ({
			user: userFunctions,
		}),
		[userFunctions],
	);

	return (
		<UserContext.Provider value={user}>
			<div>{children}</div>
		</UserContext.Provider>
	);
}
