import {SettingPlugin} from '../types/plugin-settings';

export function getTemplateFolderPath(): string | null {
	const settingPlugin = (this.app as any).internalPlugins.plugins['templates'] as SettingPlugin;
	if (settingPlugin && settingPlugin.enabled) {
		return settingPlugin.instance.options.folder;
	}
	return null;
}
