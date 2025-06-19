import { DeploymentConfig } from '../config/deploymentConfig';
import { IDeploymentStrategy } from '../strategies/iDeploymentStrategy';
import { SharedHostingStrategy } from '../strategies/sharedHostingStrategy';
import { IInfrastructureFactory } from '../factories/iInfrastructureFactory';
import { SharedHostingInfraFactory } from '../factories/sharedHostingInfraFactory';
import { IDeploymentObservable, IDeploymentObserver, IDeploymentEvent } from '../observers/iDeploymentObserver';

export class DeploymentService implements IDeploymentObservable {
    private strategyRegistry: Map<string, () => IDeploymentStrategy> = new Map();
    private factoryRegistry: Map<string, () => IInfrastructureFactory> = new Map();
    private observers: IDeploymentObserver[] = [];

    constructor() {
        this.strategyRegistry.set('shared', () => new SharedHostingStrategy());
        this.factoryRegistry.set('shared', () => new SharedHostingInfraFactory());
    }

    addObserver(observer: IDeploymentObserver): void {
        this.observers.push(observer);
        console.log(`Observer ${observer.constructor.name} added.`);
    }

    removeObserver(observer: IDeploymentObserver): void {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
            console.log(`Observer ${observer.constructor.name} removed.`);
        }
    }

    notifyObservers(event: IDeploymentEvent): void {
        for (const observer of this.observers) {
            observer.update(event);
        }
    }

    private createEvent(type: IDeploymentEvent['type'], message: string, details?: any): IDeploymentEvent {
        return { type, message, timestamp: new Date(), details };
    }

    public async deploy(config: DeploymentConfig): Promise<void> {
        this.notifyObservers(this.createEvent('INFO', `Deployment process started for app: ${config.appName}`, { app: config.appName, hosting: config.hostingType }));

        const strategyConstructor = this.strategyRegistry.get(config.hostingType);
        const factoryConstructor = this.factoryRegistry.get(config.hostingType);

        if (!strategyConstructor || !factoryConstructor) {
            const errorMsg = `No strategy or factory found for hosting type '${config.hostingType}'.`;
            this.notifyObservers(this.createEvent('ERROR', errorMsg, { app: config.appName, hosting: config.hostingType }));
            console.error(errorMsg); // Також логуємо напряму для наочності
            return;
        }

        const activeStrategy = strategyConstructor();
        const activeFactory = factoryConstructor();
        this.notifyObservers(this.createEvent('INFO', `Using strategy: ${activeStrategy.constructor.name} and factory: ${activeFactory.constructor.name}`, { app: config.appName }));

        try {
            if ('setObservable' in activeStrategy && typeof (activeStrategy as any).setObservable === 'function') {
                (activeStrategy as any).setObservable(this);
            }
            await activeStrategy.execute(config, activeFactory);
            this.notifyObservers(this.createEvent('SUCCESS', `Deployment successfully completed for ${config.appName}.`, { app: config.appName }));
        } catch (error: any) {
            const errorMsg = error.message || 'Unknown error during strategy execution.';
            this.notifyObservers(this.createEvent('ERROR', `Error during deployment for ${config.appName}: ${errorMsg}`, { app: config.appName, error: error.toString() }));
            console.error(`Error during strategy execution for ${config.appName}:`, error);
        }
    }
}