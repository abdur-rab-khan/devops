# User Environment

## Identify Current User

- `whoami`: Displays the username of the current user.
- `who`: Shows who is logged in and what they are doing.
- `id`: Displays user ID (UID) and group ID (GID) along with group memberships.

## User Information Files

- `/etc/passwd`: Contains user account information.
- `/etc/shadow`: Contains encrypted password information.
- `/etc/group`: Contains group information.
- `/etc/sudoers`: Configures sudo permissions for users.

## User Startup Files

- Linux bash shell reads startup files when you log in or open a terminal.
- System-wide files in `/etc/` apply to all users.
- User-specific files in your home directory (`~/`) can override system settings.
- These files let you:
  - Set environment variables
  - Create command shortcuts (aliases)
  - Customize shell behavior
  - Run commands automatically at startup
  - Choose your default text editor

### Order of Startup Files

When you log in to Linux, it reads configuration files in a specific order:

**Login shells** (when you first log in):

1. `/etc/profile` - System settings for all users
2. `~/.bash_profile` OR `~/.bash_login` OR `~/.profile` - Your personal settings (only one is used)
3. `~/.bash_logout` - Runs when you log out

**Non-login shells** (when you open a new terminal):

1. `~/.bashrc` - Your personal settings for new terminals

**Key points:**

- Linux checks for `~/.bash_profile` first, then `~/.bash_login`, then `~/.profile` - it uses the first one it finds
- Every time you open a new terminal window, only `~/.bashrc` runs
- Different Linux distributions may use slightly different files

## Creating Shortcuts (Aliases)

Aliases let you create short names for long commands.

### How to Create an Alias

Add this line to your `~/.bashrc` file:

```bash
alias short='long command here'
```

### Common Examples

```bash
alias ll='ls -la'        # Type 'll' instead of 'ls -la'
alias update='sudo apt update && sudo apt upgrade -y'
```

### Useful Commands

- `alias` - See all your shortcuts
- `unalias short` - Remove a shortcut
- `source ~/.bashrc` - Apply changes after editing the file

**Note:** Be careful not to override important existing commands.

## Root User

- The root user is the superuser with full system access.
- Use `sudo` to run commands with root privileges temporarily.
- By default, the `/etc/sudoers` file controls who can use `sudo`.
- Edit `/etc/sudoers` with `visudo` to avoid syntax errors.

## Environment Variables

Environment variables store important information that your system and programs need to work properly.

### What Are Environment Variables?

They are like labels that hold values (format: `NAME=value`). They tell your computer where to find programs or how to behave.

### Viewing Environment Variables

```bash
printenv        # Show all environment variables
env             # Another way to show all variables
echo $HOME      # Show a specific variable (use $ before the name)
```

### Common Environment Variables

- `PATH`: Folders where Linux looks for programs
- `HOME`: Your home folder (example: `/home/username`)
- `USER`: Your username
- `SHELL`: Your default shell (usually `/bin/bash`)
- `LANG`: Your language settings

### Temporary vs Permanent Variables

**Temporary** (only works until you close the terminal):

```bash
MY_VAR="hello"
```

**Permanent** (stays after restart):

- Add to `~/.bashrc` file

### Making Variables Available to Programs

Use `export` to share a variable with other programs:

```bash
export MY_VAR="hello"
```

Without `export`, only your current shell can see the variable.

To make it permanent, add the `export` line to `~/.bashrc`.

## Customizing Your Command Prompt (PS1)

You can change how your command prompt looks using the `PS1` variable.

Add this to your `~/.bashrc` file:

```bash
export PS1="\u@\h:\w\$ "
```

**Special codes:**

- `\u`: Your username
- `\h`: Computer name
- `\w`: Current folder
- `\$`: Shows `$` for regular users, `#` for root
- `\!`: Command number
- `\d`: Current date

## Command History

### View Previous Commands

```bash
history         # Show all previous commands
```

### Re-run Commands

- `!!` - Run the last command again
- `!42` - Run command number 42 from history
- `Ctrl + R` - Search through your command history

### Where History is Stored

Linux saves your command history in `~/.bash_history`.

### History Settings

- `HISTSIZE`: How many commands to remember (default: 1000)
- `HISTFILESIZE`: Maximum lines in history file (default: 2000)

## Keyboard Shortcuts

| Shortcut   | What it does                |
| ---------- | --------------------------- |
| `Ctrl + C` | Stop the current command    |
| `Ctrl + L` | Clear the screen            |
| `Ctrl + A` | Jump to start of line       |
| `Ctrl + E` | Jump to end of line         |
| `Ctrl + U` | Delete from cursor to start |
| `Ctrl + K` | Delete from cursor to end   |
| `Ctrl + R` | Search command history      |
| `Tab`      | Auto-complete               |
