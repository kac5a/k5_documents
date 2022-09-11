local RegisterCallback
ESX = nil
local QBCore
if Config.Framework == "esx" then
  ESX = nil
  TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
  RegisterCallback = function (name, fn)
    ESX.RegisterServerCallback(name, fn)
  end
elseif Config.Framework == "qb" then
  QBCore = exports['qb-core']:GetCoreObject()
  RegisterCallback = function (name, fn)
    QBCore.Functions.CreateCallback(name, fn)
  end
else
  print("^8ERROR: ^3Unsupported or misspelled framework^7")
end

Citizen.CreateThread(function()
    Citizen.Wait(5000)
    local resource = GetCurrentResourceName()
    local currentVersion = GetResourceMetadata(resource, 'version', 0)
    PerformHttpRequest('https://raw.githubusercontent.com/kac5a/k5_documents/master/fxmanifest.lua',function(error, result, headers)
      if not result then print('K5 Documents: ^1Couldn\'t check version.^0') end
      local version = string.sub(result, string.find(result, "%d.%d.%d"))
      local version_N = tonumber((version:gsub("%D+", "")))
      local currentVersion_N = tonumber((currentVersion:gsub("%D+", "")))

      if version_N > currentVersion_N then
        print('^1!!! ^4[K5 DOCUMENTS]^0: New update available on GitHub. ^1'..currentVersion.. '^0 -> ^2'..version..' ^1!!!^0')
      end
    end,'GET')
end)

RegisterCallback('k5_documents:getPlayerCopies', function(source, cb)
  local src = source
  local PlayerIdentifier = GetPlayerIdentifier(src)

  MySQL.Async.fetchAll(
    'SELECT id, data, isCopy FROM k5_documents WHERE ownerId = @identifier and isCopy = "1"', {
    ['@identifier'] = PlayerIdentifier
  }, function(result)
    local mappedResult = {}
    for k, v in pairs(result) do
      local thisData = json.decode(v.data)
      thisData.id = v.id
      thisData.isCopy = v.isCopy
      table.insert(mappedResult, thisData)
    end
    cb(mappedResult)
  end)
end)


RegisterCallback('k5_documents:getPlayerDocuments', function(source, cb)
  local src = source
  local PlayerIdentifier = GetPlayerIdentifier(src)

    MySQL.Async.fetchAll(
      'SELECT id, data, isCopy FROM k5_documents WHERE ownerId = @identifier and isCopy = "0"', {
      ['@identifier'] = PlayerIdentifier
    }, function(result)
      local mappedResult = {}
      for k, v in pairs(result) do
        local thisData = json.decode(v.data)
        thisData.id = v.id
        thisData.isCopy = v.isCopy
        table.insert(mappedResult, thisData)
      end
      cb(mappedResult)
    end)
end)

RegisterCallback('k5_documents:getDocumentTemplates', function(source, cb)
  local src = source  
  local PlayerJobName = GetPlayerJobName(src)

  MySQL.Async.fetchAll(
    'SELECT id, data FROM k5_document_templates WHERE job = @job', {
    ['@job'] = PlayerJobName
  }, function(result)
    local mappedResult = {}
    for k, v in pairs(result) do
      local thisData = json.decode(v.data)
      thisData.id = v.id
      table.insert(mappedResult, thisData)
    end
    cb(mappedResult)
  end)
end)

RegisterCallback('k5_documents:createTemplate', function(source, cb, data)
  local src = source  
  local PlayerJobName = GetPlayerJobName(src)

  MySQL.Async.insert('INSERT INTO k5_document_templates (data, job) VALUES (@data, @job)', {
			['@data'] = data,
			['@job'] = PlayerJobName
		}, function(result)
      cb(result)
		end)
end)

RegisterCallback('k5_documents:editTemplate', function(source, cb, data)
  local obj = json.decode(data)

  MySQL.Async.execute('UPDATE k5_document_templates SET data = @data WHERE id = @id', {
			['@data'] = data,
			['@id'] = obj.id
		}, function(result)
      cb(result)
  end)
end)

RegisterCallback('k5_documents:deleteTemplate', function(source, cb, data)
  MySQL.Async.execute('DELETE FROM k5_document_templates WHERE id = @id', {
			['@id'] = data
		}, function(result)
      cb(result)
  end)
end)


RegisterCallback('k5_documents:getPlayerData', function(source, cb)
  local src = source
  local PlayerIdentifier = GetPlayerIdentifier(src)

  MySQL.Async.fetchAll(
    'SELECT firstname, lastname, dateofbirth FROM users WHERE identifier = @identifier', {
    ['@identifier'] = PlayerIdentifier
  }, function(result)
    cb(result[1])
  end)
end)

RegisterCallback('k5_documents:createDocument', function(source, cb, data)
  local src = source
  local PlayerIdentifier = GetPlayerIdentifier(src)

  MySQL.Async.insert('INSERT INTO k5_documents (data, ownerId, isCopy) VALUES (@data, @ownerId, @isCopy)', {
			['@data'] = data,
			['@ownerId'] = PlayerIdentifier,
			['@isCopy'] = json.decode(data).isCopy
		}, function(result)
      cb(result)
		end)
end)

RegisterCallback('k5_documents:deleteDocument', function(source, cb, data)
  MySQL.Async.execute('DELETE FROM k5_documents WHERE id = @id', {
			['@id'] = data
		}, function(result)
      cb(result)
  end)
end)

RegisterServerEvent('k5_documents:giveCopy')
AddEventHandler('k5_documents:giveCopy', function(data, targetId)
  local src = source
  local tsrc = targetId

  local TPlayerIdentifier = GetPlayerIdentifier(tsrc)

  MySQL.Async.insert('INSERT INTO k5_documents (data, ownerId, isCopy) VALUES (@data, @ownerId, @isCopy)', {
    ['@data'] = json.encode(data),
    ['@ownerId'] = TPlayerIdentifier,
    ['@isCopy'] = true
  }, function(result)
    TriggerClientEvent("k5_documents:copyGave", src, data.name)
    TriggerClientEvent("k5_documents:copyReceived", tsrc, data.name)
  end)

end)

RegisterServerEvent("k5_documents:receiveDocument")
AddEventHandler("k5_documents:receiveDocument", function(data, targetId)
  local tsrc = targetId

  MySQL.Async.fetchAll('SELECT data FROM k5_documents WHERE id = @docId', {
    ['@docId'] = data.docId,
  }, function(result)
    TriggerClientEvent("k5_documents:viewDocument", tsrc, result[1])
  end)
end)

function GetPlayerIdentifier(src)
  local PlayerIdentifier
  if Config.Framework == "esx" then
    PlayerIdentifier = ESX.GetPlayerFromId(src).identifier
  elseif Config.Framework == "qb" then
    PlayerIdentifier = QBCore.Functions.GetPlayer(src).PlayerData.citizenid
  end
  return PlayerIdentifier
end

function GetPlayerJobName(src)
  local PlayerJobName
  if Config.Framework == "esx" then
    PlayerJobName = ESX.GetPlayerFromId(src).job.name
  elseif Config.Framework == "qb" then
    PlayerJobName = QBCore.Functions.GetPlayer(src).PlayerData.job.name
  end
  return PlayerJobName
end