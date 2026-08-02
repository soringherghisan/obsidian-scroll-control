# Scroll Control

Scroll one line at a time with **Ctrl+Up/Down**, just like in VSCode, Notepad++, Sublime Text, and other code editors.

That's it. One job, done right.

## What it does

In most code editors, `Ctrl+Up` and `Ctrl+Down` scroll the viewport by one line without moving the cursor. Obsidian doesn't have this by default. This plugin adds it.

| Shortcut | Action |
|---|---|
| `Ctrl+Up` | Scroll viewport up by one line |
| `Ctrl+Down` | Scroll viewport down by one line |

The cursor stays where it is. Only the view moves.

## Installation

### From Obsidian Community Plugins (recommended)

1. Open **Settings** > **Community plugins** > **Browse**
2. Search for **Scroll Control**
3. Click **Install**, then **Enable**

### Manual installation

1. Download `main.js`, `manifest.json`, and `styles.css` from the [latest release](https://github.com/soringherghisan/obsidian-scroll-control/releases/latest)
2. Create a folder `scroll-control` inside your vault's `.obsidian/plugins/` directory
3. Place the downloaded files in that folder
4. Restart Obsidian and enable the plugin under **Settings** > **Community plugins**

## Customizing hotkeys

`Ctrl+Up` and `Ctrl+Down` are bound inside the editor itself, which is what lets the
scroll repeat while you hold the key down.

If you would rather use different keys, open **Settings** > **Scroll Control** and turn
off **Use built-in Ctrl+Up/Down**. Then go to **Settings** > **Hotkeys**, search for
"Scroll Control", and assign whatever you like to the two commands:

- **Scroll Control: Scroll line up**
- **Scroll Control: Scroll line down**

Both commands are always available in the command palette, whether the built-in
binding is on or off.

## Development

```bash
# Clone the repo
git clone https://github.com/soringherghisan/obsidian-scroll-control.git
cd obsidian-scroll-control

# Install dependencies
npm install

# Build for development (watches for changes)
npm run dev

# Build for production
npm run build
```

To test locally, symlink or copy the repo into your vault's `.obsidian/plugins/scroll-control/` directory.

## License

[MIT](LICENSE)
