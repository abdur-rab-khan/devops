# File Streams or File Descriptors

> In Linux, every file or input/output resource is represented by a file stream (or file descriptor). These are essentially references that the operating system uses to manage access to files and devices.

- [File Streams or File Descriptors](#file-streams-or-file-descriptors)
  - [Standard File Streams `stdin`, `stdout`, `stderr`](#standard-file-streams-stdin-stdout-stderr)
  - [Redirecting File Streams](#redirecting-file-streams)
    - [Redirect Standard Input (`stdin`)](#redirect-standard-input-stdin)
    - [Redirect Standard Output (`stdout`)](#redirect-standard-output-stdout)
    - [Redirect Standard Error (`stderr`)](#redirect-standard-error-stderr)
    - [Redirect Both `stdout` and `stderr`](#redirect-both-stdout-and-stderr)
  - [`|` (Pipe) Operator](#-pipe-operator)
  - [`echo` Command](#echo-command)
  - [`read` Command](#read-command)

## Standard File Streams `stdin`, `stdout`, `stderr`

There are three standard file streams:

| Stream       | Description                         | Default Source/Destination |
| ------------ | ----------------------------------- | -------------------------- |
| `stdin` (0)  | Standard Input                      | Keyboard                   |
| `stdout` (1) | Standard Output                     | Terminal Screen            |
| `stderr` (2) | Standard Error (for error messages) | Terminal Screen            |

- `stdin` is used to read input data (e.g., from keyboard or a file).
- `stdout` is used to output regular data (e.g., results of commands).
- `stderr` is used to output error messages.

## Redirecting File Streams

You can redirect these streams to files or other commands.

### Redirect Standard Input (`stdin`)

```bash
command < input.txt          # Redirect stdin from a file
command << EOF               # Here document (multi-line input)

# Example:
cat < input.txt              # Read input from a file
```

### Redirect Standard Output (`stdout`)

```bash
command > output.txt        # Redirect stdout to a file (overwrite)
command >> output.txt       # Redirect stdout to a file (append)

# Example:
ls -l > files.txt           # Save directory listing to a file
ls -l >> files.txt          # Append directory listing to a file
```

### Redirect Standard Error (`stderr`)

```bash
command 2> error.txt        # Redirect stderr to a file (overwrite)
command 2>> error.txt       # Redirect stderr to a file (append)

# Example:
ls /nonexistent 2> error.txt   # Save error message to a file
ls /nonexistent 2>> error.txt  # Append error message to a file
```

### Redirect Both `stdout` and `stderr`

```bash
command > all_output.txt 2>&1    # Redirect both stdout and stderr to a file
command &> all_output.txt         # Redirect both stdout and stderr to a file (bash shorthand )

# Add on different files
command > output.txt 2> error.txt
```

## `|` (Pipe) Operator

- The pipe operator `|` takes the `stdout` of one command and feeds it as `stdin` to another command.

- It is used to chain commands together. Once a command is executed, its output can be directly used as input for the next command.

- It is very efficient for processing data streams without creating intermediate files.

  ```bash
  command1 | command2
  ```

- **Example:**

  ```bash
  ls -l | grep "txt"
  ```

This lists all files and then filters the output to show only those containing "txt".

## `echo` Command

The `echo` command is used to display a line of text or a variable value.

- **Basic usage**

  ```bash
  echo "Hello, World!"      # Display text
  echo $VARIABLE             # Display variable value
  ```

- **Options**

  ```bash
  echo -n "No newline"       # Do not append a newline at the end
  echo -e "Line1\nLine2"     # Enable interpretation of backslash escapes
  ```

## `read` Command

The `read` command is used to take input from the user or from a file and store it in a variable.

- **Basic usage**

  ```bash
  read VARIABLE               # Read input into VARIABLE
  ```
