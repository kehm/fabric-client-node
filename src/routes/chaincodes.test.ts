import request from 'supertest';
import app from '../app';

const FABRIC_IDENTITY = 'admin';
const FABRIC_CHANNEL = 'mychannel';
const FABRIC_CHAINCODE = 'basic';
const FABRIC_CHAINCODE_INVOKE = 'TransferAsset';
const FABRIC_CHAINCODE_QUERY = 'GetAllAssets';

describe('POST /chaincodes/invoke', () => {
    describe('with all necessary body parameters', () => {
        it('should respond with HTTP status code 200', async () => {
            const response = await request(app).post('/chaincodes/invoke').send({
                identity: FABRIC_IDENTITY,
                channel: FABRIC_CHANNEL,
                chaincode: FABRIC_CHAINCODE,
                func: FABRIC_CHAINCODE_INVOKE,
                args: ['asset6', 'Christopher'],
            });
            expect(response.statusCode).toBe(200);
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
                identity: FABRIC_IDENTITY,
                channel: FABRIC_CHANNEL,
                chaincode: FABRIC_CHAINCODE,
                func: FABRIC_CHAINCODE_QUERY,
                args: [],
            });
            expect(response.statusCode).toBe(200);
        });
        it('should respond with json in the content type header', async () => {
            const response = await request(app).post('/chaincodes/query').send({
                identity: FABRIC_IDENTITY,
                channel: FABRIC_CHANNEL,
                chaincode: FABRIC_CHAINCODE,
                func: FABRIC_CHAINCODE_QUERY,
                args: [],
            });
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        });
    });
    describe('with missing body parameters', () => {
        it('should respond with HTTP status code 400', async () => {
            const response = await request(app).post('/chaincodes/query').send();
            expect(response.statusCode).toBe(400);
        });
    });
});
