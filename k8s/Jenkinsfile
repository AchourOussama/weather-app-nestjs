def runStage() {
   // Fetch the list of changed files from the last two commits
   def CHANGE_SET = sh(
      script: 'git diff --name-only HEAD~1 HEAD',
      returnStdout: true
   ).trim()
   
   echo "Current changeset: ${CHANGE_SET}"
   
   // Check for changes in specified directories or files 
   return CHANGE_SET =~ /(.*src.*|.*Dockerfile)/
}

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
                        # Check if kubectl exists otherwise install it 
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
       
        stage('Build Docker Image') {
            when { 
                expression { runStage() }
            }
            steps {
                echo "Changes detected in ./src or Dockerfile. Running the stage..."
                script {
                    app = docker.build("${DOCKER_IMAGE_NAME}") 
                }
            }
        }

        stage('Push Docker Image') {
            when { 
                expression { runStage() }
            }
            steps {
                echo "Changes detected in ./src directory or Dockerfile. Running the stage..."
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-credentials') {
                        app.push("latest")  
                    }
                }
            }
        }

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

