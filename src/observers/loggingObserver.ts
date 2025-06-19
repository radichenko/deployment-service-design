import { IDeploymentObserver, IDeploymentEvent } from './iDeploymentObserver';

export class LoggingObserver implements IDeploymentObserver {
    update(event: IDeploymentEvent): void {
        const timestamp = new Date().toLocaleTimeString();
        let logMessage = `[${timestamp}] [LoggingObserver] ${event.type}: ${event.message}`;
        if (event.details) {
            logMessage += `Details: ${JSON.stringify(event.details)}`;
        }
        console.log(logMessage);
    }
}