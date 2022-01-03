import request from 'supertest';
import app from '../app';

describe('POST /enroll/admin', () => {
    describe('with all necessary body parameters', () => {
        it('should respond with HTTP status code 200', async () => {
            const response = await request(app).post('/identities/enroll/admin').send({
                name: 'admin',
                secret: 'adminpw',
                organization: 'Org1',
            });
            expect(response.statusCode).toBe(200);
        });
    });
    describe('with missing body parameters', () => {
        it('should respond with HTTP status code 400', async () => {
            const response = await request(app).post('/identities/enroll/admin').send();
            expect(response.statusCode).toBe(400);
        });
    });
});

describe('POST /enroll', () => {
    describe('without registering the identity', () => {
        const name = `test-${new Date().getTime()}`;
        it('should respond with HTTP status code 500', async () => {
            const response = await request(app).post('/identities/enroll').send({
                name,
                secret: 'testpw',
                organization: 'Org1',
            });
            expect(response.statusCode).toBe(500);
        });
    });
    describe('with missing body parameters', () => {
        it('should respond with HTTP status code 400', async () => {
            const response = await request(app).post('/identities/enroll').send();
            expect(response.statusCode).toBe(400);
        });
    });
});

describe('POST /register and POST /enroll', () => {
    describe('register and enroll a client with all necessary body parameters', () => {
        const name = `test-${new Date().getTime()}`;
        it('should respond with HTTP status code 200', async () => {
            const response = await request(app).post('/identities/register').send({
                name,
                secret: 'testpw',
                role: 'client',
                organization: 'Org1',
                affiliation: 'org1.department1',
                registrar: 'admin',
            });
            expect(response.statusCode).toBe(200);
        });
        it('should respond with HTTP status code 200', async () => {
            const response = await request(app).post('/identities/enroll').send({
                name,
                secret: 'testpw',
                role: 'client',
                organization: 'Org1',
                affiliation: 'org1.department1',
                registrar: 'admin',
            });
            expect(response.statusCode).toBe(200);
        });
    });
    describe('register with missing body parameters', () => {
        it('should respond with HTTP status code 400', async () => {
            const response = await request(app).post('/identities/register').send();
            expect(response.statusCode).toBe(400);
        });
    });
});
