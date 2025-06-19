import { DeploymentConfig } from '../config/deploymentConfig';
import { IInfrastructureFactory } from '../factories/iInfrastructureFactory';
import { IDeploymentObservable } from '../observers/iDeploymentObserver';

export interface IDeploymentStrategy {
    execute(
        config: DeploymentConfig,
        infraFactory: IInfrastructureFactory,
        observable?: IDeploymentObservable
    ): Promise<void>;
}

