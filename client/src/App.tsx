import DatabaseProvider from "@context/providers/DatabaseProvider";
import TicTacToeProvider from "@context/providers/GameProvider";
import MultiplayerProvider from "@context/providers/MultiplayerProvider";
import ToastProvider from "@context/providers/ToastContext";
import { dev } from "@util/development";
import { BrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";

export default function App() {
	return (
		<DatabaseProvider>
			{dev ? (
				<MultiplayerProvider>
					<TicTacToeProvider>
						<ToastProvider>
							<BrowserRouter>
								<Layout />
							</BrowserRouter>
						</ToastProvider>
					</TicTacToeProvider>
				</MultiplayerProvider>
			) : (
				<TicTacToeProvider>
					<ToastProvider>
						<BrowserRouter>
							<Layout />
						</BrowserRouter>
					</ToastProvider>
				</TicTacToeProvider>
			)}
		</DatabaseProvider>
	);
}
