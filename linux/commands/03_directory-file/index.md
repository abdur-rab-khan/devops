# Directory and File Commands

> Navigating the filesystem is a fundamental skill in Linux. Here are some essential commands for directory navigation:

- [Directory and File Commands](#directory-and-file-commands)
  - [Change Directory (`cd`): Move between directories.](#change-directory-cd-move-between-directories)
  - [Absolute vs Relative Paths](#absolute-vs-relative-paths)
  - [Exploring FileSystem](#exploring-filesystem)
  - [Hard Links vs Soft Links](#hard-links-vs-soft-links)
    - [Hard Links](#hard-links)
      - [Example of Creating a Hard Link](#example-of-creating-a-hard-link)
    - [Soft Links (Symbolic Links)](#soft-links-symbolic-links)
      - [Example of Creating a Soft Link](#example-of-creating-a-soft-link)
      - [What is the use of Links?](#what-is-the-use-of-links)

## Change Directory (`cd`): Move between directories.

- `cd /path/to/directory`: Change to the specified directory.
- `cd ..`: Move up one directory level.
- `cd ~` or `cd $HOME`: Go to your home directory.
- `cd -`: Switch to the previous directory you were in.
- `cd /`: Go to the root directory.
- `pushd /path/to/directory`: Save the current directory on a stack and change to the specified directory.
- `popd`: Return to the directory at the top of the stack.

## Absolute vs Relative Paths

- **Absolute Path**: The full path from the root directory (e.g., `/home/user/documents`).

- **Relative Path**: The path relative to the current directory (e.g. if we are in `/home/user`, then `documents` than we can go to `/` by using `cd ../..` )

## Exploring FileSystem

- `ls`: List files and directories in the current directory.

  - `ls -l`: List with detailed information (permissions, owner, size, modification date).
  - `ls -a`: List all files, including hidden files.
  - `ls -h`: Human-readable file sizes.
  - `ls -R`: Recursively list subdirectories.
  - `ls -t`: Sort by modification time.
  - `ls -S`: Sort by file size.
  - `ls -i`: Show inode numbers.
  - `ls -d */`: List only directories.

- `tree`: Display directory structure in a tree-like format (may need to install).

  - `tree -L n`: Limit the display to `n` levels deep.
  - `tree -a`: Include hidden files in the display.
  - `tree -d`: List directories only.
  - `tree -h`: Show file sizes in a human-readable format.
  - `tree -f`: Print the full path prefix for each file.

- `pwd`: Print the current working directory.
- `find`: Search for files and directories.

  - Example: `find /path/to/search -name "filename"` to find a file by name.
  - Example: `find . -type d -name "dirname"` to find a directory by name in the current directory.
  - Example: `find /path/to/search -type f -size +100M` to find files larger than 100MB.
  - Example: `find /path/to/search -type f -mtime -7` to find files modified in the last 7 days.
  - Example: `find /path/to/search -type f -perm 644` to find files with specific permissions.
  - Example: `find /path/to/search -type f -exec grep -l "search_string" {} +` to find files containing a specific string.
  - Example: `find /path/to/search -type f -delete` to delete files found (use with caution).
  - Example: `find /path/to/search -type f -exec chmod 644 {} +` to change permissions of found files.

## Hard Links vs Soft Links

### Hard Links

- A hard link is a direct reference to the physical data on the disk.
- Multiple hard links can point to the same inode (data block).
- Deleting one hard link does not affect the others; the data remains until all hard links are deleted.
- Hard links cannot span different filesystems.

#### Example of Creating a Hard Link

```shell
ln original_file.txt hard_link.txt
```

- Here both `original_file.txt` and `hard_link.txt` point to the same data on the disk.
- Modifying one will reflect in the other.

### Soft Links (Symbolic Links)

- A soft link is a reference that points to another file or directory by its path.
- Soft links can span different filesystems.
- If the original file is deleted, the soft link becomes broken (dangling link).
- Soft links can link to directories.
- Soft links have their own inode.

#### Example of Creating a Soft Link

```shell
ln -s /path/to/original_file.txt soft_link.txt
```

- Here, `soft_link.txt` points to the path of `original_file.txt`.
- If `original_file.txt` is deleted, `soft_link.txt` will no longer work.
- Modifying the original file will reflect in the soft link as it points to the same data.

#### What is the use of Links?

- Links (both hard and soft) provide flexibility in file management.
- They allow multiple references to the same data without duplicating it.
- They help in organizing files and directories efficiently.
- They can be used to create shortcuts or aliases for frequently accessed files or directories.
- They facilitate easier file sharing and collaboration by providing multiple access points to the same data.
