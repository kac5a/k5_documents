import { DataGrid, GridActionsCellItem, GridColumns, GridRowParams } from "@mui/x-data-grid"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { useCallback, useContext, useEffect, useState } from "react"
import { fetchNui } from "../../utils/fetchNui"
import { Button, Dialog, Tooltip } from "@mui/material"
import CreateEditTemplate from "../Components/Forms/CreateEditTemplate"
import DeleteDialog from "../Components/DeleteDialog"
import useDeleteTemplate from "../../hooks/useDeleteTemplate"
import { Context } from "../../context/Context"
import { texts } from "../../AppConfig"

const Templates = () => {

  const [isTemplateFormOpen, setTemplateFormOpen] = useState(false)
  const [currentTemplate, setCurrentTemplate] = useState<DocumentTemplate | undefined>()

  const { templates, handleGetTemplates, templatesLoading, setTemplatesLoading } = useContext(Context)

  useEffect(() => {
    templates === null && handleGetTemplates()
  }, [handleGetTemplates, templates])


  const {
    isDeleteOpen,
    setDeleteOpen,
    templateToDelete,
    setTemplateToDelete,
    handleDelete,
    handleCancel
  } = useDeleteTemplate({handleGetTemplates, setTemplatesLoading})

  const columns: GridColumns<DocumentTemplate> = [
    {
      field: 'documentName',
      headerName: texts.documentName,
      flex: 1,
    },
    {
      field: 'actions',
      headerName: texts.actions,
      type: 'actions',
      getActions: (data: GridRowParams) => [
        (<Tooltip title={texts.edit}>
          <GridActionsCellItem icon={<EditIcon/>} onClick={()=>{
            setCurrentTemplate(templates?.filter(t => t.id === data.id)[0])
            setTemplateFormOpen(true)
          }} label={texts.edit} />
        </Tooltip>),
        (<Tooltip title={texts.delete}>
          <GridActionsCellItem icon={<DeleteIcon />} onClick={() => {
            setTemplateToDelete(templates?.filter(t => t.id === data.id)[0])
            setDeleteOpen(true)
          }} label={texts.delete} />
        </Tooltip>),
      ],
      width: 180
    },
  ];

  const handleCreate = useCallback((data: DocumentTemplate) => {
    setTemplateFormOpen(false)
    setTemplatesLoading(true)
    fetchNui('createTemplate', JSON.stringify(data)).then(_retData => {
      handleGetTemplates()
      return
    }).catch(_e => {
      console.error('An error has occured')
    })
    
  },[handleGetTemplates, setTemplatesLoading])

  const handleEdit = useCallback((data: DocumentTemplate) => {
    setTemplateFormOpen(false)
    setTemplatesLoading(true)
    fetchNui('editTemplate', JSON.stringify(data)).then(_retData => {
      handleGetTemplates()
      return
    }).catch(_e => {
      console.error('An error has occured')
    })
    
  },[handleGetTemplates, setTemplatesLoading])

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div style={{ flex: 1, marginBottom: "10px" }}>
          <DataGrid
            loading={templatesLoading}
            style={{ height: '100%' }}
            rows={templates ?? []}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end"}}>
          <Button variant="contained" onClick={() => setTemplateFormOpen(true)}>{texts.newTemplateBtn}</Button>
        </div>
      </div>
      <Dialog maxWidth="md" open={isTemplateFormOpen} onClose={() => {
        setTemplateFormOpen(false)
        setCurrentTemplate(undefined)
      }}>
        <CreateEditTemplate handleCreate={handleCreate} handleEdit={handleEdit} templateData={currentTemplate} />
      </Dialog>
      <DeleteDialog
        open={isDeleteOpen}
        handleAgree={handleDelete}
        handleCancel={handleCancel}
        title={texts.deleteTemplateTitle}
        text={`${texts.deleteTemplateQuestion} ${templateToDelete?.documentName || ""}`} />
    </>
    
  )
}

export default Templates