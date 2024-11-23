# Varinote

Varinote is a plugin for [Obsidian](https://obsidian.md) that allows you to define custom properties with optional default values inside your notes. These properties can then be edited through a modal interface.

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




## How to Use

1. **Install the Plugin**:
   - Go to Obsidian's settings and navigate to the "Community plugins" section.
   - Turn off "Safe mode" if it is on.
   - Click on "Browse" and search for **Varinote**.
   - Click on "Install" and then "Enable".

2. **Define Properties in Your Notes**:
   - Use the `varinote` code block to define properties and optional default values in any note.

3. **Edit Properties via Modal**:
   - Open or edit a note with the `varinote` block. A modal will appear automatically, allowing you to edit the property values.

## Feedback and Support

If you encounter any issues or have questions, feel free to reach out via the plugin's [GitHub repository](https://github.com/your-repo/varinote).

## Funding

You can support the continued development of this plugin through the following channels:
- [Buy Me a Coffee](https://buymeacoffee.com)
- [GitHub Sponsor](https://github.com/sponsors)
- [Patreon](https://www.patreon.com/)

