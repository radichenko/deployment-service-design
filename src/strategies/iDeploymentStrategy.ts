import { DeploymentConfig } from '../config/deploymentConfig';

export interface IDeploymentStrategy {
    execute(
        config: DeploymentConfig
        // factory: IInfrastructureFactory
    ): Promise<void>;
}