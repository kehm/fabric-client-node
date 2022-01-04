import fabricNetwork, { TransientMap } from 'fabric-network';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import env from '../types/env';

const { Gateway, Wallets } = fabricNetwork;

/**
 * Invoke a blockchain transaction
 *
 * @param identityName Identity name
 * @param channel Channel name
 * @param chaincode Chaincode name
 * @param func Function name
 * @param transient Transient data (undefined if none)
 * @param args Function arguments
 * @returns Invoke response
 */
const invoke = async (
    identityName: string,
    channel: string,
    chaincode: string,
    func: string,
    transient: TransientMap | undefined,
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
        let result;
        if (transient) {
            result = await contract.createTransaction(func).setTransient(transient).submit(...args);
        } else result = await contract.submitTransaction(func, ...args);
        return result.toString();
    } catch (err: unknown) {
        return Promise.reject(err);
    } finally {
        gateway.disconnect();
    }
};

export default invoke;
