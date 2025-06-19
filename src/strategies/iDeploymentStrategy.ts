import { DeploymentConfig } from '../config/deploymentConfig';
import { IInfrastructureFactory } from '../factories/iInfrastructureFactory';
import { IDeploymentObservable } from '../observers/iDeploymentObserver'; // Імпортуємо

export interface IDeploymentStrategy {
    execute(
        config: DeploymentConfig,
        factory: IInfrastructureFactory
    ): Promise<void>;
    setObservable?(observable: IDeploymentObservable): void;
}