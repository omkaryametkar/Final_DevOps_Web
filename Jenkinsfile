pipeline {
    agent any

    stages {
        stage('Pull Code') {
            steps {
                git url: 'git@github.com:omkaryametkar/Final_DevOps_Web.git', credentialsId: 'github-ssh-key'
            }
        }

        stage('Build') {
            steps {
                sh 'echo "Building app..."'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    echo "Deploying app..."
                    sudo cp -r * /var/www/html/
                    sudo systemctl restart apache2 || sudo systemctl restart httpd
                '''
            }
        }
    }
}
