import HomeIcon from "@icon/Home";
import { O } from "@icon/O";
import { AppRoutes } from "@util/AppRoutes";
import { Link } from "react-router-dom";
import RouteAnimate from "./RouteAnimation";

export default function ErrorPage() {
	return (
		<RouteAnimate className="flex flex-col items-center gap-2">
			<div className="flex items-center justify-center font-sans text-7xl font-black text-o">
				<span>4</span>
				<div className="relative top-1 w-16">
					<O className="fill-o" />
				</div>
				<span>4</span>
				<span>!</span>
			</div>
			<div className="font-sans text-4xl font-bold text-x">
				Page not found
			</div>
			<div className="mt-4 flex w-full flex-col gap-3">
				<Link
					to={AppRoutes.root}
					className="flex items-center justify-center gap-2 rounded-lg bg-x px-4 py-3 text-2xl font-semibold text-white"
				>
					<div className="w-7">
						<HomeIcon />
					</div>
					<p>Home</p>
				</Link>
				<Link
					to={AppRoutes.profile}
					className="flex items-center justify-center gap-2 rounded-lg bg-o px-4 py-3 text-2xl font-semibold text-white"
				>
					<div className="w-[26px]">
						<img
							src="/profile.svg"
							className="brightness-[100]"
							alt=""
						/>
					</div>
					<p>Profile</p>
				</Link>
			</div>
		</RouteAnimate>
	);
}
