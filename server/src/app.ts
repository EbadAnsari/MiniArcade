import dotenv from "dotenv";
import express, { Application } from "express";

import { MultiplayerConnectionServer } from "./class/MultiplayerConnectionServer";

console.clear();

dotenv.config();

const app: Application = express();

const port = process.env.SERVER_PORT;
const corsOrigin = process.env.CORS_ORIGIN;

// app.use(
// 	cors({
// 		origin: corsOrigin,
// 	})
// );

// const onlineUsers = new OnlineUsers();

const server = app.listen(port, () => {
	console.log("Server started.");
});

const multiplayerServer = new MultiplayerConnectionServer(server, {
	cors: {
		origin: corsOrigin,
	},
});

multiplayerServer.connect(() => {
	multiplayerServer.setOnlineUser((onlineUsers) => {
		console.log(onlineUsers.length);
		multiplayerServer.sendOnlineUsers();
	});

	multiplayerServer.recieveData("request", (request) => {});
});

multiplayerServer.disconnect((event) => {
	console.log("dis");
});
