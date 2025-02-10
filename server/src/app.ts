import dotenv from "dotenv";
import express, { Application } from "express";
import { MultiplayerConnectionServer as MultiplayerServer } from "./class/MultiplayerConnectionServer";

console.clear();

dotenv.config();

interface MongoError<T> {
	errorResponse: {
		index: number;
		code: 11000;
		errmsg: string;
		keyPattern: {
			[P in keyof T]: number;
		};
		keyValue: T;
	};
	index: number;
	code: 11000;
	keyPattern: {
		[P in keyof T]: number;
	};
	keyValue: T;
}

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

const multiplayerServer = new MultiplayerServer(server, {
	cors: {
		origin: corsOrigin,
	},
});

multiplayerServer.connect(() => {
	multiplayerServer.disconnecting(async ({ reason }, onlineNamespace) => {
		const { acknowledged } = await multiplayerServer.onlineUsers.removeUser(
			{
				socketId: onlineNamespace.id,
			}
		);

		console.log(acknowledged);
		console.log(onlineNamespace.id);

		if (acknowledged) {
			console.log("User disconnected : ", onlineNamespace.id);
		}
	});

	multiplayerServer.on("set.online", async (user, onlineNamespace) => {
		try {
			// Add the user to the database and if already exist then update the document.
			const previousUser =
				await multiplayerServer.onlineUsers.addOrUpdateUser({
					...user,
				});

			/**
			 * Check if the player is aleardy in the database.
			 * Which means the player is logged in from another account.
			 * So remove that player from the database as well as disconnect the socket.
			 */
			if (previousUser) {
				const { socketId, email, uid, userName } = previousUser;
				multiplayerServer.emitTo(socketId, "remove.online", {
					uid,
					email,
					userName,
				});
				multiplayerServer.once("ack.remove.online", (res) => {
					if (res.status.sucess)
						console.log("User removed : ", res.uid);
				});
			}

			/**
			 * Send all the player to this new player.
			 */
			multiplayerServer.emitTo(
				onlineNamespace.id,
				"get.online",
				await multiplayerServer.onlineUsers.getAllUsers()
			);

			/**
			 * Send this new player to all the other player.
			 */
			multiplayerServer.emit("add.online", user);
		} catch (e) {
			console.log(e);
		}
	});

	multiplayerServer.on("play.request", (request) => {
		// multiplayerServer.requestUser(req);
		console.log(request.email);
		console.log(request.userName);
		multiplayerServer.emitTo(
			request.oppositePlayerUID,
			"play.request",
			request
		);
		// multiplayerServer.emit("get.play.request");
	});
});
