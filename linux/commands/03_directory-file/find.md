# Find method to search files and directories

## `grep` Command

The `grep` command is used to search for specific patterns within files or input streams.

- **Basic usage**

  ```bash
  grep "pattern" file.txt     # Search for "pattern" in file.txt
  ```

- **Options**

  ```bash
  grep -i "pattern" file.txt   # Case-insensitive search
  grep -r "pattern" /path/     # Recursive search in directory
  grep -v "pattern" file.txt    # Invert match (show lines that do NOT match)
  grep -n "pattern" file.txt    # Show line numbers with matches
  grep -c "pattern" file.txt    # Count occurrences of pattern
  grep -G "pattern" file.txt    # Use basic regular expressions
  grep -E "pattern" file.txt    # Use extended regular expressions
  grep -i -r "pattern" /path/  # Case-insensitive recursive search
  grep -H "pattern" file.txt    # Show filename with matches
  ```

## `find` Command

The `find` command is used to search for files and directories based on various criteria.

- **Basic Syntax**

  ```bash
  find [path] [options] [expression]
  ```

- **By Name:**

  ```bash
  find . -name "filename"              # Find by name
  find . -type d -name "foldername"    # Find folder by name
  ```

- **By Name with Ignoring Case:**

  ```bash
  find . -iname "filename"             # Find by name (case insensitive)
    find . -type d -iname "foldername"   # Find folder by name (case insensitive)
  ```

- **By Size:**

  ```bash
  find . -type f -size +100M    # Files bigger than 100MB
  find . -type f -size -1M      # Files smaller than 1MB
  ```

- **By Date:**

  ```bash
  find . -type f -mtime -7      # Changed in last 7 days
  find . -type f -mtime +30     # Changed more than 30 days ago

  # Example:
  -cmin 60      # Changed in last 60 minutes
  -amin 120    # Accessed in last 120 minutes
  -mmin 30     # Modified in last 30 minutes
  ```

- **By `newer filename`**

  - Find files newer than a specific file

  ```bash
  find . -type f -newer reference.txt    # Find files newer than reference.txt
  ```

- **By `exec`**

  - `exec` allows us to run commands on the found files.

    ```bash
    find . -type f -name "*.log" -exec rm {} \;    # Delete all .log files
    find . -type f -name "*.txt" -exec cp {} /backup/ \;  # Copy all .txt files to /backup/ -> {} means the found file
    find . -type f -name "*.py" -exec mv {} ../newPython/ \;  # Move all .py files to ../newPython/
    ```

- **Tips:**

  - `.` means current folder
  - `~` means home folder
  - `/` means search everywhere
