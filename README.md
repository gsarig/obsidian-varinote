# Varinote

Varinote is a plugin for [Obsidian](https://obsidian.md) that allows you to define custom properties with optional default values inside your notes. These properties can then be edited through a modal interface.

![varinote](https://github.com/user-attachments/assets/75687446-d8ac-496c-a8f2-e78117868472)

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

my_first_variable:: Label of the first variable|Default value for first variable
my_second_variable:: Label of the second variable

```

## My text with variables:

* This is the value of my first variable: {{$my_first_variable}}
* This is the value of the second: {{$my_second_variable}}.

````
When you create a new note that uses this template, you would see the following prompt:

![image](https://github.com/user-attachments/assets/e8aa6227-da59-4376-84fb-d6120ce647b4)

There, you can set the values for your variables or keep their defaults. Upon save, the Note will be updated. Don't worry, the block that sets the variables will not be carried over to the template:

![image](https://github.com/user-attachments/assets/cdc4a6af-9ac5-4997-9546-502c6040c699)


## How to install

1. Downlaod `main.js`, `styles.css`, `manifest.json` files from the latest release page.
2. Creane new folder inside `VaultFolder/.obsidian/plugins/` named  `obsidian-varinote` . If plugins folder doesn't exist, then create it manually. 
3. Move downloaded files into `/obsidian-varinote` folder. 
4. Enable the plugin in ObsidianMD. 

## Feedback and Support

If you encounter any issues or have questions, feel free to reach out via the plugin's [GitHub repository](https://github.com/gsarig/obsidian-varinote/).
