Config = {}

Config.Command = "documents" -- If nil, the command won't work
Config.RegisterKey = nil -- example: "k". If nil, there won't be a key registered. "Config.Command" has to be set to work.

Config.DocumentItemName = nil -- The name of the item you want to open the documents. If nil, no item will be registered. Example: "wallet"

Config.PaperProp = {
  name = "prop_cd_paper_pile1",
  xRot = -130.0, 
	yRot = -50.0, 
	zRot = 0.0
}
-- These texts only show up on client side. To change texts in the NUI,
-- go to the web/build/config.js file
Config.Locale = {
  ["receiveNotification"] = "You received a document: ",
  ["giveNotification"] = "You gave a document: ",
  ["cancel"] = "Cancel",
  ["noPlayersAround"] = "There's no one around you",
  ["showDocument"] = "Show Document",
  ["giveCopy"] = "Give Copy",
  ["registerMapDescription"] = "Open documents"
}