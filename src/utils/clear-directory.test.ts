import clearDirectory from './clear-directory';

jest.mock('fs', () => ({
    promises: {
        readdir: jest.fn().mockImplementation((path) => {
            if (path === './invalidPath') throw new Error();
            return [];
        }),
        unlink: jest.fn().mockResolvedValue(undefined),
    },
}));

describe('clear directory', () => {
    describe('with valid path', () => {
        it('should resolve promise', async () => {
            await expect(clearDirectory('./test')).resolves.not.toThrowError();
        });
    });
    describe('with invalid path', () => {
        it('should throw error', async () => {
            await expect(clearDirectory('./invalidPath')).rejects.toThrowError();
        });
    });
});
