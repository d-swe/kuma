pipeline {
    agent any

    stages {
        stage('Build Frontend') {
            steps {
                sh "echo Building Frontend..."
                sh "cd kuma-ui && npm install && npm run build"
            }
        }

        stage('Build Backend') {
            steps {
                sh "echo Building Backend..."
                sh "cd kuma-ims && mvn clean install"
            }
        }
        
        stage('Deploy Frontend') {
            steps {
                script {
                    sh "echo Deploying Frontend..."
                    withAWS(region: 'us-east-1', credentials: 'dfa4b5a2-b9ff-4441-9214-4f67f42cf8f8') {
                        sh 'pwd'
                        sh "aws s3 sync kuma-ui/dist s3://kuma-frontend"
                    }
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                script {
                    sh "echo Deploying Backend..."
                    withAWS(region: 'us-east-1', credentials: 'dfa4b5a2-b9ff-4441-9214-4f67f42cf8f8') {
                        sh 'pwd'
                        sh "aws s3 cp kuma-ims/target/kuma-ims-0.0.1-SNAPSHOT.jar s3://kuma-backend"
                    }
                }
            }
        }
    }
}