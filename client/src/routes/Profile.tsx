import RouteAnimate from "@components/RouteAnimation";
import HomeIcon from "@components/icon/Home";
import Base from "@components/ui/Base";
import { useUser } from "@context/hooks/useUser";
import IconButton from "@ui/IconButton";
import { AppRoutes } from "@util/AppRoutes";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
	const { user } = useUser();

	const navigate = useNavigate();

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (!user.email) navigate(AppRoutes.root);
		}, 10000);

		return () => {
			clearTimeout(timeout);
		};
	}, [user.email]);

	return (
		<RouteAnimate>
			<Base className="w-full p-6 sm:p-8 md:p-10">
				<div className="m-3 flex h-9 cursor-pointer justify-end">
					<Link to={AppRoutes.root} className="w-9">
						<HomeIcon X />
					</Link>
				</div>
				<div className="mx-auto mb-6 aspect-square w-32 rounded-3xl bg-arsenic-950 p-5 text-arsenic-100 lg:w-32">
					<img
						src={user.photoUrl ?? "/profile.svg"}
						className="w-full"
						onError={(event) => {
							event.currentTarget.src = "/profile.svg";
						}}
						alt="Profile photo."
						title="Profile photo."
					/>
				</div>
				<div>
					<div className="mt-2 h-10 text-center text-2xl font-bold text-arsenic-100">
						{user.userName /* && false */ ? (
							<p title={user.userName} className="cursor-pointer">
								{user.userName}
							</p>
						) : (
							<div className="relative mx-auto flex h-full w-2/4 items-center overflow-hidden rounded-lg bg-arsenic-200/10">
								<div className="absolute -left-full top-1/2 h-28 w-52 -translate-y-1/2 animate-[loading_1s_ease_infinite] bg-white/10 blur-xl"></div>
							</div>
						)}
					</div>
					<div className="mt-2 h-8 text-center text-xl font-bold text-arsenic-100">
						{user.email /* && false */ ? (
							<p title={user.email} className="cursor-pointer">
								{user.email}
							</p>
						) : (
							<div className="relative mx-auto flex h-full w-3/4 items-center overflow-hidden rounded-lg bg-arsenic-200/10">
								<div className="absolute -left-full top-1/2 h-28 w-52 -translate-y-1/2 animate-[loading_1s_ease_infinite] bg-white/10 blur-xl"></div>
							</div>
						)}
					</div>
				</div>

				<div className="mt-8 grid h-16 w-full grid-cols-2 justify-items-center gap-2 rounded-lg bg-arsenic-950 p-2 text-2xl font-bold">
					{user.uid /* && false */ ? (
						<div className="w-full cursor-pointer rounded-lg p-2 text-center text-x hover:bg-arsenic-400">
							You - {user.score.you}
						</div>
					) : (
						<div className="relative flex h-full w-full items-center overflow-hidden rounded-lg bg-arsenic-200/10">
							<div className="absolute -left-full top-1/2 h-28 w-32 -translate-y-1/2 animate-[loading_1s_ease_infinite] bg-white/10 blur-xl"></div>
						</div>
					)}
					{user.uid /* && false */ ? (
						<div className="my-auto w-full cursor-pointer rounded-lg p-2 text-center text-o hover:bg-arsenic-400">
							CPU - {user.score.cpu}
						</div>
					) : (
						<div className="relative flex h-full w-full items-center overflow-hidden rounded-lg bg-arsenic-200/10">
							<div className="absolute -left-full top-1/2 h-28 w-32 -translate-y-1/2 animate-[loading_1s_ease_infinite] bg-white/10 blur-xl"></div>
						</div>
					)}
				</div>

				{/* <Link to={AppRoutes.root}> */}
				<IconButton
					O
					to={AppRoutes.root}
					text="Log Out"
					onClick={async (event) => {
						event.preventDefault();
						console.log("here");
						if (!user.email) return;

						try {
							await user.logout();
							console.log("done");
							user.unSetUser();
							navigate(AppRoutes.root, {
								replace: true,
							});
						} catch (e) {
							console.log(e);
						}
					}}
					className="mt-8"
				/>
				{/* </Link> */}
			</Base>
		</RouteAnimate>
	);
}
