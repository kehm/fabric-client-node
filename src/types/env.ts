export default {
    Port: process.env.PORT || '',
    FabricConfigPath: process.env.FABRIC_CONFIG_PATH || '',
    FabricWalletPath: process.env.FABRIC_WALLET_PATH || '',
    FabricConnectionProfile: process.env.FABRIC_CONNECTION_PROFILE || '',
    FabricDiscoveryAsLocalhost: process.env.FABRIC_DISCOVERY_AS_LOCALHOST || '',
};
