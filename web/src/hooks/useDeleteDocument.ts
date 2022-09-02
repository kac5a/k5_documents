import { useCallback, useState } from "react"
import { fetchNui } from "../utils/fetchNui"

type Props = {
  handleGetDocuments: () => void
  setDocumentsLoading: (isLoading: boolean) => void
}

const useDeleteDocument = ({handleGetDocuments, setDocumentsLoading}: Props) => {
  const [isDeleteOpen, setDeleteOpen] = useState(false)
  const [documentToDelete, setDocumentToDelete] = useState<K5Document | undefined>()
  
  const handleDelete = useCallback(() => {
    setDeleteOpen(false)
    setDocumentsLoading(true)
    fetchNui('deleteDocument', documentToDelete?.id).then(_retData => {
      handleGetDocuments()
      return
    }).catch(_e => {
      console.error('An error has occured', _e)
    })
    
  }, [handleGetDocuments, setDocumentsLoading, documentToDelete])
  const handleCancel = useCallback(() => {
    setDeleteOpen(false)
    setDocumentToDelete(undefined)
  }, [])

  return {
    isDeleteOpen,
    setDeleteOpen,
    documentToDelete,
    setDocumentToDelete,
    handleDelete,
    handleCancel
  }
}

export default useDeleteDocument