import { DeploymentConfig, DatabaseConfig } from './deploymentConfig';

export class DeploymentConfigBuilder {
    private config: Partial<DeploymentConfig>;

    constructor(appName: string, hostingType: DeploymentConfig['hostingType']) {
        this.config = { appName, hostingType, enableSsl: false };
        console.log(`Initialized for: ${appName}, Type: ${hostingType}`);
    }

    withSourcePath(path: string): this {
        this.config.sourcePath = path;
        return this;
    }

    withDomain(domain: string): this {
        this.config.domain = domain;
        return this;
    }

    build(): DeploymentConfig {
        if (!this.config.appName || !this.config.hostingType || !this.config.sourcePath || !this.config.domain) {
            console.error("Missing required fields for build");
        }
        console.log(`Built config for: ${this.config.appName}`);
        return this.config as DeploymentConfig;
    }
}