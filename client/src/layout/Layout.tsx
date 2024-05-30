import ErrorPage from "@components/ErrorPage";
import OnlinePlayer from "@components/OnlinePlayer";
import In from "@routes/In";
import Login from "@routes/Login";
import { Match } from "@routes/Match";
import Mode from "@routes/Mode";
import Profile from "@routes/Profile";
import SignIn from "@routes/SignIn";
import { StartGame } from "@routes/StartGame";
import { AnimatePresence } from "framer-motion";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";

export default function Layout() {
	const location = useLocation();

	return (
		<AnimatePresence>
			<Routes key={location.key} location={location}>
				<Route
					element={
						// <div className="flex h-d-screen w-d-screen items-center justify-center">
						<Outlet />
						// </div>
					}
					path="/"
				>
					<Route index Component={StartGame}></Route>
					<Route path="mode" Component={Mode}></Route>
					<Route path="match" Component={Match}></Route>
					<Route path="online" Component={OnlinePlayer}></Route>
					<Route path="in" Component={In}>
						<Route index Component={SignIn}></Route>
						<Route path="login" Component={Login}></Route>
						<Route path="profile" Component={Profile}></Route>
						<Route path="*" Component={ErrorPage}></Route>
					</Route>
					<Route path="*" Component={ErrorPage}></Route>
				</Route>
			</Routes>
		</AnimatePresence>
	);
}
