# Docker Container

- [Docker Container](#docker-container)
  - [Overview](#overview)
  - [Key Concepts](#key-concepts)
  - [Docker Container vs Virtual Machine](#docker-container-vs-virtual-machine)
  - [Commands for Managing Containers](#commands-for-managing-containers)
    - [Listing Containers](#listing-containers)
    - [Starting and Restarting Containers](#starting-and-restarting-containers)
    - [Stopping and Removing Containers](#stopping-and-removing-containers)
    - [Inspecting Containers](#inspecting-containers)

## Overview

- A **Docker container** is the runtime instance of a Docker [**image**](./image.md), which includes the application and its dependencies.
- Containers are lightweight, portable, and can run consistently across different environments.
- They share the host system's kernel but run in isolated user spaces.
- Docker containers are make up of several layers, which includes:

  - The base image layer (e.g., Ubuntu, Alpine).
  - Application layers (e.g., application code, libraries).
  - Configuration layers (e.g., environment variables, network settings).

- **Note:** We can also create our own custom Docker images using a `Dockerfile`, So that other can run on their local machine or server as a container.

- **Example**

  - For a simple web application with a Node.js backend and a MongoDB database, we can create two separate Docker containers:
    1. A container for the Node.js application.
    2. A container for the MongoDB database.
  - Both are run on it own isolated environments but can communicate with each other through Docker networking.

- **Note:** By default, We can't access the running container's port from the host machine, we have to explicitly map the container's port to the host machine's port using the `-p` or `--publish` flag when running the container.
- For example, to map port 80 of the container to port 8080 of the host machine, we can use the following command:

  ```bash
  docker run -p 8080:80 my-web-app
  ```

## Key Concepts

- **Isolation**: Each container runs in its own isolated environment, ensuring that applications do not interfere with each other.
- **Portability**: Containers can run on any system that supports Docker, making it easy to move applications between development, testing, and production environments.
- **Resource Efficiency**: Containers share the host OS kernel, making them more lightweight than traditional virtual machines.
- **Ephemeral**: Containers are designed to be temporary and can be easily created, started, stopped, and deleted.
- **Layered Filesystem**: Docker uses a layered filesystem, allowing multiple containers to share common layers, reducing disk space usage.
- **Networking**: Docker provides built-in networking capabilities, allowing containers to communicate with each other and with external systems.
- **Volumes**: Docker supports volumes for persistent data storage, allowing data to persist even when containers are deleted.

## Docker Container vs Virtual Machine

- At first glance, it seems like that Docker containers and virtual machines (VMs) are similar because both provide isolated environments for running applications. However, there are key differences between the two:

  | Feature            | Docker Container                              | Virtual Machine                            |
  | ------------------ | --------------------------------------------- | ------------------------------------------ |
  | **Isolation**      | Shares host OS kernel, isolated user space    | Full OS, complete isolation                |
  | **Resource Usage** | Lightweight, uses fewer resources             | Heavier, requires more resources           |
  | **Startup Time**   | Fast, starts in seconds                       | Slower, takes minutes to boot              |
  | **Portability**    | Highly portable across different environments | Less portable, tied to specific hypervisor |
  | **Management**     | Managed using Docker CLI/GUI                  | Managed using hypervisor tools             |
  | **Use Cases**      | Microservices, DevOps, CI/CD                  | Legacy applications, full OS environments  |

## Commands for Managing Containers

- `docker run [OPTIONS] IMAGE [COMMAND] [ARG...]`: Create and start a new container from an image.

### Listing Containers

- `docker ps [OPTIONS]`: List running containers.

  - `docker ps -a`: List all containers, including stopped ones.
  - `docker ps -q`: List only container IDs.
  - `docker ps --filter "status=exited"`: List only stopped containers.
  - `docker ps --format "{{.ID}}: {{.Names}}"`: Custom format for listing containers.

### Starting and Restarting Containers

- `docker start CONTAINER [CONTAINER...]`: Start one or more stopped containers.
- `docker restart CONTAINER [CONTAINER...]`: Restart one or more running containers.

### Stopping and Removing Containers

- `docker stop CONTAINER [CONTAINER...]`: Stop one or more running containers.

- `docker rm CONTAINER [CONTAINER...]`: Remove one or more stopped containers.

  - `docker rm -f CONTAINER [CONTAINER...]`: Force remove one or more running containers.

- `docker container prune`: Remove all stopped containers to free up space.
- `docker kill CONTAINER [CONTAINER...]`: Forcefully stop one or more running containers.

### Inspecting Containers

- `docker inspect CONTAINER [CONTAINER...]`: Display detailed information about one or more containers.
- `docker logs CONTAINER`: Fetch the logs of a container.
- `docker top CONTAINER`: Display the running processes inside a container.
- `docker stats [CONTAINER...]`: Display real-time resource usage statistics for one or more containers.
- `docker exec -it CONTAINER COMMAND`: Run a command inside a running container interactively.
- `docker attach CONTAINER`: Attach to a running container's console.
