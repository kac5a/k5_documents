fx_version "cerulean"

description "K5 Documents"
author "K5 Scripts"
version '1.1.2'
update "Design changes, added version check"
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
