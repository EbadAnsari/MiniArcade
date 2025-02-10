import { connect } from "mongoose";
import { exit } from "process";

const connection: { connected: boolean } = {
	connected: false,
};

export async function dbConnect(): Promise<void> {
	if (connection.connected) {
		console.log("MongoDB is already connected");
		return;
	}

	try {
		connection.connected =
			(await connect("mongodb://localhost:27017/mini-arcade"))
				.connections[0].readyState === 1;
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Connection failed to MongoDB", error);
		exit(1);
	}
}
