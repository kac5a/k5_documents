# K5 Documents

![K5 Skillcheck](https://i.imgur.com/VHvyfqD.png)

This is a **FREE** and **open** Fivem script that lets you and your players create and give out official documents to other players based on their job and rank.

❗❗❗
**This script used Project Error's [fivem-react-boilerplate-lua](https://github.com/project-error/fivem-react-boilerplate-lua) project to create the UI.
Huge thanks for them, and please check out their other projects on [Project Error Discord](https://discord.com/invite/HYwBjTbAY5).**
❗❗❗

## Demo

Watch the demo here: [YouTube](https://www.youtube.com/watch?v=cRgh2nqzROI)

## Help

If you need any help, you can check out my [Discord](https://discord.com/invite/WmANgpdrgZ)

# Download & Installation

### Using Git

```
cd resources

git clone https://github.com/kac5a/k5_documents.git [scripts]/k5_documents
```

### Manually

- Download the latest release from: [https://github.com/kac5a/k5_documents/](https://github.com/kac5a/k5_documents/)

- Put it in your resources directory

### Installation

- Run the included `k5_documents.sql` file on your database

- Add this in your `server.cfg`:

```
ensure k5_documents
```

# Config

There are two config files that you have to check. The first one is in the root folder called `config.lua`. This file contains some translatable texts that show up in the ESX UI.

The other one is located in `web/build/config.js` This JavaScript file contains most of the configuration that you need. In the `AVAILABLE_JOBS` array you have to define the jobs names (storen in your database) that can access the Issued Documents, and Document Templates section.

Only specified grades can access and edit the templates, that is shown in the demo video. These grades can be configurated in the same `config.js` file.

You can also change colors and texts if you scroll down in the config.

## Document logo

You have the ability to add custom logos for documents created by different jobs. You can use a link, or a local file aswell. It is recommended to use local files, so the loading time is minimal for these images. Be sure to format the logo properly:

    {
        job: 'mechanic',
        templateGrades: [4],
        logo: '/web/build/mechaniclogo.jpg',
    }
 
Add your local files in the `web/build/` folder.

## Citizen Documents

These documents are available for everyone without a job restriction. You can edit these templates in the `web/build/config.js` file like this:

    {
        const CITIZEN_TEMPLATES = [
          {
            id: 'citizen_contract',
            documentName: 'My Citizen Contract',
            documnetDescription:
              'This is a document for everyone to use.',
            fields: [
              {
                name: 'Firstname',
                value: '',
              },
              {
                name: 'Lastname',
                value: '',
              },
              {
                name: 'Valid Until',
                value: '',
              },
            ],
            infoName: 'INFORMATION',
            infoTemplate: '',
          },
          {
            id: 'fun_document',
            documentName: 'Totally valid legal document',
            documnetDescription:
              'This is definetly a real document, for real. Like, just look at it',
            fields: [
              {
                name: 'Firstname',
                value: '',
              },
              {
                name: 'Lastname',
                value: '',
              },
              {
                name: 'Valid Until',
                value: '',
              },
            ],
            infoName: 'INFORMATION',
            infoTemplate: 'So this guy is basically robbed me. Arrest him!!!',
          },
        ]
    }

## Server side document creation

You can call the `k5_documents:createServerDocument` server event with a single data parameter. This will create a copy to the specified document and give it to the players "My Documents" table.

### Example to add a vehicle purchase document:

    TriggerServerEvent('k5_documents:createServerDocument', {
        name = "Vehicle Purchase Document",
        description = "This is an official purchase document",
        fields = {
            {
                name = "Firstname",
                value = result.firstname
            },
            {
                name = "Lastname",
                value = result.lastname
            },
            {
                name = "Vehicle Type",
                value = GetDisplayNameFromVehicleModel(GetHashKey(vehicleData.model))
            },
            {
                name = "Plate Number",
                value = generatedPlate
            }
        },
        infoName = "INFORMATION",
        infoValue = "This vehicle was purchased by ".. result.firstname .. " " .. result.lastname .. ".\nThis paper is an official document that proves the original owner of the vehicle.",
        isCopy = true ,
        issuer = {
            firstname = "Simeon",
            lastname = "Yetarian",
            birthDate = "1954. 05. 26.",
            jobName = "Dealership Owner"
        }
    })

### More information can be found in the `server.lua` file.

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
