export function getTemplateFolderPath(): string | null {
	const settingPlugin = (this.app as any).internalPlugins.plugins['templates'];
	if (settingPlugin && settingPlugin.enabled) {
		return settingPlugin.instance.options.folder;
	}
	return null;
}
