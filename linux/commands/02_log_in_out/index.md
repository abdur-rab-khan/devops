# Logging In and Out

> In Linux, logging in and out of the system can be done through various methods depending on the environment you are using. Below are some common ways to log in and out of a Linux system.

- [Logging In and Out](#logging-in-and-out)
  - [Logging In](#logging-in)
    - [Command Line Interface (CLI)](#command-line-interface-cli)
    - [Remote Login (SSH)](#remote-login-ssh)
  - [Logging Out](#logging-out)
    - [Logging Out with Command Line Interface (CLI)](#logging-out-with-command-line-interface-cli)
    - [Remote Logout (SSH)](#remote-logout-ssh)
  - [Rebooting or Shutting Down](#rebooting-or-shutting-down)
    - [Shutdown Options](#shutdown-options)
      - [Options](#options)

## Logging In

### Command Line Interface (CLI)

1. **Access the terminal**: If you are using a terminal or console, you will see a login prompt.
2. **Enter your username**: Type your username and press Enter.
3. **Enter your password**: Type your password (note that it will not be displayed on the screen) and press Enter to log in.

### Remote Login (SSH)

1. **Open a terminal**: On your local machine, open a terminal application.
2. **Use SSH command**: Type the following command to log in to a remote Linux system:

   ```cli
   ssh username@hostname
   ```

   - Replace `username` with your actual username and `hostname` with the IP address or domain name of the remote system.

3. **Enter your password**: When prompted, enter your password for the remote system and press Enter.

## Logging Out

### Logging Out with Command Line Interface (CLI)

1. **Use the `logout` command**: To log out from a terminal session, simply type:

   ```cli
   logout
   ```

   or you can also use:

   ```cli
   exit
   ```

2. **Press Enter**: This will terminate your session and log you out.

### Remote Logout (SSH)

1. **Use the `exit` command**: To log out from a remote SSH session, type:

   ```cli
   exit
   ```

2. **Press Enter**: This will close the SSH connection and log you out from the remote system.

## Rebooting or Shutting Down

- If you need to log out and also reboot or shut down the system, you can use the following commands:

  - To reboot the system:

    ```cli
    sudo reboot
    ```

  - To shut down the system:

    ```cli
    sudo shutdown now
    ```

- Note: You may need superuser privileges to execute these commands, hence the use of `sudo`.

### Shutdown Options

- You can also schedule a shutdown by specifying a time:

  ```cli
  sudo shutdown [options]
  ```

  This command will shut down the system in 10 minutes. You can replace `+10` with any number of minutes or use `now` for immediate shutdown.

#### Options

- `-r`: Reboot after shutdown.
- `-h`: Halt the system after shutdown. Halt means to stop all CPU functions.
- `+m`: Schedule shutdown in `m` minutes.
- `time`: Specify an exact time for shutdown (e.g., `23:00`).
- `message`: Send a message to all logged-in users before shutdown.
