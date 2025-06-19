import { DeploymentConfig } from '../config/deploymentConfig';
import { IDeploymentStrategy } from './iDeploymentStrategy';
import { IInfrastructureFactory } from '../factories/iInfrastructureFactory';
import { IDeploymentObservable, IDeploymentEvent } from '../observers/iDeploymentObserver';

export class SharedHostingStrategy implements IDeploymentStrategy {
    private notify(observable: IDeploymentObservable | undefined, type: IDeploymentEvent['type'], message: string, appName: string) {
        const event: IDeploymentEvent = { type, message, details: { strategy: 'SharedHosting', app: appName } };
        if (observable) {
            observable.notifyObservers(event);
        } else {
            console.log(`[SharedHostingStrategy] ${type}: ${message}`);
        }
    }

    async execute(config: DeploymentConfig, infraFactory: IInfrastructureFactory, observable?: IDeploymentObservable): Promise<void> {
        this.notify(observable, 'PROGRESS', `Preparing for deployment of ${config.appName}.`, config.appName);

        const serverProvisioner = infraFactory.createServerProvisioner();
        this.notify(observable, 'PROGRESS', 'Server provisioner obtained.', config.appName);
        await serverProvisioner.configureWebServer({ domain: config.domain, rootPath: config.sourcePath });

        if (config.database && config.database.type !== 'none') {
            const dbManager = infraFactory.createDatabaseManager();
            this.notify(observable, 'PROGRESS', 'Database manager obtained.', config.appName);
            await dbManager.manageDatabase({ action: 'create', ...config.database });
        }

        if (config.enableSsl) {
            const sslManager = infraFactory.createSslCertificateManager();
            this.notify(observable, 'PROGRESS', 'SSL manager obtained.', config.appName);
            await sslManager.manageCertificate({ action: 'install', domain: config.domain });
        }

        this.notify(observable, 'PROGRESS', `Simulating file upload/sync for ${config.appName}...`, config.appName);
        await new Promise(resolve => setTimeout(resolve, 150)); // Імітація дії

        // this.notify(observable, 'SUCCESS', `Shared hosting deployment for ${config.appName} completed.`, config.appName);
    }
}