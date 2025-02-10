import { SocketUser } from "@interface/Emit";
import { Document, Model, Schema, model, models } from "mongoose";

export interface OnlineUserDocument extends Document, SocketUser {}

const OnlineUser: Schema<OnlineUserDocument> = new Schema({
	uid: { type: String, required: true, unique: true },
	userName: { type: String, required: true },
	email: { type: String, required: true },
	socketId: { type: String, required: true },
});

const OnlineUserModel =
	(models.OnlineUser as Model<OnlineUserDocument>) ||
	model<OnlineUserDocument>("OnlineUser", OnlineUser);

export default OnlineUserModel;
