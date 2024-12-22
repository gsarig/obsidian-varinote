import {SettingPlugin} from '../types/plugin-settings';

export function getTemplateFolderPath(): string | null {
	const settingPlugin = this.app.internalPlugins.plugins['templates'] as SettingPlugin;
	if (settingPlugin && settingPlugin.enabled) {
		return settingPlugin.instance.options.folder;
	}
	return null;
}
