export interface SslOperationDetails {
    action: 'install' | 'renew';
    domain: string;
}

export interface ISSLCertificateManager {
    manageCertificate(details: SslOperationDetails): Promise<void>;
}