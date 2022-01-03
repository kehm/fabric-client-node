export interface OrganizationProfile {
    mspid: string;
    certificateAuthorities: Array<string>;
}

export interface TLSCACerts {
    pem: string[];
}

export interface HTTPOptions {
    verify: boolean;
}

export interface Registrar {
    enrollId: string;
    enrollSecret: string;
}

export interface CA {
    url: string;
    caName: string;
    tlsCACerts: TLSCACerts;
    httpOptions: HTTPOptions;
    registrar: Array<Registrar>;
}
