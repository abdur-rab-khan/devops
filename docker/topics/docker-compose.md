# Docker Compose

- [Docker Compose](#docker-compose)
  - [Overview](#overview)
  - [Compose File Structure](#compose-file-structure)
    - [1. Version and Name (top-level element)](#1-version-and-name-top-level-element)
  - [2. Services](#2-services)
    - [1. `container_name`](#1-container_name)
    - [2. `image`](#2-image)
    - [3. `ports`](#3-ports)
    - [4. `env_file`](#4-env_file)
    - [5. `environment`](#5-environment)
    - [6. `volumes`](#6-volumes)
    - [7. `networks` https://docs.docker.com/reference/compose-file/services/#networks](#7-networks-httpsdocsdockercomreferencecompose-fileservicesnetworks)
    - [8. `depends_on`](#8-depends_on)
    - [9. `restart`](#9-restart)
    - [10. `command`](#10-command)
    - [11. `develop` https://docs.docker.com/reference/compose-file/develop/](#11-develop-httpsdocsdockercomreferencecompose-filedevelop)
    - [12. `healthcheck`](#12-healthcheck)
    - [13. `secrets` https://docs.docker.com/reference/compose-file/services/#secrets](#13-secrets-httpsdocsdockercomreferencecompose-fileservicessecrets)
    - [14. `configs` https://docs.docker.com/reference/compose-file/services/#configs](#14-configs-httpsdocsdockercomreferencecompose-fileservicesconfigs)
  - [Commands](#commands)
  - [Additional Resources](#additional-resources)
    - [Interpolation](#interpolation)

## Overview

- Docker Compose is a tool for defining and running multi-container Docker applications.
- Traditionally, to run multiple containers, you would need to:
  1. Pull images using `docker pull <image-name>`
  2. Run each container separately using `docker run <image-name>` with different configurations
- This approach becomes cumbersome when managing multiple containers with complex configurations.
- Docker Compose solves this by allowing you to define all services in a single `docker-compose.yml` file.
- Docker Compose automatically creates a default network for all containers defined in the compose file, enabling them to communicate with each other.
- To start all services, simply run `docker compose up` (or `docker-compose up` for older versions).
- **Difference between Dockerfile versus Compose file**

  | Dockerfile                                                          | Docker Compose file                                                  |
  | ------------------------------------------------------------------- | -------------------------------------------------------------------- |
  | It is used to build a container image                               | It used to run multiple containers from images                       |
  | Often Compose file references a Dockerfile for a particular service | It can also use pre-built images from Docker Hub or other registries |

## Compose File Structure

- A Docker Compose file is typically named `compose.yml/yaml` (preferred) or `docker-compose.yml`.

### 1. Version and Name (top-level element)

- **Version:**

  - It specifies the version of the Docker Compose file format, which helps Docker Compose to parse and understand the file correctly.
  - Common versions include '3', '3.8', etc.

- **Name:**
  - `name: <project-name>` specifies the name of the project, After defining the project name, it is exposed for [**interpolation**](#interpolation) or environment variable resolution as `${COMPOSE_PROJECT_NAME}`.

## 2. Services

- Services are the core and must-have component of a Docker Compose file, where we define the all configurations for each container.
- Configurations can be from compute resources to networking, volumes, environment variables, deployment strategies and many more.
- Each service is defined under the `services:` section with a unique name which acts as the service identifier.

### 1. `container_name`

- The `container_name` option allows you to specify a custom name for the container created by Docker Compose.
- By default, Docker Compose generates container names based on the project name, service name, and a sequential number (e.g., `project_service_1`).

### 2. `image`

- The `image` specifies the image to start the docker container from, it should be an Open Container Initiative (OCI) compliant image.
- It can be an image from a public registry like Docker Hub or a private registry.
- The format is usually follow as `[<registry>/][<project>/]<image>[:<tag>|@<digest>]`.

  ```yaml
  image: redis
  image: redis:5
  image: redis@sha256:0ed5d5928d4737458944eb604cc8509e245c3e19d02ad83935398bc4b991aac7
  image: library/redis
  image: docker.io/library/redis
  image: my_private.registry:5000/redis
  ```

- If we are using a custom-built image, we can use the `build` option instead of `image` to specify the build context and Dockerfile location.
- Which will build the image before starting the container, like below:

  ```yaml
  build:
    context: ./path/to/build/context
    dockerfile: Dockerfile.custom
  ```

- But the default behavior is to pull the image from the registry if both `image` and `build` options are specified.

### 3. `ports`

- The `ports` is used to map the container's internal ports to the host machine's ports, allowing external access to the services running inside the container.
- We can either specify both ports (`host:container`) or just the container port (`container`), in latter case, Docker will assign a random available port on the host.

  ```yaml
  ports:
    - "8080:80" # Maps host port 8080 to container port 80
    - "443" # Maps a random host port to container port 443
  ```

  ```yaml
  ports:
    - "3000" # Maps a random host port to container port 3000
    - "3000-3005" # Maps a range of host ports to container ports 3000-3005
    - "8080:8080" # Maps host port 8080 to container port 8080
    - "9090-9095:9090-9095" # Maps host ports 9090-9095 to container ports 9090-9095
    - "127.0.0.1:8001:8001" # Binds host port 8001 to container port 8001 on localhost only
    - "3000:3000/udp" # Maps host port 3000 to container port 3000 for UDP protocol
    - "5000-5010:5000-5010/tcp" # Maps host ports 5000-5010 to container ports 5000-5010 for TCP protocol
  ```

### 4. `env_file`

- The `env_file` allows us to specify the file containing environment variables to be set in the container.
- The `env_file: .env` option points to a file named `.env` in the same directory as the `docker-compose.yml` file.
- We can also specify multiple env files as a list.

  ```yaml
  env_file:
    - common.env # shared environment variables in the same level as docker-compose.yml
    - development.env # environment-specific variables
    - ../secrets.env # variables from a different directory
  ```

- `required` option can be used to ensure that the specified env file must exist, otherwise Docker Compose will throw an error.

  ```yaml
  env_file:
    - path: ./config.env
      required: true # default is true

    - path: ./optional.env
      required: false
  ```

### 5. `environment`

- The `environment` option allows us to define environment variables directly within the `docker-compose.yml` file to be set in the container.
- `environment` variable can either specified using map or array format.

  ```yaml
  environment:
    - DEBUG=1
    - API_KEY=abcdef12345
  ```

  ```yaml
  environment:
    DEBUG: "1"
    API_KEY: "abcdef12345"
  ```

- When both `env_file` and `environment` are used, the variables defined in `environment` will override those in the `env_file` if there are any conflicts.

### 6. `volumes`

- The `volumes` option allows you to persist data and share files between the host and containers or between multiple containers.
- Volumes are defined at two levels: within a service (to mount volumes) and at the top level (to declare named volumes).

**Basic Syntax:**

```yaml
services:
  my_service:
    volumes:
      - my_volume:/path/in/container # Named volume
      - ./host/path:/container/path # Bind mount
      - /container/path # Anonymous volume

volumes:
  my_volume: # Top-level volume declaration
    driver: local
```

**Volume Configuration Options:**

- **`driver`**: Specifies the volume driver (default: `local`)

  - `local`: Stores data on the host filesystem
  - `nfs`: For network file system volumes

- **`driver_opts`**: Additional driver-specific options

  ```yaml
  driver_opts:
    o: size=100m # Local driver: limit size
    type: "nfs" # NFS driver: specify type
    device: ":/path/on/nfs" # NFS driver: remote path
  ```

- **`external`**: Use an existing volume not managed by Compose

  ```yaml
  external: true
  ```

- **`name`**: Custom volume name (supports interpolation)

  ```yaml
  name: ${VOLUME_NAME:-default_volume}
  ```

- **`labels`**: Add metadata to the volume

  ```yaml
  labels:
    project: my_project
  ```

**Advanced Volume Mount Syntax:**

```yaml
volumes:
  - type: volume
    source: my_volume
    target: /data
    volume:
      nocopy: true # Don't copy data from container
      subpath: sub # Mount subdirectory only
```

### 7. `networks` <https://docs.docker.com/reference/compose-file/services/#networks>

### 8. `depends_on`

- The `depends_on` option lets us to specify the order of service startup and shutdown, It is useful when one service is dependence on another service to function properly.
- By default, Docker Compose starts all services in parallel, but with `depends_on`, we can define explicit dependencies between services.

  ```yaml
  services:
    web:
      image: my_web_app
      depends_on:
        - db
        - redis

    db:
      image: postgres

    redis:
      image: redis
  ```

  - Compose creates service in dependency order, In the above example, `db` and `redis` services will be started before the `web` service.
  - During shutdown, Compose stops services in reverse order, So `web` will be stopped before `db` and `redis`.

- Compose guarantees that a service have been started before starting the dependent service, but it does not wait for the service to be "ready" (e.g., a database accepting connections).
- To handle service readiness, we can use health checks or implement custom wait-for-it scripts in the service startup process.

  - `restart` When set to `true`, Compose restarts the service after it updates the dependent service mean it will restart the `web` service after `db` or `redis` is updated.
  - `condition` Sets the condition under which the service should be started. Possible values are:
    - `service_started` (default): Waits until the dependent service is started.
    - `service_healthy`: Waits until the dependent service passes its health check.
    - `service_completed_successfully`: Waits until the dependent service has completed successfully (only for services with `restart: "no"`).

  ```yaml
  services:
    web:
      image: my_web_app
      depends_on:
        db:
          condition: service_healthy
          restart: true
        redis:
          condition: service_started

    db:
      image: postgres
      healthcheck:
        test: ["CMD-SHELL", "pg_isready -U postgres"]
        interval: 10s
        timeout: 5s
        retries: 5

    redis:
      image: redis
  ```

  - In this example, the `web` service will wait for the `db` service to be healthy before starting, and it will restart if the `db` service is updated. The `redis` service only needs to be started before `web`.

### 9. `restart`

- The `restart` option defines the restart policy for a service's container when it exits.
- It helps to ensure that services remain available and can recover from failures automatically.
- Common restart policies include:

  - `no`: Do not automatically restart the container (default).
  - `always`: Always restart the container if it stops.
  - `on-failure`: Restart the container only if it exits with a non-zero exit code. Optionally, you can specify a maximum number of restart attempts (e.g., `on-failure:5`).
  - `unless-stopped`: Always restart the container unless it is explicitly stopped by the user.
  - `unless-stopped` is similar to `always`, but it will not restart the container if it was stopped manually.

### 10. `command`

- The `command` option allows you to override the default command specified in the Docker image's `CMD` instruction.
- It can be specified as a string or a list.

  ```yaml
  command: ["python", "app.py"] # List format
  ```

  ```yaml
  command: python app.py # String format
  ```

### 11. `develop` <https://docs.docker.com/reference/compose-file/develop/>

### 12. `healthcheck`

- The `healthcheck` option allows us to check that's a service containers are healthy and running as expected.
- It defines a command that Docker will run inside the container at specified intervals to determine the health status of the container.
- If the health check fails, Docker can take actions based on the container's health status.
- Compose file can override the values set in the Dockerfile.

  ```yaml
  healthcheck:
    test: ["CMD-SHELL", "curl -f http://localhost/ || exit 1"] # Command to check health
    interval: 30s # Time between checks (default: 30s)
    timeout: 10s # Time to wait for the command to complete (default: 30s)
    retries: 3 # Number of consecutive failures before marking as unhealthy (default: 3)
    start_period: 10s # Initial delay before starting health checks (default: 0s)
  ```

- It command returns `0` for healthy, `1` for unhealthy, and `2` for unknown.

### 13. `secrets` <https://docs.docker.com/reference/compose-file/services/#secrets>

### 14. `configs` <https://docs.docker.com/reference/compose-file/services/#configs>

## Commands

1. `docker compose up` - Starts the services defined in the `docker-compose.yml` file.
   - `--build` - Builds images before starting containers.
   - `-d` - Runs containers in the background (detached mode).
2. `docker compose down` - Stops and removes the containers, networks, and volumes created by `docker-compose up`.
3. `docker compose ps` - Lists the running containers managed by Docker Compose.
4. `docker compose logs` - Displays the logs of the services defined in the `docker-compose.yml` file.
5. `docker compose build` - Builds or rebuilds the services defined in the `docker-compose.yml` file.
   - `--no-cache` - Builds the images without using cache.
   - `--pull` - Always attempts to pull a newer version of the image.
   - `--parallel` - Builds images in parallel.
   - `--progress <type>` - Sets the type of progress output (auto, plain, tty).
   - `--compress` - Compresses the build context using gzip.
   - `--force-rm` - Always removes intermediate containers.
   - `--build-arg <key=value>` - Sets build-time variables for the Dockerfile.
   - `--target <stage>` - Sets the target build stage in a multi-stage Dockerfile.
6. `docker compose stop` - Stops the services without removing them.
7. `docker compose start` - Starts existing stopped services.
8. `docker compose restart` - Restarts the services defined in the `docker-compose.yml` file.
9. `docker compose exec <service> <command>` - Executes a command in a running service container.
   - `-it` - Runs the command in an interactive terminal.
   - `-u <user>` - Runs the command as a specific user inside the container.
10. `docker compose config` - Validates and views the Compose file.
11. `docker compose pull` - Pulls the images for the services defined in the `docker-compose.yml` file.
12. `docker compose push` - Pushes the built images to a registry.

## Additional Resources

### Interpolation

- Docker Compose supports variable interpolation (using `$VARIABLE` or `${VARIABLE}` syntax) in the `docker-compose.yml` file.
- Variables can be defined in the shell environment or in an optional `.env` file located in the same directory as the `docker-compose.yml` file.

- **DIRECT SUBSTITUTION**

  - ${VARIABLE} - Value of VARIABLE or empty string if not defined

- **DEFAULT VALUE**

  - ${VARIABLE:-default} - Value of VARIABLE if set and non empty, otherwise 'default'
  - ${VARIABLE-default} - Value of VARIABLE if set, otherwise 'default'

- **ERROR IF UNSET**

  - ${VARIABLE:?error message} - Value of VARIABLE if set and non empty, otherwise prints 'error message' and exits
  - ${VARIABLE?error message} - Value of VARIABLE if set, otherwise prints 'error message' and exits
