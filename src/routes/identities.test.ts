import request from 'supertest';
import app from '../app';

jest.mock('../fabric/enroll');
jest.mock('../fabric/register');

describe('POST /identities/enroll', () => {
    describe('with all necessary body parameters', () => {
        it('should respond with HTTP status code 200', async () => {
            const response = await request(app).post('/identities/enroll').send({
                name: 'test',
                secret: 'testpw',
                organization: 'Org1',
            });
            expect(response.statusCode).toBe(200);
        });
    });
    describe('with incorrect body parameters', () => {
        it('should respond with HTTP status code 400', async () => {
            const response = await request(app).post('/identities/enroll').send({
                name: 123,
                secret: 'testpw',
                organization: 'Org1',
            });
            expect(response.statusCode).toBe(400);
        });
    });
    describe('without necessary body parameters', () => {
        it('should respond with HTTP status code 400', async () => {
            const response = await request(app).post('/identities/enroll').send();
            expect(response.statusCode).toBe(400);
        });
    });
});

describe('POST /identities/register', () => {
    describe('with all necessary body parameters', () => {
        it('should respond with HTTP status code 200', async () => {
            const response = await request(app).post('/identities/register').send({
                name: 'test',
                secret: 'testpw',
                role: 'client',
                organization: 'Org1',
                affiliation: 'org1.department1',
                registrar: 'admin',
            });
            expect(response.statusCode).toBe(200);
        });
    });
    describe('with incorrect body parameters', () => {
        it('should respond with HTTP status code 400', async () => {
            const response = await request(app).post('/identities/register').send({
                name: 123,
                secret: 'testpw',
                role: 'client',
                organization: 'Org1',
                affiliation: 'org1.department1',
                registrar: 'admin',
            });
            expect(response.statusCode).toBe(400);
        });
    });
    describe('without necessary body parameters', () => {
        it('should respond with HTTP status code 400', async () => {
            const response = await request(app).post('/identities/register').send();
            expect(response.statusCode).toBe(400);
        });
    });
});
