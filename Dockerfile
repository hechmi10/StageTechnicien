FROM openjdk:22
WORKDIR /app
COPY target/SysHR-0.0.1-SNAPSHOT.jar /app/SysHR.jar
EXPOSE 8080
CMD ["java", "-jar", "/app/SysHR.jar"]