export interface ServerConfigDetails {
    domain: string;
    rootPath?: string;
}

export interface IServerProvisioner {
    configureWebServer(details: ServerConfigDetails): Promise<void>;
}

export class CPanelProvisioner implements IServerProvisioner {
    constructor() {
        console.log("CPanelProvisioner Initialized (stub).");
    }
    async configureWebServer(details: ServerConfigDetails): Promise<void> {
        console.log(`CPanelProvisioner: Configuring web server for domain ${details.domain} at path ${details.rootPath} (stub)...`);
        await new Promise(resolve => setTimeout(resolve, 50));
        console.log("CPanelProvisioner: Web server configuration simulated.");
    }
}