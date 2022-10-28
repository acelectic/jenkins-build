pipeline {
    agent { label 'jenkins_agent' }

    tools {
        nodejs "node-16"
    }

    environment {
        GIT_COMMIT_VERSION = "${env.GIT_COMMIT}"
    }

    stages {

        stage('Install') {
            when {
                anyOf {
                    changeRequest target: 'main'
                    branch 'main'
                }
            }
            steps {
                scmSkip(deleteBuild: false)
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
                  echo $
                  '''
         
                  dockerImage = docker.build("test:${GIT_COMMIT_VERSION}")
                  dockerImage.push()
                }
            }
        }

        stage('Release') {
            when { branch 'main' }
            steps {
                script {
                    sh '''
                    yarn install
                    npx semantic-release
                    '''
                    env.TARGET_TAG = sh(script:'cat VERSION || echo ""', returnStdout: true).trim()
                }
            }
        }

      //   stage('Tag Docker Image') {
      //       when { allOf { branch 'main'; not { equals expected: "", actual: env.TARGET_TAG } } }
      //       steps {
      //           script {
      //               docker.withRegistry("https://${DOCKER_REGISTRY}", REGISTRY_CREDENTIALS) {
      //                   dockerImage = docker.image("${DOCKER_IMAGE}:${GIT_COMMIT_VERSION}")
      //                   dockerImage.pull()

      //                   sh '''
      //                   docker tag ${DOCKER_IMAGE}:${GIT_COMMIT_VERSION} ${DOCKER_IMAGE}:$TARGET_TAG
      //                   '''

      //                   targetImage = docker.image("${DOCKER_IMAGE}:${TARGET_TAG}")
      //                   targetImage.push()
      //                   targetImage.push("latest")
      //               }
      //           }
      //       }
      //   }

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
