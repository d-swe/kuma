pipeline {
    agent any

    environment {
        DB_CREDENTIALS = credentials('db_cred')
        DB_URL = credenials('db_url')
        DB_USERNAME = DB_CREDENTIALS.username
        DB_PASSWORD = DB_CREDENTIALS.password
    }

    stages {
        stage('Build Frontend') {
            steps {
                sh "echo Building Frontend..."
                sh "cd kuma-ui && npm install && npm run build"
            }
        }

        stage('Build Backend') {
            steps {
                    sh """
                        echo Building Backend...
                        cd kuma-ims
                        mvn clean install \
                            -Dspring.datasource.url=${DB_URL} \
                            -Dspring.datasource.username=${DB_USERNAME} \
                            -Dspring.datasource.password=${DB_PASSWORD}
                    """
            }
        }
        
        stage('Deploy Frontend') {
            steps {
                script {
                    sh "echo Deploying Frontend..."
                    withAWS(region: 'us-east-1', credentials: 'aws-cred') {
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
                    withAWS(region: 'us-east-1', credentials: 'aws-cred') {
                        sh 'pwd'
                        sh "aws s3 cp kuma-ims/target/kuma-ims-0.0.1-SNAPSHOT.jar s3://kuma-backend"
                    }
                }
            }
        }
    }
}