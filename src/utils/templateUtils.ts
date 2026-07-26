import {App} from 'obsidian';
import {SettingPlugin} from '../types/plugin-settings';

// The core Templates plugin's config is not part of the public API, so the
// `internalPlugins` access needs a local type.
interface AppWithInternalPlugins extends App {
	internalPlugins: {
		plugins: Record<string, SettingPlugin | undefined>;
	};
}

export function getTemplateFolderPath(app: App): string | null {
	const settingPlugin = (app as AppWithInternalPlugins).internalPlugins.plugins['templates'];
	if (settingPlugin && settingPlugin.enabled) {
		return settingPlugin.instance.options.folder;
	}
	return null;
}
