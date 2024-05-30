import { SelectPlayer } from "@ui/Arrow";
import { selectUserFromInput } from "@util/selectUserFromInput";

export default function HomeIcon({
	X,
	O,
	choosePlayer,
}: Partial<SelectPlayer>) {
	const player = selectUserFromInput(choosePlayer, X, O);

	return (
		<svg x="0px" y="0px" viewBox="0 0 256 256">
			<path
				className={
					(player === "X" && "fill-x") ||
					(player === "O" && "fill-o") ||
					"fill-white"
				}
				d="M155.1,221.1V167c0-5-4-9-9-9h-36.1c-5,0-9,4-9,9v54.1c0,5-4,9-9,9l-54.1,0c-5,0-9-4-9-9c0,0,0,0,0,0V116.9
	c0-2.5,1.1-5,3-6.7l90.2-82c3.4-3.1,8.7-3.1,12.1,0l90.2,82c1.9,1.7,3,4.1,3,6.7v104.3c0,5-4,9-9,9c0,0,0,0,0,0l-54.1,0
	C159.1,230.2,155.1,226.1,155.1,221.1z"
			/>
		</svg>
	);
}
