import { DeploymentConfig } from '../config/deploymentConfig';
import { IDeploymentStrategy } from './iDeploymentStrategy';
import { IInfrastructureFactory } from '../factories/iInfrastructureFactory';
import { IDeploymentObservable, IDeploymentEvent } from '../observers/iDeploymentObserver';

export class KubernetesStrategy implements IDeploymentStrategy {
    private notify(observable: IDeploymentObservable | undefined, type: IDeploymentEvent['type'], message: string, appName: string) {
        const event: IDeploymentEvent = { type, message, details: { strategy: 'Kubernetes', app: appName } };
        if (observable) {
            observable.notifyObservers(event);
        } else {
            console.log(`[KubernetesStrategy] ${type}: ${message}`);
        }
    }

    async execute(config: DeploymentConfig, infraFactory: IInfrastructureFactory, observable?: IDeploymentObservable): Promise<void> {
        this.notify(observable, 'INFO', `Starting Kubernetes deployment steps for ${config.appName}.`, config.appName);

        const serverProvisioner = infraFactory.createServerProvisioner();
        await serverProvisioner.configureWebServer({
            domain: config.domain,
            appName: config.appName,
            image: config.customParams?.image || `${config.appName}:latest`,
            namespace: config.customParams?.namespace || 'default',
            replicas: config.customParams?.replicas || 1
        });

        // ...database, ssl

        this.notify(observable, 'PROGRESS', `Kubernetes deployment pipeline triggered for ${config.appName}.`, config.appName);
        await new Promise(resolve => setTimeout(resolve, 50)); // Дуже коротка імітація
    }
}