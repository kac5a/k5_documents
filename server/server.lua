ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

ESX.RegisterServerCallback('k5_documents:getPlayerCopies', function(source, cb)
    local xPlayer = ESX.GetPlayerFromId(source)

    MySQL.Async.fetchAll(
      'SELECT id, data, isCopy FROM k5_documents WHERE ownerId = @identifier and isCopy = "1"', {
      ['@identifier'] = xPlayer.identifier
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


ESX.RegisterServerCallback('k5_documents:getPlayerDocuments', function(source, cb)
    local xPlayer = ESX.GetPlayerFromId(source)

    MySQL.Async.fetchAll(
      'SELECT id, data, isCopy FROM k5_documents WHERE ownerId = @identifier and isCopy = "0"', {
      ['@identifier'] = xPlayer.identifier
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

ESX.RegisterServerCallback('k5_documents:getDocumentTemplates', function(source, cb)
    local xPlayer = ESX.GetPlayerFromId(source)

    MySQL.Async.fetchAll(
      'SELECT id, data FROM k5_document_templates WHERE job = @job', {
      ['@job'] = xPlayer.job.name
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

ESX.RegisterServerCallback('k5_documents:createTemplate', function(source, cb, data)
  local src = source
  local xPlayer = ESX.GetPlayerFromId(src)

  MySQL.Async.insert('INSERT INTO k5_document_templates (data, job) VALUES (@data, @job)', {
			['@data'] = data,
			['@job'] = xPlayer.job.name
		}, function(result)
      cb(result)
		end)
end)

ESX.RegisterServerCallback('k5_documents:editTemplate', function(source, cb, data)
  local obj = json.decode(data)

  MySQL.Async.execute('UPDATE k5_document_templates SET data = @data WHERE id = @id', {
			['@data'] = data,
			['@id'] = obj.id
		}, function(result)
      cb(result)
		end)
end)

ESX.RegisterServerCallback('k5_documents:deleteTemplate', function(source, cb, data)
  MySQL.Async.execute('DELETE FROM k5_document_templates WHERE id = @id', {
			['@id'] = data
		}, function(result)
      cb(result)
		end)
end)


ESX.RegisterServerCallback('k5_documents:getPlayerData', function(source, cb)
    local xPlayer = ESX.GetPlayerFromId(source)

    MySQL.Async.fetchAll(
      'SELECT firstname, lastname, dateofbirth FROM users WHERE identifier = @identifier', {
      ['@identifier'] =xPlayer.identifier
    }, function(result)
      cb(result[1])
    end)
end)

ESX.RegisterServerCallback('k5_documents:createDocument', function(source, cb, data)
  local src = source
  local xPlayer = ESX.GetPlayerFromId(src)

  MySQL.Async.insert('INSERT INTO k5_documents (data, ownerId, isCopy) VALUES (@data, @ownerId, @isCopy)', {
			['@data'] = data,
			['@ownerId'] = xPlayer.identifier,
			['@isCopy'] = json.decode(data).isCopy
		}, function(result)
      cb(result)
		end)
end)

ESX.RegisterServerCallback('k5_documents:deleteDocument', function(source, cb, data)
  MySQL.Async.execute('DELETE FROM k5_documents WHERE id = @id', {
			['@id'] = data
		}, function(result)
      cb(result)
  end)
end)

RegisterServerEvent('k5_documents:giveCopy')
AddEventHandler('k5_documents:giveCopy', function(data, targetId)
  local src = source
  local xPlayer = ESX.GetPlayerFromId(src)

  local tsrc = targetId
  local tPlayer = ESX.GetPlayerFromId(tsrc)

  MySQL.Async.insert('INSERT INTO k5_documents (data, ownerId, isCopy) VALUES (@data, @ownerId, @isCopy)', {
    ['@data'] = json.encode(data),
    ['@ownerId'] = tPlayer.identifier,
    ['@isCopy'] = true
  }, function(result)
    TriggerClientEvent("k5_documents:copyGave", src, data.name)
    TriggerClientEvent("k5_documents:copyReceived", tsrc, data.name)
  end)

end)

RegisterServerEvent("k5_documents:receiveDocument")
AddEventHandler("k5_documents:receiveDocument", function(data, targetId)
  local tsrc = targetId
  local tPlayer = ESX.GetPlayerFromId(tsrc)

  MySQL.Async.fetchAll('SELECT data FROM k5_documents WHERE id = @docId', {
    ['@docId'] = data.docId,
  }, function(result)
    TriggerClientEvent("k5_documents:viewDocument", tsrc, result[1])
  end)

end)