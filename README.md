# Varinote (Variables in Notes)

Varinote is a plugin for [Obsidian](https://obsidian.md) that allows you to define variables with optional default values inside your Templates. These variables can then be edited through a modal interface when you add a new note that uses this template.

✔️ Create a template.

✔️ Set the variables.

✔️ Reference the variables that you've created in the content of your template.

✔️ Create a note that uses this template or insert the template in an existing note and use the `Varinote` command in your Command Palette. 

![varinote](https://github.com/user-attachments/assets/a6333a93-50a2-4b94-be09-da0996465aaa)

## Usage
* Create a new template, and define your variables using the following syntax:

````markdown
```varinote

variable:: Label|Default

```
````
* Then, call the variables in your template's content using the `{{$variable}}` syntax. 

For example, assuming that you have the following template:

````markdown
```varinote

var_1:: Label 1|Value 1
var_2:: Label 2

```

## My text with variables:

* This is the value of my first variable: {{$var_1}}
* This is the value of the second: {{$var_2}}.

````
When you create a new note that uses this template, you would see the following prompt:

![varinote2](https://github.com/user-attachments/assets/555be312-e131-4c05-a4b1-fcd05b1b1dde)

There, you can set the values for your variables or keep their defaults. Upon save, the Note will be updated. Don't worry, the block that sets the variables will not be carried over to the template, and your note will be clean, containing only the actual content that was intended to display:

![varinote](https://github.com/user-attachments/assets/f0ccab6a-a693-4c0f-a4ce-4c687530b980)

## How to install

1. Downlaod `main.js`, `styles.css`, `manifest.json` files from the latest release page.
2. Create new folder inside your vault's `/.obsidian/plugins/` named  `obsidian-varinote` . If plugins folder doesn't exist, then create it manually. 
3. Move downloaded files into `/obsidian-varinote` folder. 
4. Enable the plugin in ObsidianMD. 

## Feedback and Support

If you encounter any issues or have questions, feel free to reach out via the plugin's [GitHub repository](https://github.com/gsarig/obsidian-varinote/).
