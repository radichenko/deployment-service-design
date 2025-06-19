export interface DatabaseOperationDetails {
    action: 'create' | 'delete' | 'backup';
    dbName: string;
    dbUser?: string;
    dbPassword?: string;
}

export interface IDatabaseManager {
    manageDatabase(details: DatabaseOperationDetails): Promise<void>;
}