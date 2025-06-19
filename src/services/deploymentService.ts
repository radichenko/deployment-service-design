import { DeploymentConfig } from '../config/deploymentConfig';
import { IDeploymentStrategy } from '../strategies/iDeploymentStrategy';
import { SharedHostingStrategy } from '../strategies/sharedHostingStrategy';

export class DeploymentService {
    private activeStrategy: IDeploymentStrategy | null = null;

    constructor() {
        console.log("DeploymentService initialized.");
    }

    public async deploy(config: DeploymentConfig): Promise<void> {
        console.log(`Received deployment request for app: ${config.appName}`);
        console.log(`Hosting type: ${config.hostingType}`);

        if (config.hostingType === 'shared') {
            this.activeStrategy = new SharedHostingStrategy();
            console.log("Selected SharedHostingStrategy.");
        } else {
            console.error(`Hosting type '${config.hostingType}' is not yet supported.`);
            this.activeStrategy = null;
            return;
        }

        if (this.activeStrategy) {
            try {
                await this.activeStrategy.execute(config);
                console.log(`Strategy execution completed for ${config.appName}.`);
            } catch (error) {
                console.error(`Error during strategy execution for ${config.appName}:`, error);
            }
        } else {
            console.log(`No active strategy to execute for ${config.appName}.`);
        }
    }
}