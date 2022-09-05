import { useEffect, useMemo, useState } from "react"
import { fetchNui } from "../utils/fetchNui"

export const useJob = () => {
  const [job, setJob] = useState<Job | undefined>()

  useEffect(() => {
    job === undefined &&
    getPlayerJobData()
  },[job])

  const isBoss = useMemo(() => {
    return job?.isBoss || false
  },[job])

  const getPlayerJobData = async () => {
    await fetchNui('getPlayerJob').then(retData => {
      setJob(retData)
    }).catch(e => {
      console.error('Setting mock data due to error', e)
      setJob(undefined)
    })
  }

  return {
    job,
    setJob,
    isBoss
  }
}