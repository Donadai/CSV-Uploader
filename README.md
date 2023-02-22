# CSV-Uploader
Simple csv uploader app using Spring Boot, H2, and React.

App uses JAVA 17

## Running the app

#### Starting the server:  
* Enter the following command in the root directory if you're using Windows: **_mvnw.cmd spring-boot:run_**
* Enter the following command in the root directory if you're using a Unix-based system: **_./mvnw spring-boot:run_**
* If you have maven installed on your machine you can also use the following command in the root directory: **_mvn spring-boot:run_**
* You can also run the server using and IDE such as IntelliJ
 
#### Installing necessary packages:
* Navigate to the **/frontend** directory and run the command: **_npm install_**

#### Starting the React application:
* Navigate to the **/frontend** directory and run the command: **_npm start_** to start the React app.

---
Server runs on port: **8080**.  
React application runs on port: **3000**.

## Using the H2 console

#### Navigate to http://localhost:8080/h2-console

#### Input the following:
* Driver class: **_org.h2.Driver_**  
* JDBC URL: **_jdbc:h2:mem:testdb_**  
* User Name: **_sa_**  
* Password:
