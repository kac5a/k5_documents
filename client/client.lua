ESX = nil

local selectingPlayer = false
local prop = nil

Citizen.CreateThread(function()
  while ESX == nil do
    TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
    Citizen.Wait(0)
  end

  while ESX.GetPlayerData().job == nil do
		Citizen.Wait(10)
	end

	ESX.PlayerData = ESX.GetPlayerData()
end)

RegisterNetEvent('esx:setJob')
AddEventHandler('esx:setJob', function(job)
	ESX.PlayerData.job = job
end)

RegisterNetEvent('esx:playerLoaded')
AddEventHandler('esx:playerLoaded', function(xPlayer)
	ESX.PlayerData = xPlayer
	ESX.PlayerLoaded = true
end)

function holdDocument(shouldHold)
    if shouldHold then
      detachPaper()

      playAnim("missfam4", "base")

      attachPaper()

    else 
      ClearPedTasks(GetPlayerPed(-1))
      detachPaper()
    end
end

function playAnim(dict, anim, duration)
  duration = duration or -1
  while not HasAnimDictLoaded(dict) do
    RequestAnimDict(dict)
    Wait(10)
  end

  TaskPlayAnim(GetPlayerPed(-1), dict, anim, 2.0, 2.0, duration, 51, 0, false, false, false)
  RemoveAnimDict(dict)
end

function attachPaper()
  local player = PlayerPedId()
  local x,y,z = table.unpack(GetEntityCoords(player))

  while not HasModelLoaded(GetHashKey("h4_prop_h4_files_paper_01b")) do
    RequestModel(GetHashKey("h4_prop_h4_files_paper_01b"))
    Wait(10)
  end

  prop = CreateObject(GetHashKey("h4_prop_h4_files_paper_01b"), x, y, z+0.2,  true,  true, true)
  AttachEntityToEntity(prop, player, GetPedBoneIndex(player, 36029), 0.16, 0.08, 0.1, -40.0, -50.0, 0.0, true, true, false, true, 1, true)
  SetModelAsNoLongerNeeded("h4_prop_h4_files_paper_01b")
end

function detachPaper()
  DeleteEntity(prop)
end

local function toggleNuiFrame(shouldShow, shouldHoldDocument)
  holdDocument(shouldHoldDocument)
  SetNuiFocus(shouldShow, shouldShow)
  SendReactMessage('setVisible', shouldShow)
end

local function toggleDocumentFrame(shouldShow, document)
  holdDocument(shouldShow)
  SetNuiFocus(shouldShow, shouldShow)
  SendReactMessage('setDocument', document)
end

RegisterNUICallback('hideDocument', function(_, cb)
  toggleDocumentFrame(false, nil)
  debugPrint('Hide NUI frame')
  cb({})
end)

RegisterCommand(Config.Command, function()
  toggleNuiFrame(true, true)
  debugPrint('Show NUI frame')
end)

RegisterNUICallback('hideFrame', function(_, cb)
  toggleNuiFrame(false, false)
  debugPrint('Hide NUI frame')
  cb({})
end)

RegisterNUICallback('getPlayerJob', function(data, cb)
  debugPrint('Data sent by React', json.encode(data))
  local retData <const> = ESX.PlayerData.job
  cb(retData)
end)

RegisterNUICallback('getPlayerData', function(data, cb)
  ESX.TriggerServerCallback('k5_documents:getPlayerData', function(result)
    cb(result)
  end)
end)

RegisterNUICallback('getPlayerCopies', function(data, cb)
  ESX.TriggerServerCallback('k5_documents:getPlayerCopies', function(result)
    cb(result)
  end)
end)

RegisterNUICallback('getIssuedDocuments', function(data, cb)
  ESX.TriggerServerCallback('k5_documents:getPlayerDocuments', function(result)
    cb(result)
  end)
end)

RegisterNUICallback('createDocument', function(data, cb)
  ESX.TriggerServerCallback('k5_documents:createDocument',function(result)
    cb(result)
  end,
  data)
end)

RegisterNUICallback('createTemplate', function(data, cb)
  ESX.TriggerServerCallback('k5_documents:createTemplate',function(result)
    cb(result)
  end,
  data)
end)

