Config = {}

Config.Framework = "esx" -- "esx" or "qb"

Config.Command = "documents"

Config.PaperProp = {
  name = "prop_cd_paper_pile1".
  xRot = -130.0, 
	yRot = -50.0, 
	zRot = 0.0, 
}
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