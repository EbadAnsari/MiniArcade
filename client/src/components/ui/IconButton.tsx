import { SelectPlayer } from "@ui/Arrow";
import { AppRoutes } from "@util/AppRoutes";
import { selectUserFromInput } from "@util/selectUserFromInput";
import { MouseEvent, ReactNode } from "react";
import { LinkWraper } from "./LinkWraper";

interface IconButtonProps {
	iconSrc?: string;
	align?: "left" | "right";
	className?: string;
	onClick?: (
		event: MouseEvent<HTMLDivElement> | MouseEvent<HTMLAnchorElement>,
	) => void;
	title?: string;
	to?: AppRoutes;
	prevent?: true;
}

type TextOrChildren =
	| {
			text: string;
			children?: false;
	  }
	| {
			text?: false;
			children: ReactNode;
	  };

export default function IconButton({
	X,
	O,
	choosePlayer,
	text,
	children,
	className,
	iconSrc,
	align,
	to,
	// prevent,
	onClick,
	...rest
}: Readonly<IconButtonProps & TextOrChildren & Partial<SelectPlayer>>) {
	const player = selectUserFromInput(choosePlayer, X, O);

	return (
		<LinkWraper
			onClick={(event) => {
				if (to) onClick?.(event as MouseEvent<HTMLAnchorElement>);
			}}
			to={to}
		>
			<div
				{...rest}
				onClick={(event) => {
					if (!to) onClick?.(event as MouseEvent<HTMLDivElement>);
				}}
				className={`w-full rounded-lg border-b-4 ${
					(player === "X" && "border-b-x-shadow bg-x") ||
					(player === "O" && "border-b-o-shadow bg-o") ||
					"border-arsenic-200 bg-arsenic-100"
				} cursor-pointer py-3 text-center text-lg font-semibold uppercase sm:py-4 sm:text-xl ${player ? "text-white" : "text-arsenic-950"} active:border-transparent ${className}`}
			>
				<div
					className={`flex h-max items-center justify-center gap-1 ${
						align === "right" && "flex-row-reverse"
					}`}
				>
					{iconSrc !== undefined ? (
						<div className="aspect-square w-6 sm:w-8">
							<img
								src={iconSrc}
								alt={iconSrc}
								className={`${player || "brightness-[0.2]"}`}
							/>
						</div>
					) : null}
					<p>{children ?? text}</p>
				</div>
			</div>
		</LinkWraper>
	);
}
