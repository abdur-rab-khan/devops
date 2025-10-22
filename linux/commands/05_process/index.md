# Process in Linux

> A process is an instance of a program that is being executed. In Linux, processes are managed by the kernel, which allocates resources and schedules CPU time for each process. \
> A process can be in various states, such as running, sleeping, stopped, or zombie.

- [Process in Linux](#process-in-linux)
  - [Types of Processes](#types-of-processes)
  - [Process Scheduling and States](#process-scheduling-and-states)
  - [Process and Thread IDs](#process-and-thread-ids)
  - [Terminating Processes](#terminating-processes)
  - [User and Group IDs](#user-and-group-ids)
  - [Priority and Niceness](#priority-and-niceness)
  - [Background and Foreground Processes](#background-and-foreground-processes)
  - [The `ps` Command](#the-ps-command)
  - [Other Process Management Commands](#other-process-management-commands)
    - [`top`](#top)
  - [Scheduling Future Processes](#scheduling-future-processes)
    - [`at`](#at)
    - [`cron`](#cron)

## Types of Processes

- **1. Interactive Processes**

  - Processes that require user input to work.
  - **Examples:** `vim`, `nano`, `firefox`, `chrome`

- **2. Batch Processes**

  - Automated tasks that run without user interaction, often scheduled.
  - **Examples:** System backups, `cron` jobs, `logrotate`

- **3. Daemon Processes**

  - Background services running continuously (usually start at boot).
  - **Examples:** `apache2`, `nginx`, `mysqld`, `sshd`, `cupsd`

- **4. Threaded Processes**

  - Processes that run multiple tasks simultaneously and share memory.
  - **Examples:** Web browsers (multiple tabs), modern text editors

- **5. Kernel Threads**

  - Special system processes that handle core OS operations.
  - **Examples:** `kthreadd`, `kworker`, `ksoftirqd`

- **6. Orphan Processes**

  - Processes whose parent has terminated (adopted by `init`/`systemd`).

- **7. Zombie Processes**

  - Completed processes waiting for parent to read their exit status.
  - **Check zombies:** `ps aux | grep Z`

## Process Scheduling and States

**Process States:**

- **Running:** Process is currently executing
- **Sleeping:** Waiting for an event or resource
- **Stopped:** Paused (can be resumed)
- **Zombie:** Finished but not cleaned up yet

**Scheduling:** Linux uses CFS (Completely Fair Scheduler) to distribute CPU time fairly among processes.

## Process and Thread IDs

- **PID:** Unique ID for each process
- **PPID:** Parent Process ID (which process started it)
- **TID:** Thread ID within a process

**View PIDs:** Use `ps`, `top`, or `htop` commands

## Terminating Processes

**Common Signals:**

- `SIGTERM (15)` - Graceful stop (default, allows cleanup)
- `SIGKILL (9)` - Force stop (immediate, no cleanup)
- `SIGINT (2)` - Interrupt (Ctrl+C)

**Commands:**

- `kill <PID>` - Terminate process
- `kill -9 <PID>` - Force kill
- `pkill <name>` - Kill by process name
- `killall <name>` - Kill all matching processes

## User and Group IDs

- **UID:** User who owns the process
- **GID:** Group associated with the process
- **EUID/EGID:** Effective IDs used for permission checks

## Priority and Niceness

**Niceness Range:** -20 (highest priority) to 19 (lowest priority)

- Default: 0
- Lower value = Higher priority = More CPU time

**Commands:**

- `nice -n 10 <command>` - Start with niceness 10
- `renice -5 -p <PID>` - Change niceness to -5

## Background and Foreground Processes

- **Foreground:** Process occupies terminal, you must wait for it to finish.
- **Background:** Process runs independently, terminal is free to use.

- **Commands:**

  - `<command> &` - Run in background
  - `Ctrl+Z` - Pause current process
  - `bg` - Resume paused process in background
  - `bg %<job_number>` - Resume specific job in background
  - `fg` - Bring background process to foreground
  - `fg %<job_number>` - Bring specific job to foreground
  - `fg %<PID>` - Bring process to foreground by PID
  - `jobs` - List background jobs
  - `jobs -l` - List jobs with PIDs
  - `nohup <command> &` - Run in background, survives terminal close

## The `ps` Command

- It helps us to view the currently running processes on the system.

- **Common Commands:**

  - `ps aux` - Show all processes
  - `ps -ef` - Show all processes (full format)
  - `ps -u username` - Show user's processes
  - `ps -p 1234` - Show specific process (PID 1234)
  - `ps -eo pid,ppid,cmd,%mem,%cpu` - Custom columns

- **Important Columns:**

  - `PID` - Process number
  - `PPID` - Parent process number
  - `USER` - Who owns the process
  - `NICE` - Niceness value
  - `%CPU` - CPU usage
  - `%MEM` - Memory usage
  - `CMD` - Command name
  - `STAT` - Status (R=running, S=sleeping, Z=zombie)
  - `TIME` - Total CPU time used
  - `TTY` - Terminal (? means no terminal)

- **Useful Examples:**

  - `ps aux | grep firefox` - Find Firefox process
  - `ps aux | head -10` - Show top 10 processes
  - `ps aux --sort=-%mem` - Sort by memory usage
  - `ps aux --sort=-%cpu` - Sort by CPU usage

## Other Process Management Commands

### `top`

- Real-time process viewer showing live system stats

- **Basic Usage:**

- `top` - Launch top interface
- `q` - Quit
- `h` - Show help

**Interactive Keys (inside top):**

    - `k` - Kill process (enter PID)
    - `r` - Change process priority (enter PID + niceness)
    - `M` - Sort by memory
    - `P` - Sort by CPU
    - `1` - Toggle individual CPU cores view
    - `t` - Toggle task/CPU summary
    - `m` - Toggle memory summary
    - `c` - Show full command path
    - `u` - Filter by username

**Tips:**

- Press `Shift + F` to customize columns
- Use `top -u username` to monitor specific user
- Use `top -p PID` to monitor specific process

## Scheduling Future Processes

- These commands help schedule tasks for future execution.
- There are two main commands: `at` and `cron`.

### `at`

Schedule one-time tasks for future execution.

**Basic Commands:**

- `at 14:30` - Run at 2:30 PM today
- `at now + 1 hour` - Run 1 hour from now
- `at 10:00 AM tomorrow` - Run at 10 AM tomorrow
- `at midnight` - Run at midnight
- `atq` - View scheduled jobs
- `atrm <job_number>` - Cancel a job

**How to use:**

1. Type `at <time>`
2. Enter your commands (one per line)
3. Press `Ctrl+D` to save

**Example:**

```bash
$ at 14:30
at> echo "Task started" >> /tmp/log.txt
at> <Ctrl+D>
```

### `cron`

Schedule recurring/repeating tasks automatically.

**Basic Commands:**

- `crontab -e` - Edit your cron jobs
- `crontab -l` - List your cron jobs
- `crontab -r` - Remove all your cron jobs

**Cron Format:**

```
* * * * * command
│ │ │ │ │
│ │ │ │ └─ Day of week (0-7, Sunday=0 or 7)
│ │ │ └─── Month (1-12)
│ │ └───── Day of month (1-31)
│ └─────── Hour (0-23)
└───────── Minute (0-59)
```

**Common Examples:**

```bash
0 2 * * * /home/user/backup.sh          # Daily at 2 AM
*/15 * * * * /home/user/check.sh        # Every 15 minutes
0 0 * * 0 /home/user/weekly.sh          # Every Sunday at midnight
0 9 1 * * /home/user/monthly.sh         # 1st of month at 9 AM
```

**Quick Shortcuts:**

- `@reboot` - Run at system startup
- `@daily` or `@midnight` - Run once a day
- `@hourly` - Run every hour
- `@weekly` - Run once a week
- `@monthly` - Run once a month
- `@yearly` - Run once a year

**Tips:**

- Use full paths in cron commands (e.g., `/usr/bin/python3` instead of `python3`)
- Add `> /tmp/cron.log 2>&1` at end to save output for debugging
- Test your commands manually before adding to cron

- **Example Cron Job:**

```bash
0 3 * * * /usr/bin/python3 /home/user/scripts/cleanup.py >> /home/user/logs/cleanup.log 2>&1
```

- This runs a Python cleanup script every day at 3 AM and logs output.
- `2>&1` redirects both standard output and error to the log file.
