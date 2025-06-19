import { DeploymentConfig, DatabaseConfig } from './config/deploymentConfig';
import { DeploymentConfigBuilder } from './config/deploymentConfigBuilder';
import { LoggingObserver } from './observers/loggingObserver';
import { DeploymentService } from './services/deploymentService';

async function mainDemo() {
    console.log("Demo");

    const deploymentService = new DeploymentService();
    const logger = new LoggingObserver();
    deploymentService.addObserver(logger);

    let sharedConfig: DeploymentConfig;
    try {
        console.log("\nBuilding Shared Hosting config");
        const dbDetails: DatabaseConfig = {
            type: 'mysql',
            name: 'myblog_db',
            user: 'bloguser',
            password: 'securepassword123'
        };

        sharedConfig = new DeploymentConfigBuilder('MyAwesomeBlog', 'shared')
            .withSourcePath('/path/to/my/blog/sources')
            .withDomain('myawesomeblog.com')
            .withSsl(true)
            .withDatabase(dbDetails)
            .withCustomParam('phpVersion', '8.1')
            .build();
        console.log("Shared Hosting Config successfully built.");
    } catch (error: any) {
        console.error("Error building Shared Hosting config:", error.message);
        return;
    }

    try {
        console.log("\nAttempting Shared Hosting deployment...");
        await deploymentService.deploy(sharedConfig);
        console.log("Shared Hosting Deployment attempt finished.");
    } catch (error: any) {
        console.error("Error during shared hosting deployment in demo script:", error.message);
    }

    console.log("\nDeployment Demo Finished");
}

mainDemo().catch(err => {
    console.error("Unhandled exception in mainDemo:", err);
});