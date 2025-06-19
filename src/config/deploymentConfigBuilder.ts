import { DeploymentConfig, DatabaseConfig } from './deploymentConfig';

export class DeploymentConfigBuilder {
    private config: Partial<DeploymentConfig>;

    constructor(appName: string, hostingType: DeploymentConfig['hostingType']) {
        this.config = { appName, hostingType, enableSsl: false };
    }

    withSourcePath(path: string): this {
        this.config.sourcePath = path;
        return this;
    }

    withDomain(domain: string): this {
        this.config.domain = domain;
        return this;
    }

    withSsl(enable: boolean = true): this {
        this.config.enableSsl = enable;
        return this;
    }

    withDatabase(dbConfig: DatabaseConfig): this {
        this.config.database = dbConfig;
        return this;
    }

    withCustomParam(key: string, value: any): this {
        if (!this.config.customParams) {
            this.config.customParams = {};
        }
        this.config.customParams[key] = value;
        return this;
    }

    build(): DeploymentConfig {
        if (!this.config.appName || !this.config.hostingType || !this.config.sourcePath || !this.config.domain) {
            throw new Error("Missing required fields: appName, hostingType, sourcePath, or domain.");
        }
        console.log(`[DeploymentConfigBuilder] Built config for: ${this.config.appName}`);
        return this.config as DeploymentConfig;
    }
}