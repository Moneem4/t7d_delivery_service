stage("Quality code check"){
  steps {
   withCredentials([string(credentialsId: 'abderrahmen-sonar-token', variable: 'TOKEN')]) {
      sh "npm install sonar-scanner"
      sh "npm run sonar -Dsonar.login=${TOKEN}"
    }
  }
}
