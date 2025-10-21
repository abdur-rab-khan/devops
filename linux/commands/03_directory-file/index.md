# Working with Folders and Files

> Learn the basic commands to move around and work with folders and files in Linux.

## Table of Contents

- [Working with Folders and Files](#working-with-folders-and-files)
  - [Table of Contents](#table-of-contents)
  - [Moving Around Folders](#moving-around-folders)
    - [Change Directory (`cd`)](#change-directory-cd)
    - [Understanding Paths](#understanding-paths)
  - [Looking Around](#looking-around)
    - [List What's Here (`ls`)](#list-whats-here-ls)
    - [Show as Tree (`tree`)](#show-as-tree-tree)
    - [Where Am I? (`pwd`)](#where-am-i-pwd)
  - [Working with Folders](#working-with-folders)
    - [Create Folders (`mkdir`)](#create-folders-mkdir)
    - [Delete Empty Folders (`rmdir`)](#delete-empty-folders-rmdir)
    - [Delete Any Folder (`rm`)](#delete-any-folder-rm)
  - [Moving and Copying](#moving-and-copying)
    - [Move or Rename (`mv`)](#move-or-rename-mv)
    - [Copy (`cp`)](#copy-cp)
  - [Creating Links](#creating-links)
    - [What Are Links?](#what-are-links)
    - [Hard Links](#hard-links)
    - [Soft Links](#soft-links)
  - [Working with Files](#working-with-files)
    - [Count Things (`wc`)](#count-things-wc)
    - [Show File Content (`cat`)](#show-file-content-cat)
    - [Read Files Comfortably (`less`)](#read-files-comfortably-less)
    - [Show File Start (`head`)](#show-file-start-head)
    - [Show File End (`tail`)](#show-file-end-tail)
    - [Create Empty Files (`touch`)](#create-empty-files-touch)

---

## Moving Around Folders

### Change Directory (`cd`)

Move between folders using these commands:

```bash
cd /path/to/folder     # Go to a specific folder
cd ..                  # Go up one level
cd ~                   # Go to your home folder
cd -                   # Go back to previous folder
cd /                   # Go to the root (top) folder
```

**Advanced:**

```bash
pushd /path/to/folder  # Save current location and move
popd                   # Return to saved location
```

---

### Understanding Paths

**Absolute Path** — Full address from the root:

- Example: `/home/user/documents`

**Relative Path** — Address from where you are now:

- Example: If you're in `/home/user`, then `documents` is the relative path
- Use `cd ../..` to go up two levels

---

## Looking Around

### List What's Here (`ls`)

See what's inside a folder.

**Basic:**

```bash
ls          # Show files and folders
ls -l       # Show details (size, date, owner)
ls -a       # Show hidden files too
ls -h       # Show sizes in KB, MB, GB
ls -R       # Show contents of subfolders too
ls -d */    # Show only folders
```

**Sorting:**

```bash
ls -t       # Sort by date (newest first)
ls -S       # Sort by size (biggest first)
```

**Special:**

```bash
ls -d */    # Show only folders
ls -i       # Show file IDs
ls --full-time  # Show full date/time
ls -l --time-style=long-iso  # Custom date format
```

---

### Show as Tree (`tree`)

See folder structure as a diagram.

```bash
tree             # Show everything as a tree
tree -L 2        # Go only 2 levels deep
tree -a          # Include hidden files
tree -d          # Show only folders
tree -h          # Show file sizes
tree -f          # Show full paths
```

---

### Where Am I? (`pwd`)

Show your current location.

```bash
pwd              # Print current folder path
```

---

## Working with Folders

### Create Folders (`mkdir`)

Make new folders.

```bash
mkdir new_folder                    # Create one folder
mkdir -p path/to/new/folder        # Create nested folders
mkdir -v new_folder                # Show confirmation
```

---

### Delete Empty Folders (`rmdir`)

Remove folders with nothing inside.

```bash
rmdir folder_name       # Delete empty folder
rmdir -v folder_name    # Show confirmation
```

**Note:** Only works if folder is completely empty!

---

### Delete Any Folder (`rm`)

Remove folders even if they have files inside.

```bash
rm -r folder_name       # Delete folder and contents
rm -ri folder_name      # Ask before deleting each file (safer!)
rm -rf folder_name      # Force delete (⚠️ dangerous!)
rm -v folder_name       # Show what's being deleted
```

**Warning:** `rm -rf` deletes without asking — be very careful!

---

## Moving and Copying

### Move or Rename (`mv`)

Move files or change their names.

```bash
mv old.txt new.txt              # Rename a file
mv file.txt /path/to/folder/    # Move to another folder
mv -i file.txt /path/           # Ask before replacing (safer)
mv -v file.txt /path/           # Show what's happening
```

---

### Copy (`cp`)

Make copies of files or folders.

```bash
cp file.txt /path/              # Copy file
cp -r folder/ /path/            # Copy folder and contents
cp -i file.txt /path/           # Ask before replacing
cp -v file.txt /path/           # Show what's happening
cp -p file.txt /path/           # Keep original date/time
```

---

## Creating Links

### What Are Links?

Links let you access the same file from different places.

### Hard Links

**Think of it as:** Multiple names for the same file.

```bash
ln original.txt hardlink.txt
```

**How it works:**

- Both names point to the same actual file
- Changing one changes both
- File only deleted when all links are removed
- Cannot link across different drives
- Cannot link folders

---

### Soft Links

**Think of it as:** A shortcut that points to another file.

```bash
ln -s /path/to/original.txt shortcut.txt
```

**How it works:**

- Points to the location of the original
- If original is deleted, link breaks
- Can link across different drives
- Can link folders
- More flexible

**Why use links?**

- Save disk space
- Access same file from different places
- Create shortcuts
- Organize files without moving them

---

## Working with Files

### Count Things (`wc`)

Count lines, words, and characters.

```bash
wc file.txt         # Show lines, words, and bytes
wc -l file.txt      # Count lines only
wc -w file.txt      # Count words only
wc -c file.txt      # Count bytes only
```

---

### Show File Content (`cat`)

Display or combine files.

```bash
cat file.txt                    # Show file content
cat file1.txt file2.txt        # Show multiple files
cat -n file.txt                # Show with line numbers
cat > new.txt                  # Create file (Ctrl+D to save)
cat >> file.txt                # Add to end of file
```

---

### Read Files Comfortably (`less`)

View files with easy scrolling.

```bash
less file.txt          # Open file for reading
```

**While reading:**

- Arrow keys or `j`/`k` — Move up/down
- `q` — Quit
- `/word` — Search for "word"

**Options:**

```bash
less -N file.txt       # Show line numbers
less -S file.txt       # Don't wrap long lines
less +G file.txt       # Start at end
less +F file.txt       # Follow new lines (for logs)
```

---

### Show File Start (`head`)

See the beginning of a file.

```bash
head file.txt          # Show first 10 lines
head -n 5 file.txt     # Show first 5 lines
head -c 20 file.txt    # Show first 20 bytes
```

---

### Show File End (`tail`)

See the end of a file.

```bash
tail file.txt          # Show last 10 lines
tail -n 5 file.txt     # Show last 5 lines
tail -f file.txt       # Keep showing new lines (for logs)
tail -F file.txt       # Follow even if file is replaced
```

---

### Create Empty Files (`touch`)

Make new empty files or update file times.

```bash
touch file.txt                          # Create empty file
touch -c file.txt                       # Update time only (don't create)
touch -d "2024-06-15 12:30" file.txt   # Set specific date/time
touch -a file.txt                       # Update access time only, it uses current time
touch -m file.txt                       # Update modification time only, it uses current time
touch -t 202406151230 file.txt            # Set date/time in YYYYMMDDhhmm format
```
