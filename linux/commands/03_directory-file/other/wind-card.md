# Wildcards and Matching File Names

> Wildcards are special characters that help you match multiple files or patterns.

## Common Wildcards

| Wildcard | Description                                       | Example          | Matches                          |
| -------- | ------------------------------------------------- | ---------------- | -------------------------------- |
| `*`      | Matches any number of characters (including none) | `*.txt`          | `file.txt`, `notes.txt`, `a.txt` |
| `?`      | Matches exactly one character                     | `file?.txt`      | `file1.txt`, `fileA.txt`         |
| `[]`     | Matches any one character inside the brackets     | `file[12].txt`   | `file1.txt`, `file2.txt`         |
| `[^]`    | Matches any one character not inside the brackets | `file[^0-9].txt` | `fileA.txt`, `file_.txt`         |

## Using Wildcards

### List Files

```bash
ls *.txt            # List all .txt files
ls file?.txt       # List files like file1.txt, fileA.txt
ls file[12].txt    # List file1.txt and file2.txt
ls file[^0-9].txt  # List files not ending with a digit
```

### Copy Files

```bash
cp *.txt backup/    # Copy all .txt files to backup folder
cp file?.txt backup/ # Copy files like file1.txt, fileA.txt to backup
```

### Move Files

```bash
mv *.log archive/    # Move all .log files to archive folder
mv file[12].log archive/ # Move file1.log and file2.log to archive
```

### Delete Files

```bash
rm *.tmp            # Delete all .tmp files
rm file?.tmp       # Delete files like file1.tmp, fileA.tmp
```

### Find Files

```bash
find . -name "*.txt"          # Find all .txt files
find . -name "file?.txt"      # Find files like file1.txt, file
```

### Search Inside Files

```bash
grep "search_term" *.txt      # Search for term in all .txt files
grep "search_term" file?.txt   # Search for term in files like file1.txt, fileA.txt
```
