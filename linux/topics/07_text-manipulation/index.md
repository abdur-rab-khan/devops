# Text Manipulation

- [Text Manipulation](#text-manipulation)
  - [`sed`](#sed)
  - [`awk`](#awk)
  - [File Manipulating Utilities](#file-manipulating-utilities)
  - [Regular Expressions](#regular-expressions)
  - [`strings`](#strings)
  - [`wc`](#wc)
  - [`tr`](#tr)
  - [`tee`](#tee)
  - [`cut`](#cut)
  - [`diff`](#diff)
  - [`file`](#file)

## `sed`

- It helps to perform basic text transformations on an input stream (a file or input from a pipeline).
- Common uses include substitution, deletion, insertion, and text replacement.

  ```bash
  sed 's/old/new/g' file.txt        # Replace 'old' with 'new' globally in each line
  sed -n '2,5p' file.txt            # Print lines 2 to 5
  sed '/pattern/d' file.txt          # Delete lines matching 'pattern'
  sed '3i\New line of text' file.txt  # Insert a new line before line 3
  sed '4a\Appended line of text' file.txt  # Append a new line after line 4
  sed -i 's/old/new/g' file.txt     # Edit file in place (make changes directly to the file)
  sed -e 's/old1/new1/g' -e 's/old2/new2/g' file.txt  # Multiple expressions
  ```

## `awk`

- A powerful programming language for pattern scanning and processing.
- Commonly used for data extraction and reporting.

  ```bash
  awk '{print $1}' file.txt               # Print the first column
  awk -F, '{print $2}' file.csv            # Print the second column from a CSV file
  awk '/pattern/ {print $0}' file.txt      # Print lines matching 'pattern'
  awk '{sum += $1} END {print sum}' file.txt  # Sum the first column
  awk 'NR==3,NR==5 {print $0}' file.txt    # Print lines 3 to 5
  awk '{if ($3 > 50) print $0}' file.txt   # Print lines where the third column is greater than 50
  ```

## File Manipulating Utilities

- Linux provides several command-line utilities like `sort`, `uniq`, `cut`, `paste`, and `tr` for manipulating text files, which are essential for data processing tasks.

1. `sort`

   - Sort lines of text files.

     ```bash
     sort file.txt                      # Sort lines alphabetically
     sort -n file.txt                   # Sort lines numerically
     sort -r file.txt                   # Sort lines in reverse order
     sort -k 2 file.txt                 # Sort by the second column
     sort -u file.txt                   # Sort and remove duplicates
     ```

2. `uniq`

   - Report or omit repeated lines.

     ```bash
     uniq file.txt                     # Remove duplicate lines
     uniq -c file.txt                  # Count occurrences of each line
     uniq -d file.txt                  # Show only duplicate lines
     uniq -u file.txt                  # Show only unique lines
     ```

3. `paste`

   - It is used to merge lines of files horizontally.
   - It combines multiple files into single by using a delimiter (default is tab).
   - **Delimiter** can be:

     - `-d ','` for comma
     - `-d ':'` for colon
     - `-d ' '` for space
     - `-d '\t'` for tab

   - Examples:

     ```bash
     paste file1.txt file2.txt               # Merge files with tab delimiter
     paste -d ',' file1.txt file2.txt        # Merge files with comma delimiter
     paste -s file.txt                       # Merge lines of a single file
     ```

4. `join`

   - Join helps us to combine lines of two files with common field.
   - It join based on first column by default, but we can specify different columns using `-1` and `-2` options.
   - It actually merge two files based on common fields, if common field is not found, that line will be ignored and other lines will be joined.

     ```bash
     join file1.txt file2.txt                 # Join files on first column
     join -1 2 -2 3 file1.txt file2.txt      # Join on 2nd column of file1 and 3rd column of file2
     join -a 1 -a 2 file1.txt file2.txt      # Perform outer join (include all lines)
     ```

5. `split`

   - Split a file into pieces.

     ```bash
     split -l 1000 largefile.txt prefix_     # Split into files with 1000 lines each
     split -b 1M largefile.txt prefix_        # Split into files with 1MB each
     split -d -l 500 largefile.txt prefix_    # Split into files with numeric suffixes
     ```

## Regular Expressions

- Regular expressions (regex or regexp) are sequences of characters that form search patterns.
- They are used for pattern matching within strings, enabling complex search and manipulation tasks in text processing.

  | Syntax | Description                                   | Example                              |
  | ------ | --------------------------------------------- | ------------------------------------ |
  | `.`    | Matches any single character except newline   | `a.c` matches "abc", "a1c", "a-c"    |
  | `*`    | Matches zero or more of the preceding element | `ab*c` matches "ac", "abc", "abbc"   |
  | `+`    | Matches one or more of the preceding element  | `ab+c` matches "abc", "abbc"         |
  | `?`    | Matches zero or one of the preceding element  | `ab?c` matches "ac", "abc"           |
  | `^`    | Matches the start of a line                   | `^abc` matches "abc" at line start   |
  | `$`    | Matches the end of a line                     | `abc$` matches "abc" at line end     |
  | `[]`   | Matches any one character within the brackets | `[aeiou]` matches any vowel          |
  | `\|`   | Logical OR                                    | `cat dog` matches "cat" or "dog"     |
  | `\`    | Escapes a special character                   | `\.` matches a literal dot           |
  | `{}`   | Specifies a range of occurrences              | `a{2,4}` matches "aa", "aaa", "aaaa" |

## `strings`

- Extract printable strings from binary files.

  ```bash
  strings binaryfile.exe          # Extract strings from a binary file
  strings -n 5 binaryfile.exe     # Extract strings with a minimum length of 5
  ```

## `wc`

- Count lines, words, and characters.

  ```bash
  wc file.txt         # Show lines, words, and bytes
  wc -l file.txt      # Count lines only
  wc -w file.txt      # Count words only
  wc -c file.txt      # Count bytes only
  ```

## `tr`

- Translate or delete characters.
- It helps to replace, squeeze, or remove specific characters from input.

  ```bash
  tr 'a-z' 'A-Z' < file.txt          # Convert lowercase to uppercase
  tr -d 'abcd' < file.txt              # Delete characters a, b, c, d
  tr -s ' ' < file.txt                 # Squeeze multiple spaces into one
  tr ' ' '\n' < file.txt               # Replace spaces with newlines
  tr -s '\n' ' ' < file.txt                # Squeeze multiple newlines into one
  ```

## `tee`

- Read from standard input and write to standard output and files.
- It is useful for logging output while still displaying it on the terminal.
- It is similar to redirection (`>`), but it also outputs to the terminal.

  ```bash
  command | tee output.txt               # Write output to file and display
  command | tee -a output.txt            # Append output to file and display
  ```

## `cut`

- Remove sections from each line of files.
- It is commonly used to extract specific columns or fields from text files.

  ```bash
  cut -d',' -f1 file.csv               # Extract first column from CSV
  cut -c1-5 file.txt                   # Extract first 5 characters of each line
  cut -f2 file.txt                     # Extract second tab-delimited field
  cut -d' ' -f1-3 file.txt             # Extract first 3 space
  cut -d',' -f2-4 file.csv             # Extract columns 2 to 4 from CSV
  ```

## `diff`

- Compare files line by line.
- It helps to identify differences between two files.

  ```bash
  diff file1.txt file2.txt               # Show differences between two files
  diff -u file1.txt file2.txt            # Show unified diff format
  diff -c file1.txt file2.txt            # Show context diff format
  diff -i file1.txt file2.txt            # Ignore case differences
  diff -w file1.txt file2.txt            # Ignore all whitespace differences
  ```

## `file`

- Determine the type of a file.
- It examines the file's content and provides information about its format.

  ```bash
  file filename.txt            # Determine the file type
  file /bin/ls                 # Check the type of a binary file
  file *.jpg                  # Check types of multiple files
  ```
