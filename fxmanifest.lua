fx_version "cerulean"

description "A better document management script"
author "K5 Scripts"
<<<<<<< HEAD
version '1.1.2'
update "Design changes, added version check"
=======
version '1.1.3'
update "Added option to create documents from other scripts"
>>>>>>> e5cfc1b (add server document, better version check)
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
