pipeline {
    agent any

    stages {
        stage('Pull Code') {
            steps {
                git url: 'https://github.com/omkaryametkar/Final_DevOps_Web.git'
            }
        }

        stage('Build') {
            steps {
                sh 'echo "Building app..."'
                // Uncomment if you have Docker
                // sh 'docker build -t myapp .'
            }
        }

        stage('Deploy') {
            steps {
                sh 'echo "Deploying app..."'
                // Uncomment if deploying using Docker

                // sh 'docker run -d -p 80:80 myapp'
            }
        }
    }
}
