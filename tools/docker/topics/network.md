# Network in Docker

- [Network in Docker](#network-in-docker)
  - [Overview](#overview)
  - [User defined networks](#user-defined-networks)
    - [1. `bridge` Network](#1-bridge-network)
    - [2. `host` Network](#2-host-network)
    - [3. `overlay` Network](#3-overlay-network)
  - [4. `none` Network](#4-none-network)
  - [Publishing Ports](#publishing-ports)
  - [Connecting to multiple networks](#connecting-to-multiple-networks)
  - [Commands Reference](#commands-reference)
    - [Create a user-defined network](#create-a-user-defined-network)
    - [Connect a container to a user-defined network](#connect-a-container-to-a-user-defined-network)
    - [Connect and disconnect a running container to user-defined network](#connect-and-disconnect-a-running-container-to-user-defined-network)

## Overview

- Networking in Docker allows containers to communicate with each other and with external systems.
- By default, Docker has the access to the host's network, but we can create custom networks for better isolation and control.
- If no network is specified, Docker uses the default `bridge` network, which allows containers to communicate with each other on the same host but isolates them from the host network.
- Docker supports several network drivers, including:

  1. **bridge**
  2. **host**
  3. **overlay**
  4. **macvlan**
  5. **ipvlan**
  6. **none**

## User defined networks

- Docker allows us to create user-defined networks which provide better isolation and control over container communication.
- By default, **bridge** has unrestricted communication between containers on the same network using container IP address, they can't access using their names.

### 1. `bridge` Network

- In Docker **bridge** network is the default network driver, which has IPv4 subnet but optionally IPv6 can be enabled.
- Each container connected to the bridge network gets an IP address from the subnet of the bridge network. By default it:

  - Allows unrestricted access to host machine and from other containers on the same bridge network.
  - Blocks access from other bridge networks and from outside the Docker host.
  - Supports port publishing where network traffic can be forwarded from the host to the container.

- When no host address is given in port publishing options like -p 80 or -p 8080:80, the default is to make the container's port 80 available on all host addresses, IPv4 and IPv6.

- When no host address is given in port publishing options like -p 80 or -p 8080:80, the default is to make the container's port 80 available on all host addresses, IPv4 and IPv6.

- **Default host binding address**
  - By default, when no host address is specified (`-p 8080:80`), Docker binds the container's port for both IPv4 and IPv6 addresses on the host.
  - This means the service will be accessible via both `http://<host_ipv4>:8080`and`http://[<host_ipv6>]:8080`.
  - If want to restrict access to only IPv4 or only IPv6, we can specify the host address explicitly.
    - For IPv4 only: `-p 8080:80`
    - For IPv6 only: `-p [::1]:8080:80`
  - We can modify network bridge option:
    - `com.docker.network.bridge.enable_ipv6 or --ipv6 --ipv4=false` to `true` or `false` to enable or disable IPv6 support on the bridge network.
    - `com.docker.network.bridge.default_bridge_ipv4 --ipv4` to set a custom IPv4 subnet for the bridge network.

### 2. `host` Network

- `host` network driver removes network isolation between the container and the Docker host.
- Containers using the host network share the host's network stack and can directly access the host's network interfaces.
- This is useful for applications that require high performance and low latency, such as network monitoring tools or certain types of databases.
- Can we can directly access the container's services using the host's IP address without using `-p` flag to publish ports.

  ```bash
  docker run --network=host {your_image}
  ```

- **Note:** It only works on **Linux hosts**.

### 3. `overlay` Network

- `overlay` network driver mainly used to enable communication between containers running on different Docker hosts in a swarm.
- It allow containers to communication securely across multiple host machines, also allows _encryption_ of data transmitted between containers.
- TODO: [**Learn from**](https://docs.docker.com/engine/network/drivers/overlay/)

## 4. `none` Network

- `none` network used when we want to isolate a container from all networks, it only has a loopback interface.
- Containers connected to the `none` network cannot communicate with other containers or the host machine.

## Publishing Ports

- By default, containers are isolated from the host network. To allow access to a container from the host or external systems, we need to publish ports.
- Ports can be published using the `-p` or `--publish` flag when running a container.
- The syntax for publishing ports is `-p <host_port>:<container_port>`.
- Example: Running a web server container and want to access it on port 8080 of the host machine.

  ```bash
  docker run -d -p 8080:80 nginx
  ```

- Now, we can access the Nginx web server by navigating to `http://localhost:8080` on the host machine.

## Connecting to multiple networks

- A container can be connected to multiple networks, allowing it to communicate with containers on different networks.
- For example: A frontend container can be connected with bridge network to communicate with **external** clients and with an **overlay** network to communicate with backend services in a swarm.
- A container may also be connected with different types of networks, such as **ipvlan** for high-performance networking and **bridge** for local communication.

## Commands Reference

### Create a user-defined network

- To create a user-defined network, use the following command:

  ```bash
  docker network create \
    --driver=bridge \
    --ip-range=172.28.5.0/24 \
    --gateway=172.28.5.254 \
    --ipv6 \
    --ipv4=false \
    --label com.example.network=custom_bridge \
    my_custom_network
  ```

  - **--driver:** Specifies the network driver to use (e.g., bridge, overlay).
  - **--ip-range:** Specifies the subnet for the network.
  - **--gateway:** Specifies the gateway for the network.
  - **--ipv6 / --ipv4:** Enables or disables IPv6/IPv4 support for the network.
  - **--label:** Adds metadata to the network.
  - **my_custom_network:** The name of the user-defined network.

### Connect a container to a user-defined network

- To connect a container to a user-defined network at the time of creation, use the `--network` flag with the `docker run` command:

  ```bash
  docker network create my_custom_network
  docker run -d --name my_container --network my_custom_network nginx

  # OR
  docker create --name my-nginx \
    --network my_custom_network \
    -p 8080:80 \
    nginx

  docker start my-nginx
  ```

### Connect and disconnect a running container to user-defined network

- To connect a running container to a user-defined network, use the following command:

  ```bash
  docker network connect <network_name> <container_name_or_id>
  ```

- To disconnect a running container from a user-defined network, use the following command:

  ```bash
  docker network disconnect <network_name> <container_name_or_id>
  ```
