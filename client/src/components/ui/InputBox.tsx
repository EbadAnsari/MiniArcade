import { Player } from "@class/matrix-types";
import { InputHTMLAttributes, useRef, useState } from "react";
import { SelectPlayer } from "./Arrow";

interface InputBoxProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	player: Player;
}

export default function InputBox({
	label,
	player,
	id,
	type,
	X,
	O,
	className,
	...props
}: Readonly<InputBoxProps & Partial<SelectPlayer>>) {
	const inputRef = useRef<HTMLInputElement>(null);

	const [passwordShow, setPasswordShow] = useState(false);

	// FIXME : implement X and O
	// TODO : create loading button with promises to complete loading

	return (
		<div className="space-y-2">
			<label
				htmlFor={id}
				className="block text-lg font-semibold text-arsenic-100"
			>
				{label}
			</label>
			<div className="flex rounded-lg bg-arsenic-800 hover:outline-x [&:has(>_input:focus)]:outline-x">
				<input
					type={
						type === "password"
							? passwordShow
								? "text"
								: "password"
							: type
					}
					{...props}
					ref={inputRef}
					id={id}
					className={`w-full rounded-lg bg-arsenic-800 py-[18px] pl-6 ${type === "password" ? "rounded-r-none" : "pr-5"} text-xl font-bold selection:text-white ${
						player === "X"
							? "text-x selection:bg-x placeholder:text-x-dimed"
							: "text-o selection:bg-o placeholder:text-o-dimed"
					} ${className}`}
				/>
				{type === "password" && (
					<button
						className={`block h-full cursor-pointer rounded-r-lg px-3 py-[18px] text-lg font-semibold text-arsenic-100 ${passwordShow ? "bg-o text-white focus-visible:outline-o" : "hover:bg-white/5 hover:text-white focus:bg-white/5 focus:text-white focus-visible:outline-white"}`}
						onClick={() => {
							setPasswordShow(!passwordShow);
						}}
					>
						Show
					</button>
				)}
			</div>
		</div>
	);
}
