import { IServerProvisioner } from './products/iServerProvisioner';
import { IDatabaseManager } from './products/iDatabaseManager';
import { ISSLCertificateManager } from './products/iSslCertificateManager';

export interface IInfrastructureFactory {
    createServerProvisioner(): IServerProvisioner;
    createDatabaseManager(): IDatabaseManager;
    createSslCertificateManager(): ISSLCertificateManager;
}