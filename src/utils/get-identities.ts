import fs from 'fs';

/**
 * Get names of identities in the file system wallet
 *
 * @param directory Directory path
 * @returns File names
 */
const getIdentities = async (directory: string) => {
    const files = await fs.promises.readdir(directory);
    return files.map((file: string) => file.split('.')[0]);
};

export default getIdentities;
