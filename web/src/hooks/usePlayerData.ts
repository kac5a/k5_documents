import { useEffect, useState } from "react"
import { fetchNui } from "../utils/fetchNui"

export const usePlayerData = () => {
  const [playerData, setPlayerData] = useState<PlayerData | undefined>()

  useEffect(() => {
    playerData === undefined &&
    getPlayerData()
  },[playerData])

  const getPlayerData = async () => {
    await fetchNui('getPlayerData').then(retData => {
      setPlayerData(retData)
    }).catch(e => {
      console.error('Setting mock data due to error', e)
      setPlayerData(undefined)
    })
  }

  return {
    playerData,
    getPlayerData
  }
}