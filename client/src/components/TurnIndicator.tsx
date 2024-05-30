import { Player } from "@class/matrix-types";
import { ShowPlayer } from "./ShowPlayer";

interface TurnIndicatorProps {
	turn: Player;
}

export default function TurnIndicator({ turn }: Readonly<TurnIndicatorProps>) {
	return (
		<div className="flex items-center justify-center gap-1 rounded-lg border-b-4 border-b-arsenic-950 bg-arsenic-400 px-3 py-2">
			<div className="w-5">
				<ShowPlayer player={turn} style="fill-arsenic-100" />
			</div>
			<p className="font-bold uppercase text-arsenic-100">Turn</p>
		</div>
	);
}
