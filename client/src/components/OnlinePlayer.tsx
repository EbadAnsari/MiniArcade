import { useMultiplayer } from "@context/providers/MultiplayerProvider";
import { SocketUser } from "@interface/Emit";
import Tabs from "@ui/Tabs";
import { useState } from "react";
import PlayerList from "./PlayerList";
import RouteAnimate from "./RouteAnimation";

export default function OnlinePlayer() {
	const { onlineUsers, requestUsers, multiplayer } = useMultiplayer();

	// const { user: u } = useUser();

	const [tab, setTab] = useState(0);

	const list = [
		{
			data: onlineUsers.usersList,
			title: "Online",
			description: "Online users",
			onClick(user: SocketUser) {
				// requestUsers.addUser(user);
				// onlineUsers.removeUser(
				// 	(_user) => _user.socketId === user.socketId,
				// );

				multiplayer.emit("play.request", {
					game: "tic.tac.toe",
					oppositePlayerUID: user.socketId,
					email: user.email,
					uid: user.uid,
					userName: user.userName,
				});
			},
		},
		{
			data: requestUsers.usersList,
			title: "Requested",
			description: "You requested to play",
			onClick(user: SocketUser) {
				user;
			},
		},
		{
			data: onlineUsers.usersList,
			title: "Play",
			description: "Request accepted to play",
			onClick(user: SocketUser) {
				user;
				multiplayer.emit("play.response", {
					socketId: multiplayer.socketId,
				});
			},
		},
	];

	return (
		<RouteAnimate>
			<div>
				<h1 className="mx-auto w-fit text-3xl font-bold text-o">
					Online Player
				</h1>
				<Tabs
					className="my-2"
					tabs={list.map((value) => ({
						description: value.description,
						title: value.title,
					}))}
					onClick={(index) => {
						setTab(index);
					}}
				/>
				<PlayerList
					userList={list[tab].data}
					onClick={list[tab].onClick}
				/>
			</div>
		</RouteAnimate>
	);
}
