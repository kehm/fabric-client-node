import fabricNetwork from 'fabric-network';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import env from '../types/env';

const { Gateway, Wallets } = fabricNetwork;

/**
 * Query the blockchain
 *
 * @param identityName Identity name
 * @param channel Chaincode name
 * @param chaincode Chaincode name
 * @param func Function name
 * @param args Function arguments
 */
const query = async (
    identityName: string,
    channel: string,
    chaincode: string,
    func: string,
    ...args: string[]
) => {
    const connectionProfile = yaml.load(fs.readFileSync(
        path.join(env.FabricConfigPath, env.FabricConnectionProfile),
        'utf8',
    )) as Record<string, string>;
    const wallet = await Wallets.newFileSystemWallet(env.FabricWalletPath);
    const identity = await wallet.get(identityName);
    if (!identity) throw new Error('Identity is not in wallet');
    const gateway = new Gateway();
    try {
        await gateway.connect(connectionProfile, {
            wallet,
            identity,
            discovery: {
                enabled: true,
                asLocalhost: env.FabricDiscoveryAsLocalhost === 'true',
            },
        });
        const network = await gateway.getNetwork(channel);
        const contract = network.getContract(chaincode);
        const result = await contract.evaluateTransaction(func, ...args);
        return result.toString();
    } catch (err: unknown) {
        return Promise.reject(err);
    } finally {
        gateway.disconnect();
    }
};

export default query;
