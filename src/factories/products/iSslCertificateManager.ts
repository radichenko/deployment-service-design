export interface SslOperationDetails {
    action: 'install' | 'renew' | 'ensure_cert_manager';
    domain: string;
    [key: string]: any;
}

export interface ISSLCertificateManager {
    manageCertificate(details: SslOperationDetails): Promise<void>;
}

export class SharedLetsEncryptManager implements ISSLCertificateManager {
    async manageCertificate(details: SslOperationDetails): Promise<void> {
        console.log(`[SharedLetsEncryptManager] ACTION: Installing Let's Encrypt SSL certificate for ${details.domain} (simulation).`);
        await new Promise(resolve => setTimeout(resolve, 50));
    }
}

export class CertManagerForK8s implements ISSLCertificateManager {
    async manageCertificate(details: SslOperationDetails): Promise<void> {
        console.log(`[CertManagerForK8s] ACTION: Managing SSL for ${details.domain} (Kubernetes).`);
        await new Promise(resolve => setTimeout(resolve, 20));
    }
}