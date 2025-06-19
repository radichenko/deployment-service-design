import { IInfrastructureFactory } from './iInfrastructureFactory';
import { IServerProvisioner, KubectlProvisioner } from './products/iServerProvisioner';
import { IDatabaseManager, KubernetesDBManager } from './products/iDatabaseManager';
import { ISSLCertificateManager, CertManagerForK8s } from './products/iSslCertificateManager';

export class KubernetesInfraFactory implements IInfrastructureFactory {
    createServerProvisioner(): IServerProvisioner {
        return new KubectlProvisioner();
    }
    createDatabaseManager(): IDatabaseManager {
        return new KubernetesDBManager();
    }
    createSslCertificateManager(): ISSLCertificateManager {
        return new CertManagerForK8s();
    }
}