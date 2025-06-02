pipeline {
    agent any

    stages {
        stage('Pull Code') {
            steps {
                git url: 'https://github.com/omkaryametkar/Final_DevOps_Web.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t my-node-app:latest .'
            }
        }

        stage('Run Docker Container') {
            steps {
                sh '''
                    docker stop my-node-container || true
                    docker rm my-node-container || true
                    docker run -d --name my-node-container -p 3000:3000 my-node-app:latest
                '''
            }
        }
    }
}
