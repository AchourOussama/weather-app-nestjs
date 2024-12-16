# About the project: 

This is a **weather forecasting application** that retrieves weather data for a given city name using the [OpenWeather API](https://openweathermap.org/).

This repository includes the source code for the Backend tier of this application, written in **NestJS**.
Check other related repositories : 
- [Frontend (NestJS)](https://github.com/AchourOussama/weather-app-angular)
- [Infrastructure(Azure with Terraform )](https://github.com/AchourOussama/weather-app-infra) 


# Technologies: 
- **NestJS:** A progressive Node.js framework for building efficient, scalable, and maintainable server-side applications.
- **Docker:** For containerizing the application to ensure consistency across environments.
- **Kubernetes:** To orchestrate the deployment and scaling of containers.
- **Jenkins:** For automating the build, and deployment pipelines.

# Deployment Options
The application supports two deployment methods:

### Local Deployment on Kubernetes:

- Refer to the [k8s](./k8s/) folder which contains the k8s manifests required to deploy the application
- Refer to the [Jenkinsfile](./k8s/Jenkinsfile) which details the local Kubernetes deployment pipeline.

### Deployment on Azure:
- Refer to the [Infrastructure repository](https://github.com/AchourOussama/weather-app-infra) which describes the Azure resources to be deployed
- Refer to the [Jenkinsfile](./Jenkinsfile), which builds the backend Docker image, pushes it to the Azure Container Registry (ACR), and restarts the running application (Azure Web App)
