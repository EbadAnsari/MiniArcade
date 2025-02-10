import MediaQuery from "@components/MediaQuery";
import { dev } from "@util/development";
import ReactDOM from "react-dom/client";
import App from "./App";

// (async () => {
// 	try {
// 		const multiplayer = new MultiplayerConnection();

// 		multiplayer.connect();

// 		if (userInformation.uid.length > 0) {
// 			multiplayer.emitData("set.online", {
// 				email: userInformation.email,
// 				uid: userInformation.uid,
// 				userName: userInformation.userName,
// 			});

// 			multiplayer.recieveData("get.online", (onlineUser) => {
// 				console.table(onlineUser);
// 			});
// 		}

// 		// multiplayer.getOnlineUsers((onlineUsers) => {
// 		// 	console.log(onlineUsers);
// 		// });
// 	} catch (error) {
// 		if (error instanceof MultiplayerConnectionError) {
// 			console.log(error.name);
// 		} else {
// 			console.log(error)
// 		}
// 	}
// })();

ReactDOM.createRoot(document.getElementById("root")!).render(
	// <React.StrictMode>
	<>
		<App />
		{/* <div className="fixed left-1/2 top-1/2">
			<Parent />
		</div> */}
		{dev && <MediaQuery />}
	</>,
);
