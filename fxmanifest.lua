fx_version "cerulean"

description "A better document management script"
author "K5 Scripts"
version '1.2.0'
update "ESX import change, added different logo options for jobs, custom CSS options"
repository 'https://github.com/kac5a/k5_documents'

lua54 'yes'

games {
  "gta5",
}

ui_page 'web/build/index.html'

client_scripts {
  "config.lua",
  "client/**/*"
}
server_scripts {
  "@mysql-async/lib/MySQL.lua",
  "config.lua",
  "server/**/*"
}

files {
  'web/build/index.html',
  'web/build/**/*'
}
