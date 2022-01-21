import getIdentities from './get-identities';

jest.mock('fs', () => ({
    promises: {
        readdir: jest.fn().mockImplementation((path) => {
            if (path === './invalidPath') throw new Error();
            return [];
        }),
    },
}));

describe('get identities from file storage wallet', () => {
    describe('with valid path', () => {
        it('should resolve promise', async () => {
            const identities = await getIdentities('./wallet');
            expect(identities).toBeInstanceOf(Array);
        });
    });
    describe('with invalid path', () => {
        it('should throw error', async () => {
            await expect(getIdentities('./invalidPath')).rejects.toThrowError();
        });
    });
});
