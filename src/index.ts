import { DeploymentConfig, DatabaseConfig } from './config/deploymentConfig';
import { DeploymentConfigBuilder } from './config/deploymentConfigBuilder';
import { LoggingObserver } from './observers/loggingObserver';
import { DeploymentService } from './services/deploymentService';

async function runDemo() {
    console.log("Deploy demo");

    const deploymentService = new DeploymentService();
    const logger = new LoggingObserver();
    deploymentService.addObserver(logger);

    console.log("\n Case 1: Deploy to Shared Hosting");
    try {
        const sharedConfig = new DeploymentConfigBuilder('my-personal-blog', 'shared')
            .withSourcePath('/var/www/my-blog-src')
            .withDomain('myblog.example.com')
            .withSsl(true)
            .withDatabase({ type: 'mysql', name: 'myblog_db', user: 'bloguser', password: 'password123' } as DatabaseConfig)
            .build();
        await deploymentService.deploy(sharedConfig);
    } catch (e: any) {
        console.error(`DEMO CATCH: Shared Hosting deployment failed: ${e.message}`);
    }

    console.log("\nCase 2: Deploy to Kubernetes");
    try {
        const k8sConfig = new DeploymentConfigBuilder('my-cool-app', 'kubernetes')
            .withSourcePath('git@github.com:user/my-cool-app.git')
            .withDomain('app.example.com')
            .withSsl(true)
            .withCustomParam('namespace', 'production')
            .withCustomParam('replicas', 3)
            .withCustomParam('image', 'myorg/my-cool-app:v1.2.3')
            .build();
        await deploymentService.deploy(k8sConfig);
    } catch (e: any) {
        console.error(`DEMO CATCH: Kubernetes deployment failed: ${e.message}`);
    }
    console.log("\nDemo finished");
}

runDemo().catch(error => {
    console.error("Unhandled error in demo:", error);
});