pipeline {
    agent any

    stages {

        // ===== FRONTEND BUILD =====
        stage('Build Frontend') {
            steps {
                dir('FRONTEND/DevopsPratice') {
                    bat 'npm install'
                    bat 'npm run build'  // usually generates 'build' folder
                }
            }
        }

        // ===== FRONTEND DEPLOY =====
        stage('Deploy Frontend to Tomcat') {
            steps {
                bat '''
                set FRONTEND_BUILD=FRONTEND\\DevopsPratice\\build
                set TOMCAT_WEBAPP=C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\reactteacherapi

                if exist "%TOMCAT_WEBAPP%" (
                    rmdir /S /Q "%TOMCAT_WEBAPP%"
                )
                mkdir "%TOMCAT_WEBAPP%"
                xcopy /E /H /I /Y "%FRONTEND_BUILD%\\*" "%TOMCAT_WEBAPP%"
                '''
            }
        }

        // ===== BACKEND BUILD =====
        stage('Build Backend') {
            steps {
                dir('BACKEND/SpringBootPratice') {
                    bat 'mvn clean package -DskipTests' // skip tests if you want faster build
                }
            }
        }

        // ===== BACKEND DEPLOY =====
        stage('Deploy Backend to Tomcat') {
            steps {
                bat '''
                set BACKEND_WAR=BACKEND\\SpringBootPratice\\target\\*.war
                set TOMCAT_WAR=C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\teacher-backend.war
                set TOMCAT_APP=C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\teacher-backend

                if exist "%TOMCAT_WAR%" (
                    del /Q "%TOMCAT_WAR%"
                )
                if exist "%TOMCAT_APP%" (
                    rmdir /S /Q "%TOMCAT_APP%"
                )
                copy "%BACKEND_WAR%" "%TOMCAT_WAR%"
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Pipeline Failed.'
        }
    }
}
