export interface IDeploymentEvent {
    type: 'PROGRESS' | 'SUCCESS' | 'ERROR' | 'INFO';
    message: string;
    details?: any;
}

export interface IDeploymentObserver {
    update(event: IDeploymentEvent): void;
}

export interface IDeploymentObservable {
    addObserver(observer: IDeploymentObserver): void;
    removeObserver(observer: IDeploymentObserver): void;
    notifyObservers(event: IDeploymentEvent): void;
}