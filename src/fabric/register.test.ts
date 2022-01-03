import register from './register';

describe('register identity', () => {
    const name = `test-${new Date().getTime()}`;
    describe('with all necessary parameters', () => {
        it('should complete without error', async () => {
            await expect(register(
                name,
                'testpw',
                'client',
                'Org1',
                'org1.department1',
                'admin',
            )).resolves.not.toThrowError();
        });
    });
    describe('with incorrect parameters', () => {
        it('should throw error', async () => {
            await expect(register(
                name,
                'test',
                'test',
                'test',
                'test',
                'test',
            )).rejects.toThrowError();
        });
    });
});
