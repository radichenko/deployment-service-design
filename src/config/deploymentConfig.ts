export interface DatabaseConfig {
    type: 'mysql' | 'postgresql' | 'none';
    name?: string;
    user?: string;
    password?: string;
}

export interface DeploymentConfig {
    appName: string;
    hostingType: 'shared' | 'vps' | 'kubernetes';
    sourcePath: string;
    domain: string;
    enableSsl: boolean;
    database?: DatabaseConfig;
    customParams?: { [key: string]: any };
}