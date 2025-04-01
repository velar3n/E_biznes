FROM ubuntu:24.04

ENV HOME=/root

# Java and SQLite instalation
RUN apt-get update && \
    apt-get install -y software-properties-common curl unzip zip tzdata wget && \
    apt-get update && apt-get install -y openjdk-8-jdk sqlite3 libsqlite3-dev && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Kotlin and Gradle instalation
RUN curl -s "https://get.sdkman.io" | bash && \
    bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && sdk install kotlin && sdk install gradle"

ENV SDKMAN_DIR="$HOME/.sdkman"
ENV PATH="$SDKMAN_DIR/bin:$SDKMAN_DIR/candidates/kotlin/current/bin:$SDKMAN_DIR/candidates/gradle/current/bin:$PATH"
ENV PATH="/opt/kotlin/bin:${PATH}"
ENV GRADLE_HOME=/opt/gradle
ENV PATH="${GRADLE_HOME}/bin:${PATH}"

# JDBC SQLite instalation
RUN wget https://repo1.maven.org/maven2/org/xerial/sqlite-jdbc/3.45.1.0/sqlite-jdbc-3.45.1.0.jar -O /usr/local/lib/sqlite-jdbc.jar

# Verify installations
RUN java -version && \
    kotlinc -version && \
    gradle -v && \
    sqlite3 --version

COPY . /app
WORKDIR /app

RUN gradle clean build

CMD ["java", "-jar", "build/libs/app.jar"]