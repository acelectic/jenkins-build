pipeline {
    // agent { label 'jenkins_agent' }
    agent any

    tools {
        nodejs 'node-18'
    }

    environment {
        APP = 'acelectic'
        PROJECT = 'jenkins-build'
        DOCKER_REGISTRY = 'registry-1.docker.io/v2'
        DOCKER_IMAGE = "${APP}/${PROJECT}"
        REGISTRY_CREDENTIALS = 'docker-hub-registry'
        GITHUB_TOKEN = credentials('github-token')
        GIT_ASKPASS = credentials('github-token')
        GIT_COMMIT_VERSION = "${env.GIT_COMMIT}"
        GIT_REPOSITORY_URL = 'https://github.com/acelectic/jenkins-build.git'
    }

    options {
        skipDefaultCheckout(true)
    }

    stages {
        stage('Checkout Git') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: 'main']], extensions: [], userRemoteConfigs: [[credentialsId: 'github-pass', url: 'https://github.com/acelectic/jenkins-build.git']]])
            }
        }

        stage('Install') {
            when {
                anyOf {
                    changeRequest target: 'main'
                    branch 'main'
                }
            }
            steps {
                // scmSkip(deleteBuild: false)
                script {
                    sh '''
                        yarn install
                    '''
                }
            }
        }

        // stage('Lint') {
        //     when { changeRequest target: 'main' }
        //     steps {
        //         script {
        //             sh '''
        //         yarn run lint:ci
        //         '''
        //         }
        //     }
        // }

        // stage('Test') {
        //     when {
        //         anyOf {
        //             changeRequest target: 'main'
        //             branch 'main'
        //         }
        //     }
        //     steps {
        //         script {
        //             //   sh """
        //             //   npm run test:cov
        //             //   """
        //             sh '''
        //         echo run test:cov
        //         '''
        //         }
        //     }
        // }

        // stage('Check Code Quality') {
        //     when { branch 'main' }
        //     steps {
        //         script {
        //             sh '''
        //         echo Check Code Quality
        //         '''
        //         //   def scannerHome = tool 'sonarqube-scanner';
        //         //   withSonarQubeEnv("sonarqube") {
        //         //       sh """
        //         //       ${scannerHome}/bin/sonar-scanner \
        //         //       -Dsonar.projectKey=$APP \
        //         //       -Dsonar.sources=src \
        //         //       -Dsonar.tests=src \
        //         //       -Dsonar.test.inclusions=src/**/*.spec.ts,src/**/*.test.ts \
        //         //       -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
        //         //       -Dsonar.testExecutionReportPaths=coverage/test-reporter.xml
        //         //       """
        //         //   }
        //         }
        //     }
        // }

        stage('Release') {
            when {
                anyOf {
                    branch 'main'
                    branch pattern: /hotfix\/[0-9]+\.[0-9]+\.[0-9]+/, comparator: 'REGEXP'
                }
            }
            steps {
                script {
                    sh '''
                        yarn install
                        npx semantic-release
                    '''
                    env.TARGET_TAG = sh(script:'cat VERSION || echo ""', returnStdout: true).trim()
                    echo "VERSION: [$env.TARGET_TAG]"
                }
            }
        }

        stage('Build Docker Image') {
            when { changeRequest target: 'main' }
            steps {
                script {
                    sh '''
                        echo $VERSION
                    '''

                    // docker.withRegistry("https://${DOCKER_REGISTRY}", REGISTRY_CREDENTIALS) {
                    //     dockerImage = docker.build("${DOCKER_IMAGE}:${GIT_COMMIT_VERSION}", '--build-arg VERSION TARGET_TAG ./dockerfiles')
                    //     dockerImage.push()
                    // }
                }
            }
        }

        // stage('Release') {
        //     when { branch 'main' }
        //     steps {
        //         script {
        //             sh '''
        //             yarn install
        //             npx semantic-release
        //             '''
        //             env.TARGET_TAG = sh(script:'cat VERSION || echo ""', returnStdout: true).trim()
        //         }
        //     }
        // }

        // stage('Tag Docker Image') {
        //     when { allOf { branch 'main'; not { equals expected: '', actual: env.TARGET_TAG } } }
        //     steps {
        //         script {
        //             docker.withRegistry("https://${DOCKER_REGISTRY}", REGISTRY_CREDENTIALS) {
        //                 dockerImage = docker.image("${DOCKER_IMAGE}:${GIT_COMMIT_VERSION}")
        //                 dockerImage.pull()

        //                 sh '''
        //                 docker tag ${DOCKER_IMAGE}:${GIT_COMMIT_VERSION} ${DOCKER_IMAGE}:$TARGET_TAG
        //                 '''

        //                 targetImage = docker.image("${DOCKER_IMAGE}:${TARGET_TAG}")
        //                 targetImage.push()
        //                 targetImage.push('latest')
        //             }
        //         }
        //     }
        // }

    //   stage('Deploy Dev') {
    //       when { allOf { branch 'main'; not { equals expected: "", actual: env.TARGET_TAG } } }
    //       steps {
    //           script {
    //               build wait: false, propagate: false, job: 'cpall/deploy dev', parameters: [
    //                   string(name: 'ENVIRONMENT', value: "${DEV_NAMESPACE}"),
    //                   string(name: 'SERVICE', value: "${SERVICE}"),
    //                   string(name: 'GIT_REPOSITORY', value: "${APP}"),
    //                   string(name: 'GIT_BRANCH', value: 'main'),
    //                   string(name: 'IMAGE_VERSION', value: "${TARGET_TAG}"),
    //                   booleanParam(name: 'DB_MIGRATION', value: false)
    //               ]
    //           }
    //       }
    //   }
    }
    post {
        always {
            deleteDir()
        }
    }
}
