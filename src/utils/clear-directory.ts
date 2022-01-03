import fs from 'fs';
import path from 'path';

/**
 * Clear file system directory
 *
 * @param directory Directory path
 */
const clearDirectory = async (directory: string) => {
    const files = await fs.promises.readdir(directory);
    const promises: any[] = [];
    files.forEach((file: string) => {
        promises.push(fs.promises.unlink(path.join(directory, file)));
    });
    await Promise.all(promises);
};

export default clearDirectory;
