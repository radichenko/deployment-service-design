export interface DatabaseOperationDetails {
    action: 'create' | 'delete' | 'backup' | 'create_via_helm';
    type?: 'mysql' | 'postgresql' | 'none';
    name?: string;
    user?: string;
    password?: string;
    chart?: string; // для helm
    [key: string]: any;
}

export interface IDatabaseManager {
    manageDatabase(details: DatabaseOperationDetails): Promise<void>;
}

export class SharedMySQLManager implements IDatabaseManager {
    async manageDatabase(details: DatabaseOperationDetails): Promise<void> {
        console.log(`[SharedMySQLManager] ACTION: Creating MySQL database ${details.name} for user ${details.user} (simulation).`);
        await new Promise(resolve => setTimeout(resolve, 50));
    }
}

export class KubernetesDBManager implements IDatabaseManager {
    async manageDatabase(details: DatabaseOperationDetails): Promise<void> {
        console.log(`[KubernetesDBManager] ACTION: Managing database ${details.name} (Kubernetes).`);
        await new Promise(resolve => setTimeout(resolve, 20));
    }
}