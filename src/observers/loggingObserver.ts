import { IDeploymentObserver, IDeploymentEvent } from './iDeploymentObserver';

export class LoggingObserver implements IDeploymentObserver {
    constructor() {
        console.log("LoggingObserver Initialized.");
    }

    update(event: IDeploymentEvent): void {
        const time = event.timestamp.toLocaleTimeString();
        let logEntry = `${time} [${event.type}] ${event.message}`;
        if (event.details) {
            logEntry += ` (Details: ${JSON.stringify(event.details)})`;
        }
        console.log(logEntry);
    }
}