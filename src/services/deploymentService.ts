import { DeploymentConfig } from '../config/deploymentConfig';
import { IDeploymentStrategy } from '../strategies/iDeploymentStrategy';
import { SharedHostingStrategy } from '../strategies/sharedHostingStrategy';
import { IInfrastructureFactory } from '../factories/iInfrastructureFactory';
import { SharedHostingInfraFactory } from '../factories/sharedHostingInfraFactory';

export class DeploymentService {
    private strategyRegistry: Map<string, () => IDeploymentStrategy> = new Map();
    private factoryRegistry: Map<string, () => IInfrastructureFactory> = new Map();

    constructor() {
        console.log("DeploymentService Initialized.");
        this.strategyRegistry.set('shared', () => new SharedHostingStrategy());
        this.factoryRegistry.set('shared', () => new SharedHostingInfraFactory());
    }

    public async deploy(config: DeploymentConfig): Promise<void> {
        console.log(`Received deployment request for app: ${config.appName}`);
        console.log(`Hosting type: ${config.hostingType}`);

        const strategyConstructor = this.strategyRegistry.get(config.hostingType);
        const factoryConstructor = this.factoryRegistry.get(config.hostingType);

        if (!strategyConstructor || !factoryConstructor) {
            console.error(`No strategy or factory found for hosting type '${config.hostingType}'.`);
            return;
        }

        const activeStrategy = strategyConstructor();
        const activeFactory = factoryConstructor();
        console.log(`Selected strategy: ${activeStrategy.constructor.name}, factory: ${activeFactory.constructor.name}`);


        if (activeStrategy && activeFactory) {
            try {
                await activeStrategy.execute(config, activeFactory);
                console.log(`Strategy execution completed for ${config.appName}.`);
            } catch (error) {
                console.error(`Error during strategy execution for ${config.appName}:`, error);
            }
        } else {
            // console.log(`No active strategy or factory to execute for ${config.appName}.`);
        }
    }
}