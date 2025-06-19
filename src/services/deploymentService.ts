import { DeploymentConfig } from '../config/deploymentConfig';
import { IDeploymentStrategy } from '../strategies/iDeploymentStrategy';
import { SharedHostingStrategy } from '../strategies/sharedHostingStrategy';
import { KubernetesStrategy } from '../strategies/kubernetesStrategy';
import { IInfrastructureFactory } from '../factories/iInfrastructureFactory';
import { SharedHostingInfraFactory } from '../factories/sharedHostingInfraFactory';
import { KubernetesInfraFactory } from '../factories/kubernetesInfraFactory';
import { IDeploymentObserver, IDeploymentEvent, IDeploymentObservable } from '../observers/iDeploymentObserver';

export class DeploymentService implements IDeploymentObservable {
    private observers: IDeploymentObserver[] = [];
    private strategies: Map<string, IDeploymentStrategy>;
    private factories: Map<string, IInfrastructureFactory>;

    constructor() {
        this.strategies = new Map<string, IDeploymentStrategy>();
        this.strategies.set('shared', new SharedHostingStrategy());
        this.strategies.set('kubernetes', new KubernetesStrategy());

        this.factories = new Map<string, IInfrastructureFactory>();
        this.factories.set('shared', new SharedHostingInfraFactory());
        this.factories.set('kubernetes', new KubernetesInfraFactory());
        console.log('[DeploymentService] Initialized with strategies and factories.');
    }

    addObserver(observer: IDeploymentObserver): void {
        this.observers.push(observer);
        console.log(`[DeploymentService] Observer ${observer.constructor.name} added.`);
    }

    removeObserver(observer: IDeploymentObserver): void {
        this.observers = this.observers.filter(obs => obs !== observer);
        console.log(`[DeploymentService] Observer ${observer.constructor.name} removed.`);
    }

    notifyObservers(event: IDeploymentEvent): void {
        for (const observer of this.observers) {
            observer.update(event);
        }
    }

    async deploy(config: DeploymentConfig): Promise<void> {
        this.notifyObservers({
            type: 'INFO',
            message: `Starting deployment for ${config.appName} to ${config.hostingType}.`,
            details: { service: "DeploymentService" }
        });

        const strategy = this.strategies.get(config.hostingType);
        const factory = this.factories.get(config.hostingType);

        if (!strategy) {
            const errorMsg = `No deployment strategy found for hosting type: ${config.hostingType}`;
            this.notifyObservers({ type: 'ERROR', message: errorMsg, details: { service: "DeploymentService", app: config.appName } });
            throw new Error(errorMsg);
        }
        if (!factory) {
            const errorMsg = `No infrastructure factory found for hosting type: ${config.hostingType}`;
            this.notifyObservers({ type: 'ERROR', message: errorMsg, details: { service: "DeploymentService", app: config.appName } });
            throw new Error(errorMsg);
        }

        try {
            console.log(`[DeploymentService] Executing strategy: ${strategy.constructor.name} with factory: ${factory.constructor.name}`);
            await strategy.execute(config, factory, this);
            this.notifyObservers({
                type: 'SUCCESS',
                message: `Deployment of ${config.appName} completed successfully.`,
                details: { service: "DeploymentService" }
            });
            console.log(`[DeploymentService] Deployment for ${config.appName} succeeded.`);
        } catch (error: any) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            this.notifyObservers({
                type: 'ERROR',
                message: `Deployment of ${config.appName} failed: ${errorMessage}`,
                details: { service: "DeploymentService", app: config.appName, errorDetails: error.toString() }
            });
            console.error(`[DeploymentService] Deployment for ${config.appName} failed: ${errorMessage}`);
            throw error;
        }
    }
}