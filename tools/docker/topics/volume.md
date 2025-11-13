# Volumes in Docker

- [Volumes in Docker](#volumes-in-docker)
  - [Overview](#overview)
  - [Bind Mounts, Volumes, and tmpfs mounts](#bind-mounts-volumes-and-tmpfs-mounts)
  - [Command Reference](#command-reference)
    - [Syntax to create a volume](#syntax-to-create-a-volume)
    - [Creating Volume with Docker Container](#creating-volume-with-docker-container)

## Overview

- By default, When a Docker container is deleted, all data associated with it is also removed.
- To persist data beyond the lifecycle of a container, Docker provides a feature called \***\*volumes\*\***, Which helps use to bind mount a directory from the host machine into the container.
- Volumes are stored in a part of the host filesystem which is managed by Docker (`/var/lib/docker/volumes/` on Linux).
- By use of volumes, Docker containers can read and write data to the host machine, allowing data to persist even after the container is removed.
- Volumes are more preferred than bind mounts for the following reasons:
  - Volumes are easier to back up or migrate than bind mounts.
  - Volumes can be managed using Docker CLI commands.
  - Volumes work on both Linux and Windows containers.
- Often a better choice to use volumes instead of bind mounts, unless you have a specific reason to use bind mounts (e.g., sharing configuration files or source code between the host and the container).
- Volumes can be a named volume or an anonymous volume.
  - Named volumes have a specific name and can be reused across multiple containers.
  - Anonymous volumes are created without a specific name and are deleted when the container is removed.

## Bind Mounts, Volumes, and tmpfs mounts

- **Volumes**, **Bind mounts** and **tmpfs** both are used to persist data in Docker, but they have some differences:

  - **Volumes** are managed by Docker and stored in a specific location on the host filesystem.

    - Example: `/var/lib/docker/volumes/` on Linux.
    - Syntax to create a volume:

      ```bash
      docker volume create my_volume
      docker run -v my_volume:/path/in/container image_name
      ```

      - **Modern Way to create volumes**

        ```bash
            docker run --mount source=my_volume,target=/path/in/container image_name
        ```

    - Using Docker Compose:

      ```yaml
      version: "3"
      services:
        my_service:
          image: image_name
          volumes:
            - my_volume:/path/in/container

      volumes:
        my_volume:
      ```

  - **Bind mounts** allow you to mount a specific file or directory from the host machine into the container.

    - Example: Mounting `/path/on/host` to `/path/in/container`.
    - Syntax to create a bind mount:

      ```bash
      docker run -v /path/on/host:/path/in/container image_name
      ```

      - **Modern Way to create volumes**

        ```bash
            docker run --mount type=bind,source=/path/on/host,target=/path/in/container image_name
        ```

    - Using Docker Compose:

      ```yaml
      version: "3"
      services:
        my_service:
          image: image_name
          volumes:
            - /path/on/host:/path/in/container
      ```

    - Bind mounts are useful when you want to share configuration files or source code between the host and the container.

    - **tmpfs mounts** are used to store data in the host system's memory only.

      - Data stored in a tmpfs mount is not persisted to disk and is lost when the container stops.
      - Syntax to create a tmpfs mount:

        ```bash
        docker run --tmpfs /path/in/container image_name
        ```

      - Using Docker Compose:

        ```yaml
        version: "3"
        services:
          my_service:
            image: image_name
            tmpfs:
              - /path/in/container
        ```

      - Tmpfs mounts are useful for storing sensitive data or temporary files that do not need to be persisted.

## Command Reference

### Syntax to create a volume

```bash
docker volume create [OPTIONS] VOLUME_NAME
```

- `VOLUME_NAME`: Name of the volume to be created.
- `OPTIONS`: Additional options for volume creation (e.g., driver, labels).

  1. `--driver string or volume-driver string (using mount)`: Specify volume driver name (default is "local").

     - `local`: Default driver that stores data on the host filesystem.
     - `nfs`: Driver for NFS volumes.
     - `tmpfs`: Driver for tmpfs volumes.

  2. `--label key=value`: Set metadata for a volume.

     - You can add multiple labels by repeating the `--label` option.
     - Labels can be used for organizing and filtering volumes.
     - Example:

       ```bash
       docker volume create --label project=my_project --label env=production my_volume
       ```

  3. `-o or --opt key=value`: Set more configuration options for the volume.

     - Options vary depending on the volume driver used.
     - Example for local driver:

       ```bash
       docker volume create -o o=size=100m my_volume
       ```

     - Example for NFS driver:

       ```bash
       docker volume create -d nfs -o addr=
       ```

### Creating Volume with Docker Container

- You can create and use a volume directly when running a Docker container using the `-v` or `--mount` option.

- Example using `-v` option:

  ```bash
  docker run -d --name my_container \
    -v my_volume:/path/in/container \
    my_image
  ```

- Example using `--mount` option:

  ```bash
    docker run -d --name my_container \
        --mount source=my_volume,target=/path/in/container \
        my_image
  ```

  - **More Options using --mount**

    - `type`: Type of mount (e.g., volume, bind, tmpfs).
    - `source`: Name of the volume or path on the host (for bind mounts).
    - `target`: Path inside the container where the volume will be mounted.
    - `readonly`: Mount the volume as read-only (optional).
    - `volume-driver`: Specify the volume driver to use (optional).
      - `local`: Default driver that stores data on the host filesystem.
      - `nfs`: Driver for NFS volumes.
    - `volume-label`: Set metadata for the volume (optional).
    - `volume-opt`: Additional options for the volume driver (optional).

    - Example with more options:

      ```bash
      docker run -d --name my_container \
          --mount type=volume,source=my_volume,target=/path/in/container,readonly,volume-driver=nfs,volume-label=project=my_project,volume-opt=o=size=100m \
          my_image
      ```
