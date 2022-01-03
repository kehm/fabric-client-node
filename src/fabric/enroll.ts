import fabricNetwork from 'fabric-network';
import FabricCAServices from 'fabric-ca-client';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import env from '../types/env';
import { CA, OrganizationProfile } from '../types/types';

const { Wallets } = fabricNetwork;

/**
 * Enroll an identity with the Fabric CA
 *
 * @param enrollmentID Identity name
 * @param enrollmentSecret Identity secret
 * @param organization Organization name
 */
const enroll = async (
    enrollmentID: string,
    enrollmentSecret: string,
    organization: string,
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
    if (identity) throw new Error('Identity already exists in wallet');
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
    const enrollment = await ca.enroll({
        enrollmentID,
        enrollmentSecret,
    });
    const x509Identity = {
        credentials: {
            certificate: enrollment.certificate,
            privateKey: enrollment.key.toBytes(),
        },
        mspId: organizationProfile.mspid,
        type: 'X.509',
    };
    await wallet.put(enrollmentID, x509Identity);
};

export default enroll;
