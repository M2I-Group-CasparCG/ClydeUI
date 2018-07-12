pipeline {
  agent any
  stages {
    stage('npm-install') {
      steps {
        sh 'npm install'
      }
    }
    stage('npm-test') {
      steps {
        sh 'npm test'
      }
    }
    stage('ng-build') {
      steps {
        sh 'ng build'
      }
    }
    stage('Sonar-Scan') {
      steps {
        sh '/etc/sonar-scanner-3.1.0.1141-linux/bin/sonar-scanner -Dproject.settings=../ClydeUi_master_sonar-project.properties'
      }
    }
  }
}

