import { Player } from "@class/matrix-types";

export type SelectPlayer =
	| {
			choosePlayer: Player;
			X?: false;
			O?: false;
	  }
	| {
			X: true;
			O?: false;
			choosePlayer?: false;
	  }
	| {
			X?: false;
			O: true;
			choosePlayer?: false;
	  };

export default function Arrow({ X }: SelectPlayer) {
	return (
		<svg x="0px" y="0px" viewBox="0 0 122.9 122.4">
			<g>
				<path
					className={X ? "fill-x" : "fill-o"}
					d="M6.7,66.6l42.6,41c4.7,4.5,12.6,1.2,12.6-5.4V82H111c4.1,0,7.4-3.3,7.4-7.4V47.8c0-4.1-3.3-7.4-7.4-7.4H61.9
		V20.3c0-6.5-7.9-9.9-12.6-5.4l-42.6,41C3.7,58.8,3.7,63.6,6.7,66.6z"
				/>
			</g>
		</svg>
	);
}
