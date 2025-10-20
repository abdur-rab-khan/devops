# Permissions in Linux

> Permissions determine about what users can perform tasks on the machine. To manage permissions, Linux uses users and groups.

- [Permissions in Linux](#permissions-in-linux)
  - [Adding a User](#adding-a-user)
    - [Using `adduser` Command](#using-adduser-command)
    - [Setting a Password for the New User](#setting-a-password-for-the-new-user)
  - [Switching Between Users](#switching-between-users)
  - [Deleting a User](#deleting-a-user)
  - [List down all users in the system](#list-down-all-users-in-the-system)
  - [Adding User to Groups (Permissions)](#adding-user-to-groups-permissions)
    - [Default Groups](#default-groups)
      - [Administrative Groups](#administrative-groups)
      - [System Access \& Monitoring](#system-access--monitoring)
      - [Hardware \& Device Access](#hardware--device-access)
      - [Printing \& Storage](#printing--storage)
      - [Networking](#networking)
      - [User-Specific](#user-specific)
  - [Custom Groups](#custom-groups)
    - [1. Creating a Custom Group](#1-creating-a-custom-group)
    - [2. Adding Users to the Custom Group](#2-adding-users-to-the-custom-group)
    - [3. Setting Permissions for the Group](#3-setting-permissions-for-the-group)
      - [Option 1: File/Directory Permissions](#option-1-filedirectory-permissions)
      - [Option 2: Sudo Privileges via Sudoers File](#option-2-sudo-privileges-via-sudoers-file)
      - [Examples: Practical Sudoers Configurations](#examples-practical-sudoers-configurations)
  - [Using `chown` and `chmod` Commands](#using-chown-and-chmod-commands)
    - [`chown` Command](#chown-command)
      - [Example:](#example)
    - [`chmod` Command](#chmod-command)
      - [Permission Modes](#permission-modes)
      - [Examples](#examples)
      - [Quick Tips](#quick-tips)

## Adding a User

### Using `adduser` Command

- To add a new user, use the `adduser` command followed by the username, which works on most Linux distributions:

  ```shell
  sudo adduser student

  # Or
  sudo useradd -m student

  # "useradd" -> works on lower level Linux distributions like CentOS, RHEL, Fedora
  ```

### Setting a Password for the New User

- After creating the user, set a password for them using the `passwd` command:

  ```shell
  sudo passwd student
  ```

- You will be prompted to enter and confirm the new password for the user.

## Switching Between Users

- To switch to another user account, use the `su` command followed by the username:

  ```shell
  su - student
  ```

- You will be prompted to enter the password for the user you are switching to.
- To switch back to your original user, simply type `exit` or press `Ctrl+D`.

## Deleting a User

- To delete a user, use the `deluser` command followed by the username:

  ```shell
  sudo deluser student

  # Or
  sudo userdel -r student

  # The "-r" option removes the user's home directory and mail spool.
  ```

## List down all users in the system

- To see all users on the system, you can view the `/etc/passwd` file:

  ```shell
  cat /etc/passwd
  ```

- Each line in this file represents a user account, with fields separated by colons. The first field is the username.

## Adding User to Groups (Permissions)

- To add a user to a group, use the `usermod` command with the `-aG` options:

  ```shell
  sudo usermod -aG [groupname] [username]

  # Example:
  sudo usermod -aG sudo student
  ```

- This command adds the user `student` to the `sudo` group, granting them administrative privileges.

### Default Groups

When a user is created in Linux, they are automatically assigned to certain default groups. Understanding these groups helps in managing user permissions effectively.

#### Administrative Groups

| Group Name | Description                           | Permissions & Capabilities                         |
| ---------- | ------------------------------------- | -------------------------------------------------- |
| `sudo`     | Superuser group                       | Execute commands with root privileges using `sudo` |
| `wheel`    | Alternative admin group (RHEL/CentOS) | Similar to sudo, administrative access             |
| `root`     | Root user group                       | Full system access (primary group of root user)    |

#### System Access & Monitoring

| Group Name        | Description       | Permissions & Capabilities                                   |
| ----------------- | ----------------- | ------------------------------------------------------------ |
| `adm`             | System monitoring | Read system logs in `/var/log`, view system monitoring files |
| `systemd-journal` | Journal access    | Read systemd journal logs                                    |
| `syslog`          | Syslog access     | Read syslog files                                            |

#### Hardware & Device Access

| Group Name | Description          | Permissions & Capabilities                        |
| ---------- | -------------------- | ------------------------------------------------- |
| `cdrom`    | Optical drive access | Mount and access CD/DVD drives                    |
| `audio`    | Audio devices        | Access sound cards and audio devices              |
| `video`    | Video devices        | Access video capture devices and GPU acceleration |
| `plugdev`  | Removable devices    | Mount and access USB drives, external storage     |
| `dialout`  | Serial port access   | Access serial ports and USB-to-serial adapters    |
| `dip`      | Network devices      | Configure dial-up and VPN connections             |

#### Printing & Storage

| Group Name | Description            | Permissions & Capabilities                       |
| ---------- | ---------------------- | ------------------------------------------------ |
| `lpadmin`  | Printer administration | Add, remove, and configure printers              |
| `lp`       | Printer access         | Submit print jobs to printers                    |
| `disk`     | Raw disk access        | Direct access to disk devices (use with caution) |

#### Networking

| Group Name | Description        | Permissions & Capabilities       |
| ---------- | ------------------ | -------------------------------- |
| `netdev`   | Network management | Configure network interfaces     |
| `docker`   | Docker access      | Run Docker commands without sudo |

#### User-Specific

| Group Name   | Description        | Permissions & Capabilities                      |
| ------------ | ------------------ | ----------------------------------------------- |
| `users`      | Standard users     | Default group for regular users                 |
| `[username]` | Primary user group | Each user typically has their own primary group |

> **Note**: The availability of these groups may vary depending on your Linux distribution. Use `cat /etc/group` to see all groups available on your system.

## Custom Groups

- We can create custom groups to manage specific permissions for a set of users.

- Steps to create a custom group and add user to it:

### 1. Creating a Custom Group

- Use the `groupadd` command followed by the group name:

  ```shell
  sudo groupadd developers
  ```

- This command creates a new group named `developers`.

### 2. Adding Users to the Custom Group

- Once the group is created, add users to it using the `usermod` command:

  ```shell
  sudo usermod -aG developers student
  ```

- This adds the user `student` to the `developers` group without removing them from other groups.

- To verify group membership:

  ```shell
  groups student
  # Or check all members of a group:
  getent group developers
  ```

### 3. Setting Permissions for the Group

#### Option 1: File/Directory Permissions

- Set specific permissions for the group on files or directories using `chown` and `chmod`:

  ```shell
  # Change group ownership
  sudo chown :developers /path/to/directory

  # Set group permissions (read, write, execute)
  sudo chmod g+rwx /path/to/directory

  # Make new files inherit the group
  sudo chmod g+s /path/to/directory
  ```

  - `chown :groupname` - Changes the group ownership
  - `chmod g+rwx` - Grants read, write, and execute permissions to the group
  - `chmod g+s` - Sets the setgid bit, ensuring new files inherit the directory's group

#### Option 2: Sudo Privileges via Sudoers File

- Grant specific sudo privileges to the group by editing the sudoers file with `sudo visudo`:

  ```shell
  # Grant full sudo access with password
  %developers ALL=(ALL:ALL) ALL

  # Grant full sudo access without password
  %developers ALL=(ALL:ALL) NOPASSWD: ALL

  # Grant specific command access without password
  %developers ALL=(ALL) NOPASSWD: /usr/bin/systemctl, /usr/bin/docker
  ```

  **Syntax explanation:**

  - `%groupname` - Specifies a group (% prefix is required)
  - `ALL=(ALL:ALL)` - Can run as any user and group on any host
  - `NOPASSWD:` - No password required
  - `/path/to/command` - Specific commands allowed

#### Examples: Practical Sudoers Configurations

```shell
# Web administrators - manage web servers
%webadmins ALL=(ALL) NOPASSWD: /usr/sbin/apache2ctl, /usr/sbin/nginx, /bin/systemctl restart apache2, /bin/systemctl restart nginx

# Database administrators - manage databases
%dbadmins ALL=(ALL) /usr/bin/mysql, /usr/bin/mysqladmin, /usr/bin/pg_dump, /bin/systemctl restart mysql

# DevOps team - container and orchestration management
%devops ALL=(ALL) NOPASSWD: /usr/bin/docker, /usr/bin/kubectl, /usr/local/bin/helm, /usr/bin/docker-compose

# Backup operators - backup and restore operations
%backup ALL=(ALL) NOPASSWD: /usr/bin/rsync, /usr/bin/tar, /bin/cp, /usr/bin/duplicity

# Network operations - network configuration
%netops ALL=(ALL) /sbin/ifconfig, /sbin/ip, /sbin/route, /usr/bin/netstat, /bin/systemctl restart networking

# Service administrators - manage system services
%serviceadmin ALL=(ALL) /bin/systemctl start, /bin/systemctl stop, /bin/systemctl restart, /bin/systemctl status

# File managers - specific directory access --> NOPASSWD means no password prompt needed
%filemanagers ALL=(ALL) NOPASSWD: /bin/mkdir /var/www/*, /bin/chown /var/www/*, /bin/chmod /var/www/*

# Project team - limited log viewing and directory creation
%projectteam ALL=(ALL) /bin/cat /var/log/syslog, /bin/mkdir /usr/local/*
```

> **Security Best Practice**: Always use `visudo` to edit the sudoers file. It validates syntax before saving, preventing lockouts from configuration errors. Never edit `/etc/sudoers` directly with a text editor.

## Using `chown` and `chmod` Commands

### `chown` Command

The `chown` command changes the ownership of files and directories, allowing you to set which user and group own a particular file or directory.

**Syntax:**

```shell
sudo chown [options] new_owner:new_group file_or_directory
```

**Parameters:**

- `new_owner` - Username of the new owner
- `new_group` - Group name (optional)
- `file_or_directory` - Path to the target file or directory

**Common Options:**

- `-R` - Recursive (apply to directories and their contents)
- `-v` - Verbose (display detailed information)

#### Example:

```shell
# Change owner and group
sudo chown student:developers /home/student/project

# Change owner only
sudo chown student /home/student/project

# Change group only
sudo chown :developers /home/student/project

# Recursive change for directory and contents
sudo chown -R student:developers /home/student/project
```

---

### `chmod` Command

The `chmod` command modifies file and directory permissions, controlling read (r), write (w), and execute (x) access for the owner, group, and others.

**Syntax:**

```shell
sudo chmod [options] mode file_or_directory
```

**Parameters:**

- `mode` - Permission settings (symbolic or numeric)
- `file_or_directory` - Path to the target file or directory

**Common Options:**

- `-R` - Recursive (apply to directories and their contents)
- `-v` - Verbose (display detailed information)

#### Permission Modes

**Numeric (Octal) Mode:**

| Digit | Binary | Symbolic | Permissions            | Description         |
| ----- | ------ | -------- | ---------------------- | ------------------- |
| `7`   | `111`  | `rwx`    | Read + Write + Execute | Full access         |
| `6`   | `110`  | `rw-`    | Read + Write           | Can read and modify |
| `5`   | `101`  | `r-x`    | Read + Execute         | Can read and run    |
| `4`   | `100`  | `r--`    | Read only              | View only           |
| `3`   | `011`  | `-wx`    | Write + Execute        | Can modify and run  |
| `2`   | `010`  | `-w-`    | Write only             | Can modify only     |
| `1`   | `001`  | `--x`    | Execute only           | Can run only        |
| `0`   | `000`  | `---`    | No permissions         | No access           |

**Permission Structure:**

```txt
Owner  Group  Others
 rwx    rwx    rwx
 421    421    421
```

**Symbolic Mode:**

| Operator | Description          |
| -------- | -------------------- |
| `+`      | Add permission       |
| `-`      | Remove permission    |
| `=`      | Set exact permission |

| Target | Description                 |
| ------ | --------------------------- |
| `u`    | User (owner)                |
| `g`    | Group                       |
| `o`    | Others                      |
| `a`    | All (user + group + others) |

#### Examples

**Numeric Mode:**

```shell
# 750: Owner=rwx, Group=r-x, Others=none
sudo chmod 750 /home/student/project

# 644: Owner=rw-, Group=r--, Others=r--
sudo chmod 644 /home/student/document.txt

# 755: Owner=rwx, Group=r-x, Others=r-x
sudo chmod 755 /usr/local/bin/script.sh

# Recursive permission change
sudo chmod -R 755 /var/www/html
```

**Symbolic Mode:**

```shell
# Add execute permission for owner
sudo chmod u+x script.sh

# Remove write permission for group and others
sudo chmod go-w file.txt

# Set read and write for owner, read-only for others
sudo chmod u=rw,go=r document.txt

# Add execute permission for all
sudo chmod a+x program

# Remove all permissions for others
sudo chmod o-rwx private_file.txt
```

**Common Permission Patterns:**

```shell
# Executable script
sudo chmod 755 script.sh          # rwxr-xr-x

# Private file (owner only)
sudo chmod 600 secret.txt         # rw-------

# Shared project directory
sudo chmod 770 /opt/shared        # rwxrwx---

# Public readable file
sudo chmod 644 document.txt       # rw-r--r--

# Web server files
sudo chmod 644 index.html         # rw-r--r--

# Web server directories
sudo chmod 755 /var/www/html      # rwxr-xr-x
```

**Special Permissions:**

| Mode | Name   | Symbol | Effect                                         |
| ---- | ------ | ------ | ---------------------------------------------- |
| `4`  | SUID   | `s`    | Run as file owner (appears as `rws` or `rwS`)  |
| `2`  | SGID   | `s`    | Run as file group / Inherit directory group    |
| `1`  | Sticky | `t`    | Only owner can delete files (appears as `rwt`) |

```shell
# Set SUID (4000)
sudo chmod 4755 /usr/bin/program  # rwsr-xr-x

# Set SGID (2000)
sudo chmod 2775 /shared/directory # rwxrwsr-x

# Set Sticky Bit (1000)
sudo chmod 1777 /tmp              # rwxrwxrwt

# Symbolic notation
sudo chmod u+s file               # Add SUID
sudo chmod g+s directory          # Add SGID
sudo chmod +t directory           # Add Sticky Bit
```

> **Tip**: Use `ls -l` to view current permissions. The first column shows the permission string (e.g., `drwxr-xr-x` for directories, `-rw-r--r--` for files).

#### Quick Tips

- Always use `visudo` to edit the sudoers file (it checks for mistakes)
- `su` asks for the other user’s password
- `sudo` asks for your own password
- Use `whoami` to see which user you are right now
