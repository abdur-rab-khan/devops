FROM ubuntu

RUN echo "Setting started" && \
    apt-get update -y && \
    apt-get upgrade -y && \
    echo "Installing python3" && \
    apt-get install python3 -y
