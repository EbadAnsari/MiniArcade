import { Player } from "@class/matrix-types";
import { O } from "@components/icon/O";
import { X } from "@components/icon/X";

export function ShowPlayer({
	player,
	oStyle,
	xStyle,
	style,
}: (
	| { style: string; oStyle?: false; xStyle?: false }
	| {
			oStyle: string;
			xStyle: string;
			style?: false;
	  }
) & {
	player: Player;
}) {
	return player === "O" ? (
		<O className={(oStyle ?? style) || ""} />
	) : (
		<X className={(xStyle ?? style) || ""} />
	);
}
