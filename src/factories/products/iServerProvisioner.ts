export interface ServerConfigDetails {
    domain: string;
    rootPath?: string;
    appName?: string;
    image?: string;
    namespace?: string;
    replicas?: number;
    [key: string]: any;
}

export interface IServerProvisioner {
    configureWebServer(details: ServerConfigDetails): Promise<void>;
}

export class CPanelProvisioner implements IServerProvisioner {
    async configureWebServer(details: ServerConfigDetails): Promise<void> {
        console.log(`[CPanelProvisioner] ACTION: Configuring web server for ${details.domain} at ${details.rootPath} via CPanel API (simulation).`);
        await new Promise(resolve => setTimeout(resolve, 50));
    }
}

export class KubectlProvisioner implements IServerProvisioner {
    async configureWebServer(details: ServerConfigDetails): Promise<void> {
        console.log(`[KubectlProvisioner] ACTION: Provisioning server for ${details.appName} (Kubernetes).`);
        await new Promise(resolve => setTimeout(resolve, 20));
    }
}