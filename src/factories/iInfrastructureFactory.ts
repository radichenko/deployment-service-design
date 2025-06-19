export interface IInfrastructureFactory {
    createServerProvisioner(): any;
    createDatabaseManager(): any;
    createSslCertificateManager(): any;
}