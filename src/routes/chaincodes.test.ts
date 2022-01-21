import request from 'supertest';
import app from '../app';

jest.mock('../fabric/invoke');
jest.mock('../fabric/query');

describe('POST /chaincodes/invoke', () => {
    describe('with all necessary body parameters', () => {
        it('should respond with HTTP status code 200', async () => {
            const response = await request(app).post('/chaincodes/invoke').send({
                identity: 'admin',
                channel: 'mychannel',
                chaincode: 'basic',
                func: 'TransferAsset',
                args: ['asset6', 'Christopher'],
            });
            expect(response.statusCode).toBe(200);
        });
    });
    describe('with incorrect body parameters', () => {
        it('should respond with HTTP status code 400', async () => {
            const response = await request(app).post('/chaincodes/invoke').send({
                identity: 123,
                channel: 'mychannel',
                chaincode: 'basic',
                func: 'TransferAsset',
                args: ['asset6', 'Christopher'],
            });
            expect(response.statusCode).toBe(400);
        });
    });
    describe('with missing body parameters', () => {
        it('should respond with HTTP status code 400', async () => {
            const response = await request(app).post('/chaincodes/invoke').send();
            expect(response.statusCode).toBe(400);
        });
    });
});

describe('POST /chaincodes/query', () => {
    describe('with all necessary body parameters', () => {
        it('should respond with HTTP status code 200', async () => {
            const response = await request(app).post('/chaincodes/query').send({
                identity: 'admin',
                channel: 'mychannel',
                chaincode: 'basic',
                func: 'GetAllAssets',
                args: [],
            });
            expect(response.statusCode).toBe(200);
        });
        it('should respond with json in the content type header', async () => {
            const response = await request(app).post('/chaincodes/query').send({
                identity: 'admin',
                channel: 'mychannel',
                chaincode: 'basic',
                func: 'GetAllAssets',
                args: [],
            });
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        });
    });
    describe('with incorrect body parameters', () => {
        it('should respond with HTTP status code 400', async () => {
            const response = await request(app).post('/chaincodes/query').send({
                identity: 123,
                channel: 'mychannel',
                chaincode: 'basic',
                func: 'GetAllAssets',
                args: [],
            });
            expect(response.statusCode).toBe(400);
        });
    });
    describe('with missing body parameters', () => {
        it('should respond with HTTP status code 400', async () => {
            const response = await request(app).post('/chaincodes/query').send();
            expect(response.statusCode).toBe(400);
        });
    });
});
