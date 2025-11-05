# Docker Image

- [Docker Image](#docker-image)
  - [Overview](#overview)
  - [Finding Images](#finding-images)
  - [Image Tags](#image-tags)
  - [Image repositories](#image-repositories)
  - [Try it out](#try-it-out)
  - [Commands for Docker Images](#commands-for-docker-images)
    - [Pulling and Pushing Images](#pulling-and-pushing-images)
    - [Listing Images](#listing-images)
    - [Managing Images](#managing-images)
    - [Building Images](#building-images)

## Overview

- So think where does a container come from?
- A container is created from a Docker image, which contains its files and configuration.
- A Docker image is a lightweight, standalone, and executable software package that includes everything needed to run a piece of software, which includes:

  - **Code** (application code or binaries)
  - **Runtime** (e.g., Node.js, Python)
  - **Libraries and dependencies** (e.g., npm packages, pip packages)
  - **Environment variables**
  - **Configuration files** (e.g., config.json, .env)

- Docker images are built (created) using a set of instructions defined in a `Dockerfile`.

- **Example:**

  - **PostgreSQL** images could includes:
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

## Image Tags

- Docker images helps us to manage different versions of the same image using **tags**, which are labels that point to specific versions of an image.
- Tags are appended to the image name using a colon (`:`) separator.
- For example, the `nginx` image has multiple tags representing different versions:

  - `nginx:latest` (the latest stable version)
  - `nginx:1.21` (specific version 1.21)
  - `nginx:alpine` (a lightweight version based on Alpine Linux)

## Image repositories

- An image repository is points to a private or public registry where actual **Docker Image** is stored, which helps us to pull or push the images.
- For example:

  - `nginx` is the image name.
  - `library/nginx` is the repository name on Docker Hub.
  - `docker.io/library/nginx` is the full path to the image repository on Docker Hub.

- We can also store images in private registries such as:
  - Amazon Elastic Container Registry (ECR)
  - Google Container Registry (GCR)
  - Azure Container Registry (ACR)

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

### Pulling and Pushing Images

- **Pull an image from a registry:**

  ```bash
  docker pull <image-name>
  ```

- **Push an image to a registry:**

  ```bash
  docker push <image-name>
  # or
  docker image push <image-name>
  ```

### Listing Images

- **List all images:**

  ```bash
  docker image list
  ```

- **List images with custom format:**

  ```bash
  docker image list --format "{{.Repository}}: {{.Tag}}"
  ```

- **List dangling images** (untagged and unreferenced):

  ```bash
  docker image list --filter "dangling=true"
  ```

### Managing Images

- **Remove an image:**

  ```bash
  docker image rm <image-name>
  ```

- **Tag an image:**

  ```bash
  docker image tag <source-image> <target-image> # Create a new image with a different (name or tag)
  ```

- **Inspect image details:**

  ```bash
  docker image inspect <image-name>
  ```

- **View image history:**

  ```bash
  docker image history <image-name>
  ```

### Building Images

- **Build an image from a Dockerfile:**

  ```bash
  docker build -t <image-name> <path-to-dockerfile>
  # or
  docker image build -t <image-name> <path-to-dockerfile>
  ```

  - `-t <image-name>`: Assign a name and optionally a tag in the `name:tag` format
