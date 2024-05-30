import { AppRoutes } from "@util/AppRoutes";
import { LinkWraper } from "./LinkWraper";

interface ButtonProps {
	text: string;
	onClick?: () => void;
	title?: string;
	to?: AppRoutes;
	ball: number;
}

export default function ModeButton({ text, onClick, to, ball }: ButtonProps) {
	return (
		<LinkWraper to={to}>
			<div
				data-text={text}
				className={`relative grid w-full grid-cols-2 grid-rows-3 items-center rounded-lg ${ball % 2 ? "bg-x" : "bg-o"} p-4 text-xl font-bold uppercase text-white`}
				onClick={onClick}
			>
				<p className="col-start-1 row-start-1">{text}</p>
				<div className="col-start-2 row-span-2 row-start-2 flex gap-3 justify-self-end">
					{Array(ball)
						.fill(ball)
						.map((_, index) => (
							<div
								key={index}
								className="aspect-square w-10 rounded-full bg-white"
							></div>
						))}
				</div>
			</div>
		</LinkWraper>
	);
}
