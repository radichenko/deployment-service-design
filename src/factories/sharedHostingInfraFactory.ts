import { IInfrastructureFactory } from './iInfrastructureFactory';
import { IServerProvisioner, CPanelProvisioner } from './products/iServerProvisioner';
import { IDatabaseManager, SharedMySQLManager } from './products/iDatabaseManager';
import { ISSLCertificateManager, SharedLetsEncryptManager } from './products/iSslCertificateManager';

export class SharedHostingInfraFactory implements IInfrastructureFactory {
    constructor() {
        console.log("SharedHostingInfraFactory Initialized.");
    }

    createServerProvisioner(): IServerProvisioner {
        console.log("SharedHostingInfraFactory: Creating CPanelProvisioner.");
        return new CPanelProvisioner();
    }

    createDatabaseManager(): IDatabaseManager {
        console.log("SharedHostingInfraFactory: Creating SharedMySQLManager.");
        return new SharedMySQLManager();
    }

    createSslCertificateManager(): ISSLCertificateManager {
        console.log("SharedHostingInfraFactory: Creating SharedLetsEncryptManager.");
        return new SharedLetsEncryptManager();
    }
}