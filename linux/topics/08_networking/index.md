# Networking in Linux

> Networking allows your Linux system to communicate with other devices and services. This guide covers the essential networking concepts, tools, and commands you need to know.

## Table of Contents

- [DNS and Hostname](#dns-and-hostname)
- [Network Configuration Files](#network-configuration-files)
- [Basic Networking Commands](#basic-networking-commands)
- [Routing](#routing)
- [Network Diagnostic Tools](#network-diagnostic-tools)
- [Remote Access (SSH)](#remote-access-ssh)
- [File Transfer (SCP)](#file-transfer-scp)

---

## DNS and Hostname

### What is DNS?

DNS (Domain Name System) translates domain names (like google.com) into IP addresses that computers understand.

### DNS Configuration File: `/etc/resolv.conf`

- Contains the DNS servers your system uses
- Shows which servers resolve domain names to IP addresses

```bash
cat /etc/resolv.conf
```

### Hostname File: `/etc/hostname`

- Contains your computer's name on the network
- View it anytime with:

```bash
cat /etc/hostname
```

### Looking Up DNS Information

**`nslookup` - Simple DNS lookup**

```bash
nslookup example.com
```

**`dig` - Detailed DNS information**

```bash
dig example.com
```

---

## Network Configuration Files

### `/etc/hosts` - Local DNS Mapping

Maps hostnames to IP addresses on your local machine (bypasses DNS).

```bash
cat /etc/hosts
```

**Example entry:**

```bash
192.168.1.10    myserver
```

### Debian/Ubuntu: `/etc/network/interfaces`

Configures network interfaces at boot time.

```bash
cat /etc/network/interfaces
```

### RHEL/CentOS: `/etc/sysconfig/network-scripts/`

Contains configuration files for each network interface (e.g., `ifcfg-eth0`).

```bash
cat /etc/sysconfig/network-scripts/ifcfg-eth0
```

---

## Basic Networking Commands

### View Network Interfaces

```bash
ip addr show
# or shorter version
ip a
```

**Common `ip` Command Options:**

| Command       | Description                             |
| ------------- | --------------------------------------- |
| `ip addr`     | Show IP addresses                       |
| `ip link`     | Show network interfaces (MAC addresses) |
| `ip addr add` | Add an IP address                       |
| `ip addr del` | Remove an IP address                    |
| `ip -br addr` | Brief output (easier to read)           |

### View Routing Table

```bash
ip route show
# or shorter
ip r
```

Shows how your system sends data to different networks.

### Test Connectivity: `ping`

```bash
ping example.com
```

**Useful `ping` Options:**

| Option        | Description                         | Example                  |
| ------------- | ----------------------------------- | ------------------------ |
| `-c count`    | Send specific number of packets     | `ping -c 5 google.com`   |
| `-i interval` | Wait time between packets (seconds) | `ping -i 2 google.com`   |
| `-s size`     | Packet size (bytes)                 | `ping -s 100 google.com` |
| `-W timeout`  | Wait time for response (seconds)    | `ping -W 3 google.com`   |

### View Network Connections

```bash
netstat -tuln
```

- `t` = TCP connections
- `u` = UDP connections
- `l` = Listening ports
- `n` = Show numbers (not names)

---

## Routing

### What is Routing?

Routing determines the path data takes through networks to reach its destination.

### View Routes

```bash
route -n
# Modern alternative
ip route show
```

**Important `route` Options:**

| Option    | Description                       | Example                                             |
| --------- | --------------------------------- | --------------------------------------------------- |
| `-n`      | Show IP addresses (not hostnames) | `route -n`                                          |
| `add`     | Add a route                       | `sudo route add -net 192.168.1.0/24 gw 192.168.1.1` |
| `del`     | Delete a route                    | `sudo route del -net 192.168.1.0/24`                |
| `default` | Set default gateway               | `sudo route add default gw 192.168.1.1`             |

### Trace Route to Destination

```bash
traceroute example.com
```

Shows each "hop" (router) your data passes through to reach the destination.

---

## Network Diagnostic Tools

| Tool       | Purpose                                      | Example                            |
| ---------- | -------------------------------------------- | ---------------------------------- |
| `ifconfig` | Configure interfaces (old, use `ip` instead) | `ifconfig eth0`                    |
| `ethtool`  | Check/change ethernet settings               | `ethtool eth0`                     |
| `netstat`  | Show connections and statistics              | `netstat -tuln`                    |
| `nmap`     | Scan networks and ports                      | `nmap 192.168.1.1`                 |
| `tcpdump`  | Capture network traffic                      | `sudo tcpdump -i eth0`             |
| `iptraf`   | Real-time network monitoring                 | `sudo iptraf`                      |
| `mtr`      | Combines ping + traceroute                   | `mtr example.com`                  |
| `curl`     | Transfer data from servers                   | `curl http://example.com`          |
| `wget`     | Download files                               | `wget http://example.com/file.zip` |

---

## Remote Access (SSH)

### What is SSH?

SSH (Secure Shell) lets you securely connect to remote computers over a network with encryption.

### Basic Connection

```bash
ssh username@remote_host
```

**Example:**

```bash
ssh john@192.168.1.100
```

### Important SSH Options

| Option               | Description                      | Example                              |
| -------------------- | -------------------------------- | ------------------------------------ |
| `-p port`            | Use different port (default: 22) | `ssh -p 2222 user@host`              |
| `-i keyfile`         | Use private key for login        | `ssh -i ~/.ssh/mykey user@host`      |
| `-v`                 | Verbose (show debug info)        | `ssh -v user@host`                   |
| `-C`                 | Compress data                    | `ssh -C user@host`                   |
| `-X`                 | Enable graphical applications    | `ssh -X user@host`                   |
| `-L local:host:port` | Forward local port               | `ssh -L 8080:localhost:80 user@host` |

---

## File Transfer (SCP)

### What is SCP?

SCP (Secure Copy) transfers files securely between computers using SSH.

### Copy File to Remote Server

```bash
scp /local/file.txt username@remote_host:/remote/directory/
```

### Copy File from Remote Server

```bash
scp username@remote_host:/remote/file.txt /local/directory/
```

### Copy Entire Directory

```bash
scp -r /local/directory username@remote_host:/remote/directory/
```

### Important SCP Options

| Option       | Description                      | Example                                    |
| ------------ | -------------------------------- | ------------------------------------------ |
| `-P port`    | Use different port (default: 22) | `scp -P 2222 file.txt user@host:~`         |
| `-i keyfile` | Use private key                  | `scp -i ~/.ssh/mykey file.txt user@host:~` |
| `-r`         | Copy directories recursively     | `scp -r folder/ user@host:~`               |
| `-v`         | Verbose output                   | `scp -v file.txt user@host:~`              |
| `-C`         | Compress during transfer         | `scp -C largefile.zip user@host:~`         |
