import getIdentities from './get-identities';

describe('get identities', () => {
    it('should complete without error', async () => {
        await expect(getIdentities('./wallet')).resolves.not.toThrowError();
    });
});
