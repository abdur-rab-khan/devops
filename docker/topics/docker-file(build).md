# DockerFile (build) in Docker

- [DockerFile (build) in Docker](#dockerfile-build-in-docker)
  - [Overview](#overview)
  - [Dockerfile overview](#dockerfile-overview)
    - [`FROM`](#from)
    - [`RUN`](#run)
    - [`CMD` (RUNTIME during container start)](#cmd-runtime-during-container-start)
    - [`ENTRYPOINT` (RUNTIME during container start)](#entrypoint-runtime-during-container-start)
    - [`COPY` and `ADD` Instructions](#copy-and-add-instructions)
    - [`WORKDIR`](#workdir)
    - [`ARG`](#arg)
    - [`ENV`](#env)
    - [`EXPOSE`](#expose)
    - [`HEALTHCHECK`](#healthcheck)

## Overview

- Build in Docker refers to the process of creating Docker image using a Dockerfile, which contains a set of instructions on how to assemble the image.
- `docker build` command is used to build Docker images which send request to `buildkit` daemon to execute the build process.
- Dockerfile is a text file that contains all the commands a user could call on the command line to assemble an image.
- BuildKit is a modern build subsystem for Docker that improves performance, storage management, and adds new features.

## Dockerfile overview

- A **DockerFile** is refers to set of instructions to build a Docker image.
- Each instruction in a Dockerfile creates a new layer in the image, which makes it easier when updating the image.
- When re-building an image, Docker reuses the layers that have not changed, which speeds up the build process.
- Dockerfile supports the following instructions:

### `FROM`

- The `FROM` instruction initializes a new build stage and sets the base image (e.g., `ubuntu`, `alpine`, `node`, etc.) for subsequent instructions.
- A valid Dockerfile must start with a `FROM` instruction, unless the `ARG` instruction is used to define build-time variables before the first `FROM`.
- `FROM` can also be used multiple times in a single Dockerfile to create multi-stage builds, which helps in reducing the final image size by copying only the necessary artifacts from one stage to another.
- Example:

  ```Dockerfile
  FROM ubuntu:20.04
  ```

- Using `ARGS` with `FROM`:

  ```Dockerfile
  ARG BASE_IMAGE=ubuntu:20.04
  FROM ${BASE_IMAGE}

  # or
  ARG VERSION=alpine3.12
  FROM node:${VERSION}
  ```

### `RUN`

- The `RUN` instruction allows us to execute commands in a new layer on top of the current image and commit the results.
- It is commonly used to install software packages, update the system, or perform any setup required for the application.
- There are two forms of the `RUN` instruction:

  - Shell form: `RUN <command>`
  - Exec form: `RUN ["executable", "param1", "param2"]`

- Example of Shell form:

  - The shell form is most commonly used method to run single or multiple commands in a single `RUN` instruction by using `\`, `newline`

  ```Dockerfile
    # Using shell form to run multiple commands
    RUN echo "Updating system..." && \
        apt-get update && \
        echo "Installing python3..." && \
        apt-get install -y python3
  ```

- Example of Exec form:

  ```Dockerfile
    RUN ["apt-get", "update"]
    RUN ["apt-get", "install", "-y", "python3"]
  ```

### `CMD` (RUNTIME during container start)

- The `CMD` instruction allows us to specify command to be executed when a container is started from the image.
- We can override the `CMD` instruction by providing a different command during the `docker run` command `docker run <image> <command>`.
- There are three forms of the `CMD` instruction:

  - Shell form: `CMD <command>`
  - Exec form: `CMD ["executable", "param1", "param2"]`
  - Default parameters to ENTRYPOINT: `CMD ["param1", "param2"]`

- Example of Shell form:

  ```Dockerfile
    CMD ["pnpm", "run", "start"] # Exec during container start
  ```

### `ENTRYPOINT` (RUNTIME during container start)

- The `ENTRYPOINT` instruction allows us to run a command when a container is started from the image.
- Unlike `CMD`, the command specified in `ENTRYPOINT` cannot be overridden during the `docker run` command.
- When try to add additional command `docker run <image> <command>`, the additional command is passed as arguments to the `ENTRYPOINT` command.
- There are two forms of the `ENTRYPOINT` instruction:

  - Shell form: `ENTRYPOINT <command>`
  - Exec form: `ENTRYPOINT ["executable", "param1", "param2"]`

- Example of Exec form:

  ```Dockerfile
    ENTRYPOINT ["python3"]
  ```

- Running the container:

  ```bash
    docker run myimage app.py        # Runs: python3 app.py
    docker run myimage app.py --debug       # Runs: python3 app.py --debug
    docker run myimage app.py --verbose     # Runs: python3 app.py --verbose
  ```

- Try to use both `ENTRYPOINT` and `CMD` together:

  ```Dockerfile
      ENTRYPOINT ["python3"]
      CMD ["app.py"]
  ```

- Running the container:

  ```bash
      docker run myimage              # Runs: python3 app.py
      docker run myimage test.py      # Runs: python3 test.py
      docker run myimage --version    # Runs: python3 --version
  ```

### `COPY` and `ADD` Instructions

- **`COPY`**

  - The `COPY` instruction copies files and directories from the host machine to the Docker image.
  - Files and directories can be copied from following:

    - **Build context** (the directory where the Dockerfile is located).
    - **Build stage** (if multi-stage build is used), name context (if using named build contexts).
    - **Image** (if using `--from` flag).

  - Example:

    ```Dockerfile
    COPY <src> <dest>
    ```

  - **Source**
    - We can specify multiple source files and directories to copy.
    - We can use wildcards (`*`, `?`, `.`) to match multiple files.
    - `COPY` also accept `--from=<stage|image>` (to copy from another build stage or image), which is useful in multi-stage builds.
  - **Destination**

    - The destination path inside the container where the files will be copied.
    - If the destination directory does not exist, it will be created.
    - If the destination is a directory, the source files will be copied into that directory.

  - `COPY` options

    - `--from=<image|stage|context>]`: Specifies the source of the files to copy.
    - `chown=<user>:<group>`: Sets the ownership of the copied files.
    - `--chmod=<permissions>`: Sets the permissions of the copied files.
    - `--link`: Creates a hard link instead of copying files (only works within the same filesystem), good for large files to save space and time (work only on linux).
    - `--exclude=<pattern>`: Excludes files matching the specified pattern from being copied.

      ```Dockerfile
        COPY . . # Copies all files from build context to image
        COPY --from=builder /app/build /usr/share/nginx/html # Copies from another build stage
        COPY --from=alpine /etc/passwd /etc/passwd # Copies from another image
        COPY --chown=appuser:appgroup src/ /app/src/ # Sets ownership
        COPY --chmod=755 script.sh /usr/local/bin/script.sh # Sets permissions
      ```

- **`ADD`**

- The `ADD` instruction is similar to `COPY`, but it has some additional features, such as the ability to **extract tar files** and **download files** from URLs.
- However, `ADD` is generally not recommended unless you specifically need its extra features, as it can lead to unexpected behavior.
- Example:

  ```Dockerfile
  ADD <src> <dest>
  ```

  - **Source**
    - Similar to `COPY`, we can specify multiple source files and directories to add.
    - We can use wildcards (`*`, `?`, `.`) to match multiple files.
    - If the source is a URL, `ADD` will download the file from the URL and add it to the image.
    - If the source is a tar file (`.tar`, `.tar.gz`, `.tgz`, `.bz2`, `.xz`), `ADD` will automatically extract the contents of the tar file into the destination directory.
  - **Destination**

    - The destination path inside the container where the files will be added.
    - If the destination directory does not exist, it will be created.

  - `ADD` options

    - `keep-git-dir`: When adding files from a git repository, this option preserves the `.git` directory.
    - `--chown=<user>:<group>`: Sets the ownership of the added files.
    - `--chmod=<permissions>`: Sets the permissions of the added files.
    - `--link`: Creates a hard link instead of adding files (only works within the same filesystem), good for large files to save space and time (work only on linux).
    - `--exclude=<pattern>`: Excludes files matching the specified pattern from being added.

    ```Dockerfile
      ADD . /app # Adds all files from build context to image
      ADD https://example.com/file.tar.gz /tmp/file.tar.gz # Downloads and adds file from URL
      ADD archive.tar.gz /app # Extracts and adds contents of tar file
      ADD --chown=appuser:appgroup src/ /app/src/ # Sets ownership
      ADD --chmod=755 script.sh /usr/local/bin/script.sh # Sets permissions
    ```

### `WORKDIR`

- The `WORKDIR` instruction sets the working directory for any instructions such as `RUN`, `CMD`, `ENTRYPOINT`, `COPY`, and `ADD` that follow it in the Dockerfile.
- If the specified directory does not exist, it will be created, It can be used in multiple times in a Dockerfile to change the working directory as needed.
- Example:

  ```Dockerfile
  WORKDIR /app
  ```

  ```Dockerfile
  ENV DIRPATH=/usr/src/app
  WORKDIR $DIRPATH
  RUN pwd  # This will output: /usr/src/app
  ```

  - It can use path from environment variables defined using `ENV` instruction.

### `ARG`

- The `ARG` instruction defines a variable that users can pass at build-time to the builder with the `docker build` command using the `--build-arg <varname>=<value>` flag.
- `ARG` variables are only available during the build process and are not accessible in the running container.
- Example:

  ```Dockerfile
  ARG APP_VERSION=1.0.0
  RUN echo "Building version $APP_VERSION"
  ```

  - Building the image with a custom build argument:

    ```bash
    docker build --build-arg APP_VERSION=2.0.0 -t myapp:2.0.0 .
    ```

  - Using default value in `ARG` if no value is provided during build:

    ```Dockerfile
    ARG APP_VERSION=1.0.0

    RUN echo "Building version $APP_VERSION"
    ```

- It can also be use with Docker compose using `build` in `docker-compose.yml` file:

  ```yaml
  version: "3"
  services:
    app:
      build:
        context: .
        args:
          APP_VERSION: 2.0.0
  ```

- Changes on args will also invalidate the build cache for the layers that depend on them, which leads to a rebuild of those layers.
- **Note:** It is not recommended to use `ARG` for sensitive information like user credentials, as the values can be exposed in the image history.

### `ENV`

- The `ENV` instruction sets environment variables in the Docker image that will be available to the running container.
- Environment variables set using `ENV` persist in the image and can be accessed by any process running inside the container.
- Example:

  ```Dockerfile
  ENV APP_ENV=production
  ENV APP_PORT=8080
  ```

  - Accessing environment variables in the running container:

    ```bash
    docker run -it myapp:latest /bin/bash
    echo $APP_ENV  # Outputs: production
    echo $APP_PORT # Outputs: 8080
    ```

  - Using environment variables in other instructions:

    ```Dockerfile
    ENV APP_HOME=/usr/src/app
    WORKDIR $APP_HOME
    ```

  - Setting multiple environment variables in a single `ENV` instruction:

    ```Dockerfile
    ENV APP_ENV=production \
        APP_PORT=8080 \
        APP_DEBUG=false
    ```

### `EXPOSE`

- The `EXPOSE` instruction informs Docker that the container listens on the specified network ports at runtime, which can either be `TCP` or `UDP` by default it is `TCP`.
- It does not actually publish the ports to the host machine or does not change any firewall rules, it is mainly for documentation purposes to help other developers which ports the application inside the container is expected to use.
- To publish the ports to the host machine, we need to use the `-p` or `--publish` flag with the `docker run` command.
- Example:

  ```Dockerfile
  EXPOSE 80        # Exposes port 80 (TCP)
  EXPOSE 443/udp   # Exposes port 443 (UDP)
  ```

  - Running the container and publishing the exposed port to the host machine:

    ```bash
    docker run -p 8080:80 myapp:latest
    ```

### `HEALTHCHECK`

- The `HEALTHCHECK` instruction tells Docker how to test a container to check whether it is still working properly or not.
- Whenever a health check passes, it becomes healthy, and whenever it fails, it becomes unhealthy, which can be use with `depend_on` in `docker-compose.yml` to control the startup order of services based on their health status.
- Example:

  ```Dockerfile
  HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
      CMD curl -f http://localhost/ || exit 1
  ```

  - Running the container and checking its health status:

    ```yml
    version: "3"
    services:
      web:
        image: myapp:latest
        healthcheck:
          test: ["CMD", "curl", "-f", "http://localhost/"]
          interval: 30s
          timeout: 10s
          retries: 3
      frontend:
        image: myfrontend:latest
        depends_on:
          web:
            condition: service_healthy
    ```

    - Checking the health status of the container:

      ```bash
      docker ps
      ```

- Options for `HEALTHCHECK`:

  - `--interval=<duration>`: Sets the time between health checks (default: 30s).
  - `--timeout=<duration>`: Sets the time to wait for a health check to complete (default: 30s).
  - `--start-period=<duration>`: Sets the initialization time before starting health checks (default: 0s).
  - `--retries=<number>`: Sets the number of consecutive failures needed to consider the container unhealthy (default: 3).
  - `NONE`: Disables any health check inherited from the base image.

- The command's exit status determines the health status:

  - `0`: Healthy
  - `1`: Unhealthy
  - `2`: reserved (don't use this exit)
