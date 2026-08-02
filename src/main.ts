import { App, Editor, Plugin, PluginSettingTab, Setting } from "obsidian";
import { EditorView, keymap } from "@codemirror/view";

interface ScrollControlSettings {
	useBuiltInKeymap: boolean;
}

const DEFAULT_SETTINGS: ScrollControlSettings = {
	useBuiltInKeymap: true,
};

function scrollByLine(view: EditorView, direction: number): void {
	view.scrollDOM.scrollBy({ top: view.defaultLineHeight * direction });
}

export default class ScrollControlPlugin extends Plugin {
	settings: ScrollControlSettings = DEFAULT_SETTINGS;

	async onload() {
		await this.loadSettings();

		// A CM6 keymap handles Ctrl+Up/Down directly, which is what makes the
		// scroll repeat while the key is held. Returning false when the setting
		// is off lets the keypress fall through to Obsidian's own handling.
		this.registerEditorExtension(keymap.of([
			{
				key: "Ctrl-ArrowUp",
				run: (view) => this.runBuiltInScroll(view, -1),
			},
			{
				key: "Ctrl-ArrowDown",
				run: (view) => this.runBuiltInScroll(view, 1),
			},
		]));

		// Commands for the command palette and user-assigned hotkeys
		this.addCommand({
			id: "scroll-line-up",
			name: "Scroll line up",
			editorCallback: (editor: Editor) => this.scrollEditor(editor, -1),
		});

		this.addCommand({
			id: "scroll-line-down",
			name: "Scroll line down",
			editorCallback: (editor: Editor) => this.scrollEditor(editor, 1),
		});

		this.addSettingTab(new ScrollControlSettingTab(this.app, this));
	}

	private runBuiltInScroll(view: EditorView, direction: number): boolean {
		if (!this.settings.useBuiltInKeymap) return false;
		scrollByLine(view, direction);
		return true;
	}

	private scrollEditor(editor: Editor, direction: number): void {
		// Obsidian exposes the underlying EditorView as `cm`, but it is not part
		// of the public Editor type.
		const cm = (editor as unknown as { cm?: EditorView }).cm;
		if (cm) scrollByLine(cm, direction);
	}

	async loadSettings() {
		const stored = await this.loadData() as Partial<ScrollControlSettings> | null;
		this.settings = { ...DEFAULT_SETTINGS, ...stored };
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class ScrollControlSettingTab extends PluginSettingTab {
	plugin: ScrollControlPlugin;

	constructor(app: App, plugin: ScrollControlPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl)
			.setName("Use built-in Ctrl+Up/Down")
			.setDesc(
				"Bind Ctrl+Up and Ctrl+Down in the editor, with repeat while the key is held. " +
				"Turn this off to use only the hotkeys you assign under Settings > Hotkeys."
			)
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.useBuiltInKeymap)
					.onChange(async (value) => {
						this.plugin.settings.useBuiltInKeymap = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
