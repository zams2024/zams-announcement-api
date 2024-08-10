pipeline {
    agent any
    environment {
        GIT_REPO = 'https://github.com/zams2024/zams-announcement-api.git'
        SSH_CREDENTIALS_ID = '5bb8f180-71ce-41e8-8d16-2e83e77a8615'
        DEPLOY_DIR = '/home/ubuntu/zams-announcement-api'
        SERVERS = ['52.203.26.43']
    }
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: "${GIT_REPO}"
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Linting') {
            steps {
                sh 'npm run lint'
            }
        }
        stage('Unit Test') {
            steps {
                sh 'npm run test'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Deploy to Servers') {
            steps {
                sshagent (credentials: [SSH_CREDENTIALS_ID]) {
                    script {
                        SERVERS.each { server ->
                            sh """
                            ssh ubuntu@${server} '
                            cd ${DEPLOY_DIR} &&
                            git pull &&
                            npm install &&
                            npm run build &&
                            pm2 restart zams-announcement-api || pm2 start dist/main.js --name "zams-announcement-api"'
                            """
                        }
                    }
                }
            }
        }
    }
    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed. Check logs for details.'
        }
    }
}
