import { MultiplayerConnection } from "@class/Multiplayer";
import { OnlineUsers } from "@class/OnlineUsers";
import Chance from "chance";
import {
	PropsWithChildren,
	createContext,
	useContext,
	useRef,
	useState,
} from "react";

const OnlineUser = createContext<OnlineUsers>(new OnlineUsers());

export function useOnlineUsers() {
	return useContext(OnlineUser);
}

export default function OnlineUserProvider({ children }: PropsWithChildren) {
	const { current: multiplayer } = useRef<MultiplayerConnection>(
		new MultiplayerConnection(),
	);

	const [onlineUsers, setOnlineUsers] = useState<OnlineUsers>(
		new OnlineUsers(),
	);

	if (!multiplayer.connected) {
		multiplayer.connect(() => {
			const chance = new Chance();

			const object = {
				email: chance.email(),
				userName: chance.name(),
				uid: chance.android_id(),
			};

			multiplayer.emitData("set.online", object);

			multiplayer.getData("get.online", (users) => {
				setOnlineUsers(new OnlineUsers(users));
			});
		});
	}

	return (
		<OnlineUser.Provider value={onlineUsers}>
			{children}
		</OnlineUser.Provider>
	);
}
