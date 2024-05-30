import { useOnlineUsers } from "@context/providers/OnlineUserProvider";
import Tabs from "@ui/Tabs";
import { useState } from "react";
import PlayerList from "./PlayerList";
import RouteAnimate from "./RouteAnimation";

export default function OnlinePlayer() {
	const onlineUsers = useOnlineUsers();

	const [tab, setTab] = useState(0);

	const list = [
		{
			data: onlineUsers,
			title: "Online",
			description: "Online users",
		},
		{
			data: onlineUsers,
			title: "Requested",
			description: "You requested to play",
		},
		{
			data: onlineUsers,
			title: "Play",
			description: "Request accepted to play",
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
					description={list[tab].description}
				/>
			</div>
		</RouteAnimate>
	);
}
