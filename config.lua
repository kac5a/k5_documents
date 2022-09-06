Config = {}

Config.Framework = "esx" -- "esx" or "qb"

Config.Command = "documents"

Config.PaperProp = "prop_cd_paper_pile1" --Previously "h4_prop_h4_files_paper_01b"
-- These texts only show up on client side. To change texts in the NUI,
-- go to the web/build/config.js file
Config.Locale = {
  ["receiveNotification"] = "You received a document: ",
  ["giveNotification"] = "You gave a document: ",
  ["cancel"] = "Cancel",
  ["noPlayersAround"] = "There's no one around you",
  ["showDocument"] = "Show Document",
  ["giveCopy"] = "Give Copy"
}