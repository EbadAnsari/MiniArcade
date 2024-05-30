import { Player } from "@class/matrix-types";
import { O } from "@icon/O";
import { X } from "@icon/X";
import Base from "@ui/Base";
import { useState } from "react";

interface ChoosePlayerProps {
	player: Player;
	onChange: (player: Player) => void;
}

export function ChoosePlayer({ player, onChange }: ChoosePlayerProps) {
	const [choosePlayer, setChoosePlayer] = useState<Player>(player);

	onChange(choosePlayer);

	return (
		<Base className="p-3">
			<p className="py-3 text-center text-lg font-bold uppercase text-arsenic-100">
				Pick Player 1's Mark
			</p>
			<div className="rounded-xl bg-arsenic-800 p-2">
				<div className="relative grid h-14 grid-cols-2 items-center justify-around gap-2">
					<div
						style={{
							animationFillMode:
								choosePlayer === "X" ? "backwards" : "forwards",
							MozAnimationFillMode:
								choosePlayer === "X" ? "backwards" : "forwards",
							WebkitAnimationFillMode:
								choosePlayer === "X" ? "backwards" : "forwards",
						}}
						className={`absolute top-0 h-full w-1/2 ${
							choosePlayer === "X"
								? "animate-[left-right_150ms]"
								: "animate-[right-left_150ms]"
						} rounded-lg bg-arsenic-400 transition-all`}
					></div>
					<button
						tabIndex={choosePlayer === "X" ? -1 : 0}
						className="mx-1 flex h-5/6 cursor-pointer items-center justify-center rounded-sm focus-visible:outline-x"
						onClick={() => {
							setChoosePlayer("X");
						}}
					>
						<div className="relative w-10">
							<X className="fill-x" />
						</div>
					</button>
					<button
						tabIndex={choosePlayer === "O" ? -1 : 0}
						className="mx-1 flex h-5/6 cursor-pointer items-center justify-center rounded-sm focus-visible:outline-o"
						onClick={() => {
							setChoosePlayer("O");
						}}
					>
						<div className="relative w-10">
							<O className="fill-o" />
						</div>
					</button>
				</div>
			</div>
			<p className="flex items-center justify-center gap-1 pt-3 text-center font-semibold text-arsenic-100">
				<span>Remember:</span>
				<span className="relative inline-block w-4">
					{choosePlayer === "X" ? (
						<X className="fill-arsenic-100" />
					) : (
						<O className="fill-arsenic-100" />
					)}
				</span>
				<span>Goes First</span>
			</p>
		</Base>
	);
}
