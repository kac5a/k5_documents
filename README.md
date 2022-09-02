# K5 Documents

![K5 Skillcheck](https://i.imgur.com/VHvyfqD.png)

This is a **FREE** and **open** Fivem script that lets you and your players create and give out official documents to other players based on their job and rank.

❗❗❗
**This script used Project Error's [fivem-react-boilerplate-lua](https://github.com/project-error/fivem-react-boilerplate-lua) project to create the UI.
Huge thanks for them, and please check out their other projects on [Project Error Discord](https://discord.com/invite/HYwBjTbAY5).**
❗❗❗

## Demo

Watch the demo here: [YouTube](https://www.youtube.com/watch?v=cRgh2nqzROI)

# Download & Installation

### Using Git

```
cd resources

git clone https://github.com/kac5a/k5_documents.git [scripts]/k5_documents
```

### Manually

- Download [https://github.com/kac5a/k5_documents/](https://github.com/kac5a/k5_documents/)

- Put it in your resources directory

### Installation

Add this in your `server.cfg`:

```
ensure k5_documents
```

# Usage

There are two config files that you have to check. The first one is in the root folder called `config.lua`. This file contains some translatable texts that show up in the ESX UI.

The other one is located in `web/build/config.js` This JavaScript file contains most of the configuration that you need. In the `AVAILABLE_JOBS` array you have to define the jobs names (storen in your database) that can access the Issued Documents, and Document Templates section.

Only job bosses can access and edit the templates, that is shown in the demo video.

You can also change colors and texts if you scroll down in the config.

## ⚛ React

If you are a React developer, or you'd like to edit the React parts, you can do that too.
Make sure you delete the current `web/build` folder first.

**Install the node packages:**

    npm install

**To run in developer mode:**

    npm run start:game

Please note, that this will not copy the `config.js` file from `src/public`, you have to manually copy it into the `web/build` folder

**If you're done, delete the `web/build` folder again, and run:**

    npm run build

# Last Words

Feel free to fork this repository and edit the script as much as you'd like. This script is free to use and share. If you find anyone selling this for money, please contact me.
