import { DeploymentConfig } from '../config/deploymentConfig';
import { IDeploymentStrategy } from './iDeploymentStrategy';
import { IInfrastructureFactory } from '../factories/iInfrastructureFactory';

export class SharedHostingStrategy implements IDeploymentStrategy {
    constructor() {
        console.log("SharedHostingStrategy Initialized.");
    }

    async execute(config: DeploymentConfig, factory: IInfrastructureFactory): Promise<void> {
        console.log(`Executing for app: ${config.appName} using provided factory.`);
        console.log(`Deploying to Shared Hosting environment...`);

        const serverProvisioner = factory.createServerProvisioner();
        const dbManager = factory.createDatabaseManager();
        const sslManager = factory.createSslCertificateManager();

        console.log("Obtained infrastructure components from factory.");

        console.log("Attempting to configure web server...");
        await serverProvisioner.configureWebServer({ domain: config.domain, rootPath: config.sourcePath });
        console.log("Web server configuration step completed.");

        if (config.database && config.database.type !== 'none') {
            console.log(`Attempting to manage database: ${config.database.name}`);
            await dbManager.manageDatabase({
                action: 'create',
                dbName: config.database.name!,
                dbUser: config.database.user,
                dbPassword: config.database.password
            });
            console.log("Database management step completed.");
        }

        if (config.enableSsl) {
            console.log(`Attempting to install SSL for domain: ${config.domain}`);
            await sslManager.manageCertificate({
                action: 'install',
                domain: config.domain
            });
            console.log("SSL certificate management step completed.");
        }

        console.log(`Deployment simulation for ${config.appName} on Shared Hosting using factory completed.`);
    }
}