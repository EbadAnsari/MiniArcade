import { User } from "@interface/Emit";

type PlayerListProps = {
	userList: User[];
	onClick(user: User, index: number): void;
};

export default function PlayerList({ userList, onClick }: PlayerListProps) {
	return (
		<ul className="scrollbar h-[30rem] space-y-3 overflow-y-scroll">
			{/* <AnimatePresence> */}
			{userList.map((user, index) => (
				<li
					// exit={{
					// 	opacity: 0,
					// }}
					// transition={{
					// 	duration: 0.1,
					// }}
					key={user.uid}
					title={user.email}
					onClick={() => {
						onClick(user, index);
					}}
					className="flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-white/10 px-6 py-3 text-lg text-white hover:border-white"
				>
					<p className="my-auto">{user.userName}</p>
					<img
						src="/public/arrow-left-icon.svg"
						className="w-4 rotate-180 invert"
						alt="Play icon."
					/>
				</li>
			))}
			{/* </AnimatePresence> */}
		</ul>
	);
}
