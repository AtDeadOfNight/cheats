# At Dead of Night cheats

Unofficial At Dead of Night game cheats.

- [At Dead of Night cheats](#at-dead-of-night-cheats)
  - [Install](#install)
  - [Help! I'm running ADON on virtual machine](#help-im-running-adon-on-virtual-machine)
  - [Radar](#radar)

## Install

1. Clone repository
2. Copy `cheats-connector.js` file to package.nw directory in At Dead of Night game's files
3. Add `<script type="text/javascript" charset="utf-8" src="cheats-connector.js"></script>` before `</html>` to `package.nw/index.html` file in At Dead of Night game's files
4. Install dependencies for this project: `npm install` (first you must install npm using [nvm](https://nvm.sh))
5. Build this project: `npm run build`
6. Run this project: `npm run start`
7. Open At Dead of Night, all cheats must apear now
8. If you ever want to disable cheats, simply remove `cheats-connector.js` file from package.nw directory

## Help! I'm running ADON on virtual machine

In that case you want to modify `cheats-connector.js` by simply replacing all `localhost` occurencies with your host's IP address which can be found in your local network settings. It will look like `192.168.0.xxx`

## Radar

Minimap that renders in corner of your screen and help you keep track of your and Jimmy's position on current floor.
