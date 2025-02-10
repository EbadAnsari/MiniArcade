import { MultiplayerClient } from "@class/Multiplayer";
import { useUser } from "@context/hooks/useUser";
import { useUserList } from "@hook/useUserList";
import { dev } from "@util/development";
import { getValue } from "@util/getValue";
import { PropsWithChildren, createContext, useContext, useEffect } from "react";

const multiplayer = new MultiplayerClient();

const MultiplayerContext = createContext<{
	multiplayer: MultiplayerClient;
	onlineUsers: ReturnType<typeof useUserList>;
	requestUsers: ReturnType<typeof useUserList>;
} | null>(null);

export function useMultiplayer() {
	const multiplayer = useContext(MultiplayerContext);
	if (multiplayer === null)
		throw new Error(
			"`useMultiplayer` must be used within `OnlineUserProvider`",
		);

	return multiplayer;
}

const password = "ebadansari";

export const u: { email: string; userName: string }[] = [
	{
		email: "rishab@gmail.com",
		userName: "rishab",
	},
	{
		email: "sak@gmail.com",
		userName: "sak",
	},
	{
		email: "fatema@gmail.com",
		userName: "fatema",
		// socketId: 4SdfZYiurBRLgUKYAAAD
		// socketId:
	},
	{
		email: "ebadansari414@gmail.com",
		userName: "ebad_ansari",
	},
	{
		email: "rkh@gmail.com",
		userName: "rkh",
	},
	{
		email: "sana@gmail.com",
		userName: "sana",
	},
	{
		email: "jhon@gmail.com",
		userName: "jhon",
	},
];

export const value = dev && getValue(u.length);

export default function MultiplayerProvider({
	children,
}: Readonly<PropsWithChildren>) {
	const onlineUsers = useUserList();
	const requestUsers = useUserList();

	const { user } = useUser();

	const { userName, email } = u[value];
	if (!user.isLoggedIn) user.login(email, password);

	async function handleConnect() {
		// This commend will be removed in future.

		const { uid } = user;

		console.log(uid, email, userName, value);
		// This commend will be removed in future.
		if (userName) document.title = userName;

		multiplayer.emit("set.online", {
			email,
			uid,
			userName,
		});

		multiplayer.on("get.online", (users) => {
			onlineUsers.setUsersList(users.filter((user) => user.uid !== uid));
			console.log("All users : ", users);
		});

		multiplayer.on("add.online", (user) => {
			onlineUsers.addUser(user);
			console.log("Single : ", user.userName);
		});

		multiplayer.on(
			"remove.online",
			async ({ email, userName, uid: logoutUID }) => {
				if (logoutUID === uid) {
					const { socketId } = multiplayer;
					try {
						await user.logout();
						multiplayer.disconnect();

						multiplayer.emit("ack.remove.online", {
							email,
							socketId,
							uid,
							userName,
							status: {
								message: "Sucessfully logout the user.",
								sucess: true,
							},
						});
						console.log("Logged out");
					} catch (e) {
						multiplayer.emit("ack.remove.online", {
							email,
							socketId,
							uid,
							userName,
							status: {
								message: "Error while logout the user.",
								error: true,
							},
						});
					}
				}
			},
		);

		multiplayer.on("play.request", (req) => {
			alert(req.userName);
			requestUsers.addUser(req);
			req.oppositePlayerUID;
		});

		multiplayer.on("get.play.request", (users) => {
			requestUsers.setUsersList(users);
		});
	}

	useEffect(() => {
		if (!multiplayer.connected && user.isLoggedIn) {
			multiplayer.connect(handleConnect);
		}
	}, [user.isLoggedIn]);

	return (
		<MultiplayerContext.Provider
			value={{ multiplayer, onlineUsers, requestUsers }}
		>
			{children}
		</MultiplayerContext.Provider>
	);
}
