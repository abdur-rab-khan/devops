# File System in Linux

> File systems in linux describe about how data, where it is located, how it is stored and accessed, It follows a hierarchical structure.

## Types of File Systems

| File System  | Description                                               |
| ------------ | --------------------------------------------------------- |
| **ext4**     | Default Linux file system - stores your files and folders |
| **XFS**      | Fast file system for large files and servers              |
| **Btrfs**    | Modern system with backup snapshots built-in              |
| **FAT32**    | Used in USB drives and SD cards (works everywhere)        |
| **NTFS**     | Windows file system (you can read/write Windows drives)   |
| **exFAT**    | Better than FAT32 for large USB drives and SD cards       |
| **ZFS**      | Advanced system that protects data from corruption        |
| **ReiserFS** | Good for storing many small files quickly                 |
| **JFS**      | IBM's reliable file system for large storage              |
| **HFS+**     | macOS file system (you can read Mac drives)               |
| **UFS**      | BSD Unix file system (rarely used)                        |
| **ISO 9660** | Used for CDs and DVDs                                     |
| **SquashFS** | Compressed system for live USB Linux installations        |

## Disk Partitions

- A disk can be divided into multiple partitions, each can have its own file system.
- Common partition types:
  - **Primary**: Main partitions (up to 4 per disk)
  - **Extended**: Can hold multiple logical partitions
  - **Logical**: Partitions inside an extended partition

## Mounting File Systems

- In Linux, file systems are "mounted" to make them accessible.
- Mount points are directories where the file system is attached.
- Common mount points:
  - `/` : Root file system
  - `/home` : User home directories
  - `/mnt` or `/media` : Temporary mounts for external drives
