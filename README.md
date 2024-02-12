# At Dead of Night cheats

Unofficial At Dead of Night game cheats.

[🇷🇺 Читать на русском языке](./README_ru.md)

- [At Dead of Night cheats](#at-dead-of-night-cheats)
  - [Install](#install)
  - [Features](#features)
    - [Radar](#radar)
    - [Items list](#items-list)
    - [WallHack](#wallhack)

## Install

1. Download the latest release from [Releases](https://github.com/AtDeadOfNight/cheats/releases)
2. Unpack `release.zip` to `package.nw` directory in At Dead of Night game's files. You should now have `cheats` directory near other files such as `index.html` and `package.json`
3. Add `<script type="text/javascript" charset="utf-8" src="cheats/connector.js"></script>` line before `</html>` to `package.nw/index.html` file in At Dead of Night game's files
> [!CAUTION]
> Read the 3rd step again, carefully. You may have placed the script line before `<html>` (in start of file).
> You MUST place it before `</html>` — notice the slash. It is the last tag in index.html file. **Not in start of file**
5. Open At Dead of Night, all cheats must apear now
- If you ever want to **disable all cheats**, simply remove `cheats` directory from `package.nw` directory
- If you want to **disable some cheats**, simply navigate to `cheats/connector.js` file, go to the end of the file and find functions invocations like `initRadar()` and others. Prepend every line with cheat you do not want to appear in the game with `//`. For example, if you leave `// initRadar()` in connector.js, Radar will not appear in the game after next launch.

## Common problems

<details>
  <summary>Cheats do not appear</summary>
  
  I've tested these cheats multiple times, multiple people installed it before you and it is definetely not a problem related to your hardware. Either you did something wrong (most likely), or I published broken release (try downloading previous version of cheats in Release tab) or new version of game appeared that broke the cheats.

  You are likely **did 3rd step wrong** by placing `<script type="text/javascript" charset="utf-8" src="cheats/connector.js"></script>` line in the wrong place. index.html has `<html>` and `</html>` tags. You probably placed this line in start of file, near opening html tag (without slash) doctype tag. You must **place it in end of file**, before closing html tag (with slash).
  
</details>

## Features

### Radar

<img width="1452" alt="image" src="https://github.com/AtDeadOfNight/cheats/assets/59040542/2b732440-cf95-458b-bd5a-61c7e6401738">

Minimap that helps you keep track your's and Jimmy's position and sight direction on current floor. Shows friends that are not rescued yet. Shows Jimmy's floor if it's not the same. Shows whether Jimmy is in the same room with you or left.

Controls:
- Press `-` key to make it smaller or hide
- Press `+` key to make it appear or bigger

### Items list

<img width="1399" alt="image" src="https://github.com/AtDeadOfNight/cheats/assets/59040542/74a9469c-6c51-4a8e-92a0-e18cb21fd723">

Shows you list of obtainable items, keys, scrying mirrors and compasses with their locations.

Controls: 
- Press `E` key to show or hide
- Press `K` key to switch between items/keys

### WallHack

Allows you to see Jimmy silhouette through walls.
