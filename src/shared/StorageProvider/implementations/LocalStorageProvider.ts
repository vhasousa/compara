import fs from "fs";
import { resolve } from "path";

import upload from "@config/upload";

import { IStorageProvider } from "../IStorageProvider";

class LocalStorageProvider implements IStorageProvider {
	async save(file: string, folder: string): Promise<string> {
		await fs.promises.rename(
			resolve(upload.tmpFolder, file),
			resolve(`${upload.tmpFolder}/${folder}`, file)
		);

		return file;
	}

	async unlinkImage(key: string): Promise<void> {
		const filePath = resolve(upload.tmpFolder, key);

		await fs.promises.unlink(filePath);
	}
}

export { LocalStorageProvider };
