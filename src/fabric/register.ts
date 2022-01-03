import fabricNetwork from 'fabric-network';
import FabricCAServices from 'fabric-ca-client';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import env from '../types/env';
import { CA, OrganizationProfile } from '../types/types';

const { Wallets } = fabricNetwork;

/**
 * Register an identity with the Fabric CA
 *
 * @param enrollmentID Identity name
 * @param enrollmentSecret Identity secret
 * @param role Identity role
 * @param organization Organization name
 * @param affiliation Affiliation name
 * @param registrar Admin name
 */
const register = async (
    enrollmentID: string,
    enrollmentSecret: string,
    role: string,
    organization: string,
    affiliation: string,
    registrar: string,
) => {
    const connectionProfile = yaml.load(fs.readFileSync(
        path.join(env.FabricConfigPath, env.FabricConnectionProfile),
        'utf8',
    )) as Record<string, string>;
    const organizationProfile = connectionProfile.organizations[
        organization as keyof string
    ] as unknown as OrganizationProfile;
    const wallet = await Wallets.newFileSystemWallet(env.FabricWalletPath);
    const identity = await wallet.get(enrollmentID);
    if (identity) return;
    const caInfo = connectionProfile.certificateAuthorities[
        organizationProfile.certificateAuthorities[0] as keyof string
    ] as unknown as CA;
    const ca = new FabricCAServices(
        caInfo.url,
        {
            trustedRoots: caInfo.tlsCACerts.pem,
            verify: caInfo.httpOptions.verify,
        },
        caInfo.caName,
    );
    const admin = await wallet.get(registrar);
    if (!admin) throw new Error('Admin identity does not exist in wallet');
    const provider = wallet.getProviderRegistry().getProvider(admin.type);
    const adminUser = await provider.getUserContext(admin, registrar);
    await ca.register(
        {
            affiliation,
            enrollmentID,
            enrollmentSecret,
            role,
        },
        adminUser,
    );
};

export default register;
