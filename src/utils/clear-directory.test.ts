import clearDirectory from './clear-directory';

describe('clear directory', () => {
    describe('unknown directory', () => {
        it('should throw error', async () => {
            await expect(clearDirectory('./test')).rejects.toThrowError();
        });
    });
});
