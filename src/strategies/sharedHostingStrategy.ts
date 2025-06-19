import { DeploymentConfig } from '../config/deploymentConfig';
import { IDeploymentStrategy } from './iDeploymentStrategy';
import { IInfrastructureFactory } from '../factories/iInfrastructureFactory';
import { IDeploymentObservable, IDeploymentEvent } from '../observers/iDeploymentObserver';

export class SharedHostingStrategy implements IDeploymentStrategy {
    private observable?: IDeploymentObservable;

    constructor() {
    }

    setObservable(observable: IDeploymentObservable): void {
        this.observable = observable;
    }

    private notify(type: IDeploymentEvent['type'], message: string, details?: any) {
        if (this.observable) {
            this.observable.notifyObservers({ type, message, timestamp: new Date(), details });
        } else {
            console.log(`[SharedHostingStrategy - Fallback Log] ${type}: ${message} ${details ? JSON.stringify(details) : ''}`);
        }
    }

    async execute(config: DeploymentConfig, factory: IInfrastructureFactory): Promise<void> {
        this.notify('PROGRESS', `Starting Shared Hosting deployment for ${config.appName}`, { step: 'start' });

        const serverProvisioner = factory.createServerProvisioner();
        const dbManager = factory.createDatabaseManager();
        const sslManager = factory.createSslCertificateManager();
        this.notify('PROGRESS', 'Infrastructure components obtained.', { step: 'components_ready' });

        this.notify('PROGRESS', 'Configuring web server...', { step: 'web_server_config' });
        await serverProvisioner.configureWebServer({ domain: config.domain, rootPath: config.sourcePath });

        if (config.database && config.database.type !== 'none') {
            this.notify('PROGRESS', `Managing database: ${config.database.name}`, { step: 'db_manage' });
            await dbManager.manageDatabase({
                action: 'create',
                dbName: config.database.name!,
                dbUser: config.database.user,
                dbPassword: config.database.password
            });
        }

        if (config.enableSsl) {
            this.notify('PROGRESS', `Managing SSL for domain: ${config.domain}`, { step: 'ssl_manage' });
            await sslManager.manageCertificate({
                action: 'install',
                domain: config.domain
            });
        }
        // this.notify('SUCCESS', `Shared Hosting deployment for ${config.appName} steps completed.`, { step: 'finish_strategy' });
    }
}