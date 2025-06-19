export interface ServerConfigDetails {
    domain: string;
    rootPath?: string;
}

export interface IServerProvisioner {
    configureWebServer(details: ServerConfigDetails): Promise<void>;
}