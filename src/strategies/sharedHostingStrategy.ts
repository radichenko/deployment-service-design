import { DeploymentConfig } from '../config/deploymentConfig';
import { IDeploymentStrategy } from './iDeploymentStrategy';

export class SharedHostingStrategy implements IDeploymentStrategy {
    constructor() {
        console.log("SharedHostingStrategy Initialized.");
    }

    async execute(config: DeploymentConfig): Promise<void> {
        console.log(`Executing for app: ${config.appName}`);
        console.log(`Deploying to Shared Hosting environment...`);
        // Отримати доступ
        // Завантажити файли з config.sourcePath
        // веб-сервер
        // БД
        // SSL
        await new Promise(resolve => setTimeout(resolve, 150));
        console.log(`Deployment simulation for ${config.appName} on Shared Hosting completed.`);
    }
}