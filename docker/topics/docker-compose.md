# Docker Compose

- [Docker Compose](#docker-compose)
  - [Overview](#overview)
  - [Try it out](#try-it-out)
  - [Commands](#commands)
  - [File Structure](#file-structure)

## Overview

- To install any images what we actually do we use `docker pull <image-name>` command, than we run that image using `docker run <image-name>` command.
- But the problem with this approach is how do we connect multiple containers together, So that they can communicate with each other through network.
- Solution, Docker Compose, it use a single `docker-compose.yml` file with all configurations and images defined.
- The best part about Docker compose is that they by default create a network for all the containers defined in the `docker-compose.yml` file.
- To run the docker compose file we use `docker-compose up` command.
- **Difference between Dockerfile versus Compose file**

  | Dockerfile                                                          | Docker Compose file                                                  |
  | ------------------------------------------------------------------- | -------------------------------------------------------------------- |
  | It is used to build a container image                               | It used to run multiple containers from images                       |
  | Often Compose file references a Dockerfile for a particular service | It can also use pre-built images from Docker Hub or other registries |

## Try it out

- Create a file named `docker-compose.yml` and add the following content to it.

  ```yaml
  version: "3"
  services:
    web:
      image: nginx:latest
      ports:
        - "8080:80"
    db:
      image: mysql:5.7
      environment:
        MYSQL_ROOT_PASSWORD: example
  ```

- Now run the following command to start the services defined in the `docker-compose.yml` file.

  ```bash
    docker-compose up
  ```

- This command will pull the `nginx` and `mysql` images from Docker Hub (if not already present) and start the containers.

## Commands

1. `docker compose up` - Starts the services defined in the `docker-compose.yml` file.
   - `--build` - Builds images before starting containers.
   - `-d` - Runs containers in the background (detached mode).
2. `docker compose down` - Stops and removes the containers, networks, and volumes created by `docker-compose up`.
3. `docker compose ps` - Lists the running containers managed by Docker Compose.
4. `docker compose logs` - Displays the logs of the services defined in the `docker-compose.yml` file.
5. `docker compose build` - Builds or rebuilds the services defined in the `docker-compose.yml` file.
6. `docker compose stop` - Stops the services without removing them.
7. `docker compose start` - Starts existing stopped services.
8. `docker compose restart` - Restarts the services defined in the `docker-compose.yml` file.
9. `docker compose exec <service> <command>` - Executes a command in a running service container.
10. `docker compose config` - Validates and views the Compose file.
11. `docker compose pull` - Pulls the images for the services defined in the `docker-compose.yml` file.
12. `docker compose push` - Pushes the built images to a registry.

## File Structure

- A docker compose file is a YAML file named `docker-compose.yml` by default.
- The basic structure of a docker compose file includes the following sections:

  1. `version` - Specifies the version of the Docker Compose file format.
  2. `services (name of service)` - Defines the services (containers) to be run.
     - `image` - Specifies the Docker image to use for the service.
     - `build` - Specifies the build context for building a custom image.
     - `ports` - Maps host ports to container ports.
     - `environment` - Sets environment variables for the service.
       - `- MYSQL_ROOT_PASSWORD: example`
     - `volumes` - Mounts host directories or files into the container.
       - `/host/path:/container/path`
     - `depends_on` - Specifies dependencies between services.
       - Ensures that a service starts only after the services it depends on are started.
       - Example: `depends_on: - db`
     - `networks` - Defines custom networks for the services.
       - Example: `networks: - my-network`
  3. `volumes` - Defines named volumes that can be used by services.
     - Example: `my-volume:`
  4. `networks` - Defines custom networks that can be used by services.
     - Example: `my-network:`
  5. `configs` - Defines configuration data that can be used by services.
     - Example: `my-config:`

- Example of a complete `docker-compose.yml` file:

  ```yaml
  version: "3"
  services:
      web:
      image: nginx:latest
      ports:
          - "8080:80"
      depends_on:
          - db
      networks:
          - my-network
      db:
      image: mysql:5.7
      environment:
          MYSQL_ROOT_PASSWORD: example
      volumes:
          - db-data:/var/lib/mysql
      networks:
          - my-network

  volumes:
      db-data:

  networks:
      my-network:
  ```
