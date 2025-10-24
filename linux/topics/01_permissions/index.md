# Linux Permissions - Simple Guide

> Permissions control what users can do on a Linux system. Linux uses **users** and **groups** to manage these permissions.

---

## Table of Contents

- [Creating Users](#creating-users)
- [Managing Groups](#managing-groups)
- [File Permissions Basics](#file-permissions-basics)
- [Switching Users](#switching-users)
- [Removing Users](#removing-users)
- [Useful Commands](#useful-commands)

---

## Creating Users

### Add a New User

```bash
sudo adduser john
```

- **Important Options**

  | Option                | What It Does                                       |
  | --------------------- | -------------------------------------------------- |
  | `-m`                  | Create home directory                              |
  | `-c "Full Name"`      | Set full name for the user                         |
  | `-s /bin/bash`        | Set login shell (e.g., `/bin/bash`, `/bin/zsh`)    |
  | `-G group1,group2`    | Add user to additional groups                      |
  | `-u UID`              | Set a specific user ID                             |
  | `-g GID`              | Set a specific group ID                            |
  | `-p password`         | Set encrypted password (not recommended)           |
  | `--home`              | Specify home directory (default: `/home/username`) |
  | `--shell`             | Specify login shell (default: `/bin/bash`)         |
  | `--uid`               | Set a specific user ID                             |
  | `--gid`               | Set a specific group ID                            |
  | `--disabled-password` | Create user without a password (no login)          |
  | `--gecos`             | Set full name and other info                       |

### Set a Password

```bash
sudo passwd john
```

> **Tip**: You'll be asked to type and confirm the password.

---

## Managing Groups

### Check User's Groups

```bash
groups john    # Check groups for user 'john'
groups         # Check your own groups
```

### Add User to a Group

```bash
sudo usermod -aG sudo john
```

This adds `john` to the `sudo` group (admin privileges).

### Common Groups Explained

| Group     | What It Does            |
| --------- | ----------------------- |
| `sudo`    | Run commands as admin   |
| `adm`     | Read system logs        |
| `cdrom`   | Access CD/DVD drives    |
| `audio`   | Use sound devices       |
| `video`   | Use camera/graphics     |
| `plugdev` | Use USB drives          |
| `docker`  | Run Docker without sudo |

### Create Your Own Group

- **Step 1: Create the group**

  ```bash
  sudo groupadd developers
  ```

- **Step 2: Add users to it**

  ```bash
  sudo usermod -aG developers john
  ```

- **Step 3: Set folder permissions**

  ```bash
  # Make 'developers' group own this folder
  sudo chown :developers /home/project

  # Give the group full access
  sudo chmod g+rwx /home/project
  ```

---

## File Permissions Basics

### Understanding Permission Numbers

Each file has 3 sets of permissions: **Owner**, **Group**, **Others**

| Number | Means                  | Letters |
| ------ | ---------------------- | ------- |
| `7`    | Read + Write + Execute | `rwx`   |
| `6`    | Read + Write           | `rw-`   |
| `5`    | Read + Execute         | `r-x`   |
| `4`    | Read only              | `r--`   |
| `0`    | No access              | `---`   |

### Common Permission Patterns

```bash
# Make a script runnable
chmod 755 script.sh          # Owner: full, Others: read+run

# Private file (only you can read/write)
chmod 600 secret.txt         # Owner: read+write, Others: nothing

# Public file (everyone can read)
chmod 644 document.txt       # Owner: read+write, Others: read

# Shared folder for a team
chmod 770 /team-folder       # Owner+Group: full, Others: nothing
```

### Change File Owner

```bash
# Change owner to 'john'
sudo chown john file.txt

# Change owner and group
sudo chown john:developers file.txt

# Change for entire folder
sudo chown -R john:developers /project
```

---

## Switching Users

```bash
# Switch to another user
su - john

# Go back to previous user
exit
```

> **Note**: You'll need to enter `john`'s password.

---

## Removing Users

```bash
# Delete user and their home folder
sudo userdel -r john
```

---

## Useful Commands

### Who Am I?

```bash
whoami           # Show current username
id               # Show user ID and groups
who              # Show who's logged in
```

### List All Users

```bash
cat /etc/passwd  # See all user accounts
```

### View File Permissions

```bash
ls -l            # Shows: -rw-r--r-- (permissions)
```

**Example output:**

```bash
-rw-r--r--  1  john  developers  1024  file.txt
  ↑        ↑    ↑        ↑        ↑       ↑
permissions links owner  group   size   name
```

### Important Files

| File           | Contains          |
| -------------- | ----------------- |
| `/etc/passwd`  | User accounts     |
| `/etc/group`   | Group information |
| `/etc/sudoers` | Admin permissions |

---

## Quick Reference Card

```bash
# USER MANAGEMENT
sudo adduser john              # Add new user
sudo passwd john               # Set password
sudo userdel -r john          # Delete user

# GROUP MANAGEMENT
sudo groupadd team            # Create group
sudo usermod -aG team john    # Add user to group
groups john                   # Check user's groups

# PERMISSIONS
chmod 755 file                # Change permissions
chown john file               # Change owner
chown john:team file          # Change owner & group

# SWITCHING
su - john                     # Switch to user
exit                          # Switch back
```

> **Remember**: Use `sudo` before commands that need admin privileges!
