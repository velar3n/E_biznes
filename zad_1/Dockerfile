#TBD 24.02
FROM ubuntu:22.04

# Python 3.10, Java and SQLite instalation
RUN apt-get update && \
    apt-get install -y software-properties-common curl unzip zip tzdata wget && \
    add-apt-repository ppa:deadsnakes/ppa && \
    apt-get update && apt-get install -y python3.10 openjdk-8-jdk sqlite3 libsqlite3-dev

# Kotlin and Gradle instalation
RUN curl -s "https://get.sdkman.io" | bash
RUN bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && sdk install kotlin && sdk install gradle"
ENV PATH=$PATH:/root/.sdkman/candidates/gradle/8.0.2/bin

# JDBC SQLite instalation
RUN wget https://repo1.maven.org/maven2/org/xerial/sqlite-jdbc/3.45.1.0/sqlite-jdbc-3.45.1.0.jar -O /usr/local/lib/sqlite-jdbc.jar