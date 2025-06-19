import { DeploymentConfig } from '../config/deploymentConfig';
import { IInfrastructureFactory } from '../factories/iInfrastructureFactory';

export interface IDeploymentStrategy {
    execute(
        config: DeploymentConfig,
        factory: IInfrastructureFactory
    ): Promise<void>;
}