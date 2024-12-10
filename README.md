### About the project : 

Node JS weather application : 
Querying weather data from the [OpenWeather API](https://openweathermap.org/) for a given city name. 

## Technologies: 
- NodeJS 
- Docker
- Kubernetes
- Jenkins 


## Note: 

For deployment , we have two options : 
- Deploying the application locally on k8s , check [Jenkinsfile](./k8s/Jenkinsfile)
- Deploying the application on Microsoft Azure on k8s , check [Jenkinsfile](./Jenkinsfile)

For the Azure deployment option , the Jenkinsfile will just build the backend docker image and push it to the **Azure Container Registry**.
The provisioning of resources and deployment of the application is described in this [repository](https://github.com/AchourOussama/weather-app-infra) which contains the terraform configuration