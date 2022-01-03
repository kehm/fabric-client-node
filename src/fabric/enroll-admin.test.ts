import enrollAdmin from './enroll-admin';

describe('enroll admin identity', () => {
    describe('with all necessary parameters', () => {
        it('should complete without error', async () => {
            await expect(enrollAdmin(
                'admin',
                'adminpw',
                'Org1',
            )).resolves.not.toThrowError();
        });
    });
    describe('with incorrect parameters', () => {
        it('should throw error', async () => {
            await expect(enrollAdmin(
                'test',
                'test',
                'test',
            )).rejects.toThrowError();
        });
    });
});
