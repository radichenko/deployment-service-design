

# Site Deployment Service - Design

This is a demonstration of how GoF patterns can be used to structure a service for deploying websites.

## Approach

How I used the patterns:

1.  **Strategy Pattern**:
    *   I have an `IDeploymentStrategy` interface, and concrete classes like `SharedHostingStrategy` and `KubernetesStrategy`. The main `DeploymentService` picks the right strategy based on the deployment configuration.

2.  **Abstract Factory Pattern**:
    *   I have an `IInfrastructureFactory` interface. Concrete factories like `SharedHostingInfraFactory` and `KubernetesInfraFactory` create the specific "product" objects. Each strategy gets the correct factory.

3.  **Builder Pattern**:
    *   I created a `DeploymentConfigBuilder` class that allows fluent construction of a `DeploymentConfig` object.

4.  **Observer Pattern**:
    *   I have an `IDeploymentObserver` interface that can subscribe to the `DeploymentService`. The service can then notify all observers about important events.

5.  **Facade Pattern**:
    *   The `DeploymentService` acts as a Facade. The user only needs to interact with `deploymentService.deploy(config)`, and the service coordinates all the internal work with strategies, factories, etc.

## Code Structure

I've organized the code into folders based on the patterns or their responsibilities. The code itself mostly contains interfaces and class structures. The actual methods in concrete classes don't perform real actions but use `console.log` to show that they were called and what they would conceptually do.

The `src/index.ts` file contains a small demo script to show how these components would be used together and to simulate two of deployment cases.

### How to install and run

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/radichenko/deployment-service-design.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd deployment-service-design
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4. **Run demo:**
    ```bash
    npx ts-node src/index.ts
    ```