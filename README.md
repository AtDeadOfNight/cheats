# At Dead of Night cheats

Unofficial At Dead of Night game cheats.

[🇷🇺 Читать на русском языке](./README_ru.md)

- [At Dead of Night cheats](#at-dead-of-night-cheats)
  - [Install](#install)
  - [Features](#features)
    - [Radar](#radar)

## Install

1. Download the latest release from [Releases](https://github.com/AtDeadOfNight/cheats/releases)
2. Unpack `release.zip` to `package.nw` directory in At Dead of Night game's files. You should now have `cheats` directory near other files such as `index.html` and `package.json`
3. Add `<script type="text/javascript" charset="utf-8" src="cheats/connector.js"></script>` line before `</html>` to `package.nw/index.html` file in At Dead of Night game's files
4. Open At Dead of Night, all cheats must apear now
- If you ever want to **disable all cheats**, simply remove `cheats` directory from `package.nw` directory
- If you want to **disable some cheats**, simply navigate to `cheats/connector.js` file, go to the end of the file and find functions invocations like `initRadar()` and others. Prepend every line with cheat you do not want to appear in the game with `//`. For example, if you leave `// initRadar()` in connector.js, Radar will not appear in the game after next launch.

## Features

### Radar

<img width="1452" alt="image" src="https://github.com/AtDeadOfNight/cheats/assets/59040542/2b732440-cf95-458b-bd5a-61c7e6401738">

Minimap that helps you keep track your's and Jimmy's position on current floor.

Controls:
Press `-` key to make it smaller or hide
Press `+` key to make it appear or bigger