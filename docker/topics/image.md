# Docker Image

- [Docker Image](#docker-image)
  - [Overview](#overview)
  - [Finding Images](#finding-images)
  - [Try it out](#try-it-out)
  - [Commands for Docker Images](#commands-for-docker-images)

## Overview

- So think from where does a container come from?
- A container is created from a Docker image, which contains its files and configuration.
- A Docker image is a lightweight, standalone, and executable software package that includes everything needed to run a piece of software, which includes:

  - **Code** (application code or binaries)
  - **Runtime** (e.g., Node.js, Python)
  - **Libraries and dependencies** (e.g., npm packages, pip packages)
  - **Environment variables**
  - **Configuration files** (e.g., config.json, .env)

- Docker images are built using a set of instructions defined in a `Dockerfile`.

- **Example:**

  - **`PostgreSQL** images could includes:
    - PostgreSQL server binaries
    - Configuration files (e.g., `postgresql.conf`)
    - Necessary libraries and dependencies
    - Default environment variables (e.g., `POSTGRES_USER`, `POSTGRES_PASSWORD`)

- **Note:**

  1. **Images are immutable:** Once created, they cannot be changed. You can only make a new image or add **layers on top** of an existing image.
  2. **Container images are composed of layers:** Each layer represents a set of file changes or additions. When you build an image, Docker creates a new layer for each instruction in the `Dockerfile`.

- **Images** commonly use lightweight base images like `alpine`, `debian`, or `ubuntu` to minimize size and improve efficiency.

## Finding Images

- You can find and download Docker images from public registries like [Docker Hub](https://hub.docker.com/).
- You can also create and host your own private Docker registries for internal use.

- To search for images on Docker Hub, you can use the Docker CLI command:

  ```bash
  docker search <image-name>
  ```

## Try it out

1. Let's search for the official `nginx` image on Docker Hub:

   ```bash
   docker search nginx
   ```

2. Let's pull the official `nginx` image to our local machine:

   ```bash
   docker pull nginx
   ```

3. Verify that the image has been downloaded:

   ```bash
    docker images list
   ```

## Commands for Docker Images

1. `docker pull <image-name>`: Download an image from a registry.
2. `docker image list`: List all images on the local machine.

   - `docker image list --format "{{.Repository}}: {{.Tag}}"`: List images with custom format.

   - `docker image list --filter "dangling=true"`: List dangling images (images not tagged and not referenced by any container).

3. `docker image rm <image-name>`: Remove one or more images from the local machine.
4. `docker image inspect <image-name>`: Display detailed information about an image.
5. `docker image tag <source-image> <target-image>`: Tag an image with a new name, which makes it easier to reference
6. `docker image build -t <image-name> <path-to-dockerfile> or docker build -t <image-name> <path-to-dockerfile> `: Build a new image from a Dockerfile.
   - `-t <image-name>`: Assign a name and optionally a tag in the 'name:tag' format.
