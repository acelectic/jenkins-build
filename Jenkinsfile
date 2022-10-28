pipeline {
    // agent { label 'jenkins_agent' }
    agent any

    tools {
        nodejs "node-16"
    }

    environment {
        APP = 'jenkins-build'
        DOCKER_REGISTRY = 'acelectic'
        DOCKER_IMAGE = "${DOCKER_REGISTRY}/${APP}"
        REGISTRY_CREDENTIALS = "docker-hub-token"
        GITHUB_TOKEN = credentials('github-token')
        GIT_COMMIT_VERSION = "${env.GIT_COMMIT}"
    }

    // options {
    //     skipDefaultCheckout(true)
    // }

    stages {
        stage('Debug') {
            steps {

                // git branch: 'main', url: 'https://github.com/acelectic/jenkins-build.git'
                // scmSkip(deleteBuild: false)
                script {
                    sh """
                    yarn install
                    """
                }

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
                sh """
                yarn install
                """
            }
        }
    }

    stage('Lint') {
        when { changeRequest target: 'main' }
        steps {
            script {
                sh """
                yarn run lint:ci
                """
            }
        }
    }

    stage('Test') {
        when {
            anyOf {
                changeRequest target: 'main'
                branch 'main'
            }
        }
        steps {
            script {
                //   sh """
                //   npm run test:cov
                //   """
                sh """
                echo run test:cov
                """
            }
        }
    }

    stage('Check Code Quality') {
        when { branch 'main' }
        steps {
            script {
                sh """
                echo Check Code Quality
                """
                //   def scannerHome = tool 'sonarqube-scanner';
                //   withSonarQubeEnv("sonarqube") {
                //       sh """
                //       ${scannerHome}/bin/sonar-scanner \
                //       -Dsonar.projectKey=$APP \
                //       -Dsonar.sources=src \
                //       -Dsonar.tests=src \
                //       -Dsonar.test.inclusions=src/**/*.spec.ts,src/**/*.test.ts \
                //       -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                //       -Dsonar.testExecutionReportPaths=coverage/test-reporter.xml
                //       """
                //   }
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
                sh '''
                yarn install
                npx semantic-release
                '''
                env.TARGET_TAG = sh(script:'cat VERSION || echo ""', returnStdout: true).trim()

                docker.withRegistry("https://${DOCKER_REGISTRY}", REGISTRY_CREDENTIALS) {
                    dockerImage = docker.build("${DOCKER_IMAGE}:${GIT_COMMIT_VERSION}", "--build-arg VERSION TARGET_TAG ./dockerfiles")
                    dockerImage.push()
                }
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

        stage('Tag Docker Image') {
            when { allOf { branch 'main'; not { equals expected: "", actual: env.TARGET_TAG } } }
            steps {
                script {
                    docker.withRegistry("https://${DOCKER_REGISTRY}", REGISTRY_CREDENTIALS) {
                        dockerImage = docker.image("${DOCKER_IMAGE}:${GIT_COMMIT_VERSION}")
                        dockerImage.pull()

                        sh '''
                        docker tag ${DOCKER_IMAGE}:${GIT_COMMIT_VERSION} ${DOCKER_IMAGE}:$TARGET_TAG
                        '''

                        targetImage = docker.image("${DOCKER_IMAGE}:${TARGET_TAG}")
                        targetImage.push()
                        targetImage.push("latest")
                    }
                }
            }
        }

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
    // post {
    //     always {
    //         deleteDir()
    //     }
    // }
}
