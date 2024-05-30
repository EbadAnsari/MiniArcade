import DatabaseProvider from "@context/providers/DatabaseProvider";
import TicTacToeProvider from "@context/providers/GameProvider";
import OnlineUserProvider from "@context/providers/OnlineUserProvider";
import ToastProvider from "@context/providers/ToastContext";
import { BrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";

export default function App() {
	return (
		<DatabaseProvider>
			<OnlineUserProvider>
				<TicTacToeProvider>
					<ToastProvider>
						<BrowserRouter>
							<Layout />
						</BrowserRouter>
					</ToastProvider>
				</TicTacToeProvider>
			</OnlineUserProvider>
		</DatabaseProvider>
	);
}
