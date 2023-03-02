interface IStorageProvider {
  save(file: string, folder: string): Promise<string>;
  unlinkImage(imageId: string): Promise<void>;
}

export { IStorageProvider };
