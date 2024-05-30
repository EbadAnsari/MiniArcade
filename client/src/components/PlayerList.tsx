import { UserList } from "@interface/Emit";

type PlayerListProps = {
	userList: UserList;
	description: string;
};

export default function PlayerList({ userList }: PlayerListProps) {
	return (
		<ul className="scrollbar h-[30rem] space-y-3 overflow-y-scroll">
			{userList.toArray().map((user) => (
				<li
					key={user.onlineUserId}
					title={user.email}
					className="flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-white/10 px-6 py-3 text-lg text-white hover:border-white"
				>
					<p className="my-auto">{user.userName}</p>
					<img
						src="arrow-left-icon.svg"
						className="w-4 rotate-180 invert"
						alt="Play icon."
					/>
				</li>
			))}
		</ul>
	);
}
