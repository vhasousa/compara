import crypto from "crypto";
import multer from "multer";
import { resolve } from "path";

const tmpFolder = resolve(__dirname, "..", "..", "tmp");

export default {
	tmpFolder,

	storage: multer.diskStorage({
		destination: tmpFolder,
		filename: (request, file, callback) => {
			const formattedName = file.originalname.replace(/ /g, "_");
			const fileHash = crypto.randomBytes(16).toString("hex");
			const fileName = `${fileHash}-${formattedName}`;

			return callback(null, fileName);
		},
	}),
};
