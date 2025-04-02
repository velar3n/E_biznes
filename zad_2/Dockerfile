# Basic setup
FROM ubuntu:22.04

RUN apt-get update && \
    apt-get install -y curl unzip zip && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Scala
RUN curl -s "https://get.sdkman.io" | bash && \
    bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && \
    sdk install java 17.0.10-amzn && \
    sdk install sbt 1.9.7 && \
    sdk install scala 3.3.1"

# Set environment variables
ENV PATH=$PATH:/root/.sdkman/candidates/java/current/bin
ENV PATH=$PATH:/root/.sdkman/candidates/sbt/current/bin
ENV PATH=$PATH:/root/.sdkman/candidates/scala/current/bin

COPY . /app
WORKDIR /app

EXPOSE 9000

CMD ["sbt", "run"]