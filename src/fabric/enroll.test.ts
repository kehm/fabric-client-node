import enroll from './enroll';
import register from './register';

describe('enroll identity', () => {
    describe('with all necessary parameters', () => {
        it('should complete without error', async () => {
            const name = `test-${new Date().getTime()}`;
            await expect(register(
                name,
                'testpw',
                'client',
                'Org1',
                'org1.department1',
                'admin',
            )).resolves.not.toThrowError();
            await expect(enroll(
                name,
                'testpw',
                'Org1',
            )).resolves.not.toThrowError();
        });
    });
    describe('with incorrect parameters', () => {
        it('should throw error', async () => {
            await expect(enroll(
                'test',
                'test',
                'test',
            )).rejects.toThrowError();
        });
    });
});
