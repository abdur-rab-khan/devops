# BASH SCRIPT

> Bash Script file contains the **linux** commands in a single file to automate tasks. It help to run multiple commands at once.

- [BASH SCRIPT](#bash-script)
  - [First Script](#first-script)
  - [Important Things of Bash Script](#important-things-of-bash-script)
    - [1. Variables](#1-variables)
    - [2. Loops](#2-loops)
    - [3. Writing Output](#3-writing-output)
    - [4. Conditional Statements](#4-conditional-statements)
    - [5. Functions](#5-functions)
    - [6. Comments](#6-comments)

## First Script

- Creating a bash script file with `.sh` extension, it also works without extension.
- To make the file executable use command `chmod +x filename.sh`, which tells the system that this file is a program and can be executed.

  ```bash
  echo "=================== ANALYSING LOGS FILES =================== "

  find . -name "*.log" -mtime -1

  grep "ERROR" application.log
  grep -c "ERROR" application.log
  grep -c "FATAL" application.log

  grep -c "FATAL" system.log
  grep -c "CRITICAL" system.log
  grep "CRITICAL" system.log
  ```

- To identify about the script interpreter, use shebang `#!/bin/bash` at the top of the script file.

  - `#!` is called shebang followed by the path of the interpreter.
  - `/bin/bash` is the path of the bash interpreter, it could be any other interpreters like:

    - `/bin/sh` - for sh shell
    - `/usr/bin/python3` - for python3 interpreter
    - `/usr/bin/perl` - for perl interpreter

```bash
#!/bin/bash
```

## Important Things of Bash Script

### 1. Variables

- Variables are used to store data, which can be used later in the script.
- Variables can also use to store the output of commands using command substitution `$(command)`.

  ```bash
  #!/bin/bash

  PATH="/var/logs"
  FILENAME="application.log"

  CURRENT_FILES=$(ls $PATH)

  echo "Current files in $PATH:"
  echo "$CURRENT_FILES"

  echo "List of log files in $PATH updated last 24 hours:"
  find $PATH -name "*.log" -mtime -1

  echo "Searching for ERROR in $FILENAME:"
  grep "ERROR" "$PATH/$FILENAME"
  ```

- **Note:** In bash, no space are allowed around the equal sign `=`, like:

  ```bash
  VARIABLE=value    # ✅ Correct
  VARIABLE = value  # ❌ Incorrect
  ```

- **ARRAY**

  - Array is a collection of variables, which can store multiple values in a single variable.

    ```bash
    #!/bin/bash

    ERROR_PATTERNS=("ERROR" "FATAL" "CRITICAL")
    ```

  - Accessing array elements using index:

    ```bash
    grep "${ERROR_PATTERNS[0]}" application.log  # Searches for "ERROR"
    grep "${ERROR_PATTERNS[1]}" application.log  # Searches for "FATAL"
    grep "${ERROR_PATTERNS[2]}" application.log  # Searches for "CRITICAL"
    ```

  - **NOTE:** Unlike programming languages, instead of `,` bash use ` ` (space) for separation.

### 2. Loops

- Loops are used to execute a block of code multiple times.
- It can works on a list like ("file", "array" or "command output").

- **Syntax:**

  ```bash
  for VARIABLE in LIST
  do
      # Commands to be executed
  done
  ```

- **Example:**

  ```bash
  #!/bin/bash
  LATEST_FILES=$(ls -t /var/logs/*.log | head -5)

  for FILE in $LATEST_FILES
  do
      echo "Processing file: $FILE"
      grep "ERROR" "$FILE"
  done

  # OR
  for FILE in $LATEST_FILES; do
      echo "Processing file: $FILE"
      grep "ERROR" "$FILE"
  done
  ```

- Looping through range of numbers using `seq` command:

  ```bash
  #!/bin/bash

  for i in $(seq 1 5); do
      echo "Iteration number: $i"
  done
  ```

  - More concise way using brace expansion:

    ```bash
    #!/bin/bash

    for i in {1..5}; do
        echo "Iteration number: $i"
    done
    ```

    - For making increments other than 1:

      - `{START..END..INCREMENT}`

        - Example: `{1..10..2}` will generate `1 3 5 7 9`

      - `{seq START INCREMENT END}`

        - Example: `$(seq 1 2 10)` will generate `1 3 5 7 9`

  - **Example with ARRAY:**

    ```bash
    #!/bin/bash
    PATTERNS=("ERROR" "FATAL" "CRITICAL")

    for P in "${PATTERNS[@]}"; do
        echo -e "\nCurrent pattern $P"
    done
    ```

  - **ARRAY EXPANSION**

    - `"${PATTERNS[@]}"` - All array elements as separate strings
    - `${PATTERNS[*]}` - All elements as a single string
    - `${PATTERNS[0]}` - First element only
    - `${#PATTERNS[@]}` - Number of elements
    - `${PATTERNS[index]}` - Element at specific index

  - To merge two or more arrays:

    ```bash
    ARRAY1=("one" "two" "three")
    ARRAY2=("four" "five" "six")

    MERGED_ARRAY=("${ARRAY1[@]}" "${ARRAY2[@]}")

    echo "Merged Array: ${MERGED_ARRAY[@]}"
    ```

  - **NOTE:** Use double quotes `"` around `${PATTERNS[@]}` to preserve any spaces in the array elements.

### 3. Writing Output

- Use `echo` command to write output to the terminal or to a file.
- To write output to a file, use redirection operator `>` or `>>`.

  - `>` - Overwrite the file
  - `>>` - Append to the file

    ```bash
    #!/bin/bash

    echo "Log Analysis Report" > report.txt
    echo "===================" >> report.txt

    ERROR_COUNT=$(grep -c "ERROR" application.log)
    FATAL_COUNT=$(grep -c "FATAL" application.log)

    echo "Number of ERRORs: $ERROR_COUNT" >> report.txt
    echo "Number of FATALs: $FATAL_COUNT" >> report.txt
    ```

- **Important Options of `echo`**

  - `-n` - Do not print the trailing newline
  - `-e` - Enable interpretation of backslash escapes

    - `\n` - New line
    - `\t` - Tab
    - `\\` - Backslash
    - `\"` - Double quote

### 4. Conditional Statements

- Conditional statements are used to execute a block of code based on a condition.

- **Syntax:**

  ```bash
  if CONDITION; then
      # Commands to be executed if condition is true
  elif ANOTHER_CONDITION; then
      # Commands to be executed if another condition is true
  else
      # Commands to be executed if all conditions are false
  fi
  ```

- **Key concepts of conditions**

  - Use `[` and `]` or `[[` and `]]` for test conditions.
  - Common operators:

    - `-eq` - Equal
    - `-ne` - Not equal
    - `-lt` - Less than
    - `-le` - Less than or equal
    - `-gt` - Greater than
    - `-ge` - Greater than or equal
    - `-z` - String is null (length is zero)
    - `-n` - String is not null (length is greater than zero)
    - `==` or `=` - String equality
    - `!=` - String inequality

  - Logical operators:

    - `&&` - AND
    - `||` - OR
    - `!` - NOT

- **Example:**

  ```bash
  #!/bin/bash

  LOG_FILE="application.log"

  if [ -f "$LOG_FILE" ]; then
      echo "Log file exists: $LOG_FILE"
  else
      echo "Log file not found: $LOG_FILE"
  fi
  ```

  - More complex example with `elif`:

    ```bash
    #!/bin/bash

    DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')

    if [ $DISK_USAGE -ge 90 ]; then
        echo "CRITICAL: Disk usage is at ${DISK_USAGE}%"
    elif [ $DISK_USAGE -ge 70 ]; then
        echo "WARNING: Disk usage is at ${DISK_USAGE}%"
    else
        echo "OK: Disk usage is at ${DISK_USAGE}%"
    fi
    ```

  - Nested conditions:

    ```bash
    #!/bin/bash

    SERVICE_STATUS=$(systemctl is-active nginx)
    PORT_OPEN=$(netstat -tuln | grep -c ":80")

    if [ "$SERVICE_STATUS" == "active" ]; then
        if [ $PORT_OPEN -gt 0 ]; then
            echo "Service is running and port 80 is open."
        else
            echo "Service is running but port 80 is not listening."
        fi
    else
        echo "Service is not running."
    fi
    ```

### 5. Functions

- Functions are used to group a set of commands into a single unit, which can be called multiple times in the script.

- **Syntax:**

  ```bash
  function_name() {
      # Commands to be executed
  }
  ```

- **Example:**

  ```bash
  #!/bin/bash

  # Function to check server health
  check_server_health() {
      SERVER=$1
      echo "Checking health of server: $SERVER"

      if ping -c 1 "$SERVER" &> /dev/null; then
          echo "✓ Server $SERVER is reachable"
          return 0
      else
          echo "✗ Server $SERVER is not reachable"
          return 1
      fi
  }

  # Function to analyze log file for critical errors
  analyze_critical_errors() {
      LOG_FILE=$1
      THRESHOLD=$2

      echo "Analyzing $LOG_FILE for critical errors..."
      ERROR_COUNT=$(grep -c "ERROR" "$LOG_FILE" 2>/dev/null || echo 0)
      CRITICAL_COUNT=$(grep -c "CRITICAL" "$LOG_FILE" 2>/dev/null || echo 0)

      TOTAL=$((ERROR_COUNT + CRITICAL_COUNT))

      if [ $TOTAL -ge $THRESHOLD ]; then
          echo "⚠ ALERT: Found $TOTAL critical issues in $LOG_FILE"
          echo "  - Errors: $ERROR_COUNT"
          echo "  - Critical: $CRITICAL_COUNT"
          return 1
      else
          echo "✓ Log file $LOG_FILE looks healthy ($TOTAL issues)"
          return 0
      fi
  }

  # Function to backup database
  backup_database() {
      DB_NAME=$1
      BACKUP_DIR="/backup/databases"
      TIMESTAMP=$(date +%Y%m%d_%H%M%S)

      mkdir -p "$BACKUP_DIR"
      echo "Starting backup of database: $DB_NAME"

      if mysqldump "$DB_NAME" > "$BACKUP_DIR/${DB_NAME}_${TIMESTAMP}.sql"; then
          echo "✓ Database backup completed: ${DB_NAME}_${TIMESTAMP}.sql"
      else
          echo "✗ Database backup failed for $DB_NAME"
      fi
  }
  ```

  - Calling the functions in a real-world monitoring script:

    ```bash
    #!/bin/bash

    # Check multiple servers
    check_server_health "192.168.1.10"
    check_server_health "web-server.example.com"

    # Analyze production logs
    analyze_critical_errors "/var/log/nginx/error.log" 50
    analyze_critical_errors "/var/log/app/production.log" 100

    # Perform nightly database backup
    backup_database "ecommerce_db"
    backup_database "user_analytics_db"
    ```

- **`$N`** - Positional parameters to access function arguments, where `$1` is the first argument, `$2` is the second argument, and so on.

### 6. Comments

- Comments are used to explain the code and make it more readable.
- In bash, comments start with `#` symbol.
- Anything after `#` on the same line is considered a comment and ignored by the interpreter.

  ```bash
  # This is a comment
  echo "Hello, World!"  # This prints Hello, World! to the terminal
  ```
