# At Dead of Night cheats

Unofficial At Dead of Night game cheats.

- [At Dead of Night cheats](#at-dead-of-night-cheats)
  - [Install](#install)
  - [Radar](#radar)

## Install

1. Download the latest release from [Releases](https://github.com/AtDeadOfNight/cheats/releases)
2. Copy `cheats` to `package.nw` directory in At Dead of Night game's files
3. Add `<script type="text/javascript" charset="utf-8" src="cheats/connector.js"></script>` before `</html>` to `package.nw/index.html` file in At Dead of Night game's files
4. Open At Dead of Night, all cheats must apear now
- If you ever want to **disable all cheats**, simply remove `cheats` directory from `package.nw` directory
- If you want to **disable some cheats**, simply navigate to `cheats/connector.js` file, go to the end of the file and find functions invokatings like `initRadar()` and others. Prepend every line with cheat you do not want to appear in the game with `//`. For example, if you leave `// initRadar()` in connector.js, Radar will not appear in the game after next launch.

## Radar

Minimap that renders in corner of your screen and help you keep track of your and Jimmy's position on current floor.
