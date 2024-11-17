pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'dockerhub-credentials'
        DOCKER_IMAGE_NAME = 'oussachour/weather-app-nestjs:latest' 
    }

    stages {
        
        stage('Install Kubectl') {
            steps {
                withKubeConfig([credentialsId: 'kube-config']) {
                    sh '''
                        # Check if kubectl exists
                        if ! command -v kubectl 2>&1 >/dev/null; then
                            echo "kubectl not found. Installing..."
                            curl -LO "https://storage.googleapis.com/kubernetes-release/release/v1.29.0/bin/linux/arm64/kubectl"
                            chmod u+x ./kubectl
                            mv ./kubectl /bin/kubectl
                        else
                            echo "kubectl is already installed."
                        fi

                        # Display the kubectl version
                        kubectl version --client
                    '''
                }
            }
        }

        // stage('Clone Repository') {
        //     steps {
        //         git url: 'https://github.com/AchourOussama/weather-app-nestjs', branch: 'main' 
        //     }
        // }

        // stage('Build Docker Image') {
        //     steps {
        //         script {
        //             app = docker.build("${DOCKER_IMAGE_NAME}") 
        //         }
                
        //     }
        // }

        // stage('Push Docker Image') {
        //     steps {
        //         script {
        //             docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-credentials') {
        //                 app.push("latest")  
        //             }
        //         }
        //     }
        // }
        stage('Deploy App on k8s') {
          steps {
            withCredentials([
                string(credentialsId: 'jenkins-k8s-token', variable: 'api_token')
                ]) {
                 sh 'kubectl --token $api_token --server https://192.168.49.2:8443  --insecure-skip-tls-verify=true apply -f k8s/deployment.yaml'
                 sh 'kubectl --token $api_token --server https://192.168.49.2:8443  --insecure-skip-tls-verify=true apply -f k8s/service.yaml'
                  }
                }
        }

    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}