RegisterNUICallback('editTemplate', function(data, cb)
  ESX.TriggerServerCallback('k5_documents:editTemplate',function(result)
    cb(result)
  end,
  data)
end)

RegisterNUICallback('deleteTemplate', function(data, cb)
  ESX.TriggerServerCallback('k5_documents:deleteTemplate',function(result)
    cb(result)
  end,
  data)
end)

RegisterNUICallback('deleteDocument', function(data, cb)
  ESX.TriggerServerCallback('k5_documents:deleteDocument',function(result)
    cb(result)
  end,
  data)
end)

RegisterNUICallback('getMyTemplates', function(data, cb)
  ESX.TriggerServerCallback('k5_documents:getDocumentTemplates', function(result)
    cb(result)
  end)
end)

RegisterNUICallback('giveCopy', function(data, cb)
  Citizen.CreateThread(function()
    local targetId = playerSelector(Config.Locale.giveCopy)
    if targetId == -1 then
      holdDocument(false)
    else
      TriggerServerEvent("k5_documents:giveCopy", data, targetId)
    end
  end)
end)

RegisterNUICallback('showDocument', function(data, cb)
  Citizen.CreateThread(function()
    local targetId = playerSelector(Config.Locale.showDocument)
    if targetId == -1 then
      holdDocument(false)
    else
      holdDocument(false)
      playAnim("mp_common", "givetake1_a", 1500)
      TriggerServerEvent("k5_documents:receiveDocument", data, targetId)
    end
  end)
end)

RegisterNetEvent('k5_documents:copyGave')
AddEventHandler('k5_documents:copyGave', function(data)
	holdDocument(false)
  playAnim("mp_common", "givetake1_a", 1500)
  ESX.ShowNotification(Config.Locale.giveNotification .. " ~b~" .. data)
end)


RegisterNetEvent('k5_documents:copyReceived')
AddEventHandler('k5_documents:copyReceived', function(data)
  ESX.ShowNotification(Config.Locale.receiveNotification .. " ~b~" .. data)
end)

RegisterNetEvent('k5_documents:viewDocument')
AddEventHandler('k5_documents:viewDocument', function(data)
	toggleDocumentFrame(true, data.data)
end)

function playerSelector(confirmText)
  toggleNuiFrame(false, true, nil)
  selectingPlayer = true

  while selectingPlayer do
    local closestPlayer, closestPlayerDistance = ESX.Game.GetClosestPlayer()
    local closestPlayerCoords = GetEntityCoords(GetPlayerPed(closestPlayer))

    DisableControlAction(2, 200, true)

    if IsControlJustReleased(0, 202) then
      selectingPlayer = false
      return -1
    end

    BeginTextCommandDisplayHelp('main')
    AddTextEntry('main', "~INPUT_CONTEXT~ "..confirmText.."  ~INPUT_FRONTEND_PAUSE_ALTERNATE~ "..Config.Locale.cancel)
    EndTextCommandDisplayHelp(0, 0, 1, -1)

    if closestPlayer ~= -1 and closestPlayerDistance < 2.0 then
      DrawMarker(20, closestPlayerCoords.x, closestPlayerCoords.y, closestPlayerCoords.z + 1.2, 0.0, 0.0, 0.0, 0, 0.0, 0.0, 0.4, 0.4, -0.4, 255, 255, 255, 100, false, true, 2, false, false, false, false)
      DrawMarker(25, closestPlayerCoords.x, closestPlayerCoords.y, closestPlayerCoords.z - 0.95, 0.0, 0.0, 0.0, 0, 0.0, 0.0, 1.0, 1.0, 1.0, 255, 255, 255, 100, false, true, 2, false, false, false, false)
      if IsControlJustReleased(0, 38) then
        selectingPlayer = false
        local targetId = GetPlayerServerId(closestPlayer)
        return targetId
      end
    else
      if IsControlJustReleased(0, 38) then
        ESX.ShowNotification(Config.Locale.noPlayersAround)
      end
    end
    Citizen.Wait(1)
  end
end