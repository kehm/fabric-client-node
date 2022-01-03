import invoke from './invoke';

describe('invoke', () => {
    describe('with all necessary parameters', () => {
        it('should complete without error', async () => {
            await expect(invoke(
                'admin',
                'mychannel',
                'basic',
                'TransferAsset',
                undefined,
                ...['asset5', 'Christopher'],

            )).resolves.not.toThrowError();
        });
    });
    describe('with incorrect parameters', () => {
        it('should throw error', async () => {
            await expect(invoke(
                'test',
                'test',
                'test',
                'test',
                undefined,
            )).rejects.toThrowError();
        });
    });
});
