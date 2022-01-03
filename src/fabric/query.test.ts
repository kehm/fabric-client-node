import query from './query';

describe('invoke', () => {
    describe('with all necessary parameters', () => {
        it('should complete without error', async () => {
            await expect(query(
                'admin',
                'mychannel',
                'basic',
                'GetAllAssets',
                ...[],
            )).resolves.not.toThrowError();
        });
    });
    describe('with incorrect parameters', () => {
        it('should throw error', async () => {
            await expect(query(
                'test',
                'test',
                'test',
                'test',
                '',
            )).rejects.toThrowError();
        });
    });
});
