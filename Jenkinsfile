@Library('galactech-shared-lib')_
pipeline {
  agent any
  stages {
    stage("init"){
      steps{
        script{
          dockerLogin("https://docker.galactechstudio.com","docker-cred")
        }

      }
    }
    stage("Quality code check"){
      steps {
        sh 'sonar-scan ./delivery.properties'
      }
    }
    stage("build docker images"){
      steps {
        script{
          if(BRANCH_NAME == 't7d_delivery_service'){
            BuildImage('docker.galactechstudio.com/t7d_delivery_service:latest')
          }
        }
      }
    }
    stage("push docker image"){
      steps {
        script{
          if(BRANCH_NAME == 'authentication'){
            dockerPush('docker.galactechstudio.com/t7d_delivery_service:latest')
          }
          if(BRANCH_NAME == 't7d_delivery_service'){
            dockerPush('docker.galactechstudio.com/t7d_delivery_service:latest')
          }
        }
      }   
    }
    stage("deploy  branch") {
      steps {
        script {
          sh 'envsubst < delevirey.yaml | kubectl apply -f -'
        }
      }
    }
  }
  post {
    success {
       discordSend description: "T7D $BRANCH_NAME    deployed successfully", link: env.BUILD_URL, result: currentBuild.currentResult, title: BRANCH_NAME, webhookURL: "https://discord.com/api/webhooks/907974702847377411/YAW4qz0j7A3skOVVRpDiuLran7tYLe52qMtVSOzn4zs9aro1A-MkFmr3mMa9F86ZsObo"
    }
  }
}
