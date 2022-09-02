import { useCallback, useState } from "react"
import { fetchNui } from "../utils/fetchNui"

type Props = {
  handleGetTemplates: () => void
  setTemplatesLoading: (isLoading: boolean) => void
}

const useDeleteTemplate = ({handleGetTemplates, setTemplatesLoading}: Props) => {
  const [isDeleteOpen, setDeleteOpen] = useState(false)
  const [templateToDelete, setTemplateToDelete] = useState<DocumentTemplate | undefined>()
  const handleDelete = useCallback(() => {
    setDeleteOpen(false)
    setTemplatesLoading(true)
    fetchNui('deleteTemplate', templateToDelete?.id).then(_retData => {
      handleGetTemplates()
      return
    }).catch(_e => {
      console.error('An error has occured', _e)
    })
    
  }, [handleGetTemplates, setTemplatesLoading, templateToDelete?.id])
  const handleCancel = useCallback(() => {
    setDeleteOpen(false)
    setTemplateToDelete(undefined)
  }, [])

  return {
    isDeleteOpen,
    setDeleteOpen,
    templateToDelete,
    setTemplateToDelete,
    handleDelete,
    handleCancel
  }
}

export default useDeleteTemplate