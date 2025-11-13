# Introduction to Docker

## Problem Statement

- Traditionally suppose we want to build an application following things are required:

  - **Backend Server (Node JS)**
  - **Database (MongoDB)**
  - **Frontend (React JS)**

- What happened without Docker?

  1. We need to install Node JS, MongoDB, and React JS on our local machine.
  2. We need to use the same version of these softwares as our teammates to avoid compatibility issues.
  3. If we want to deploy our application on a server, we need to install all these softwares on the server as well.
  4. If we want to share our application with someone, they also need to install all these softwares on their machine.

- This may lead to the following issues:
  - Version conflicts
  - Dependency issues
  - Environment inconsistencies
  - Difficulties in deployment and sharing

## Solution: Docker

- Using Docker, we can containerize our application along with all codes and dependencies.
- A Docker **container image** is a lightweight, standalone, and executable package that includes everything needed to run a piece of software, including the code, runtime, libraries, and system tools.
- A Docker **container image** becomes a Docker **container** at runtime.
- The beauty of Docker container is that it runs in same system but isolated that make them portable and consistent across different environments.
- With Docker, we can create a single image that contains our Node JS backend, MongoDB database, and React JS frontend.
- This image can be run on any machine that has Docker installed, regardless of the underlying operating system or software versions.
- Containers are:

  - Lightweight
  - Self-contained
  - Portable
  - Consistent across environments

- This solves the problems mentioned above and makes it easier to develop, deploy, and share applications.
