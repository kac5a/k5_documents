import { DataGrid, GridActionsCellItem, GridColumns, GridRenderCellParams, GridRowParams, GridValueGetterParams } from "@mui/x-data-grid"
import DeleteIcon from "@mui/icons-material/Delete"
import { useCallback, useContext, useEffect, useState } from "react"
import { fetchNui } from "../../utils/fetchNui"
import { Button, Dialog, Tooltip } from "@mui/material"
import ViewIcon from '@mui/icons-material/RemoveRedEye';
import ShowIcon from '@mui/icons-material/UploadFile';
import CopyIcon from '@mui/icons-material/FileCopy';
import DeleteDialog from "../Components/DeleteDialog"
import city_logo from "../../assets/city_logo.png"
import { Context } from "../../context/Context"
import useDeleteDocument from "../../hooks/useDeleteDocument"
import CreateDocumentModal from "../Components/CreateDocumentModal"
import CreateDocument from "../Components/Forms/CreateDocument"
import DocumentView from "../Components/DocumentView"
import moment from "moment"
import { DATE_FORMAT } from "../../utils/consts"
import { availableJobs, citizenTemplates, texts } from "../../AppConfig"
import { useJob } from "../../hooks/useJob"

const IssuedDocuments = () => {

  const [isDocumentFormOpen, setDocumentFormOpen] = useState(false)
  const [isTemplateListOpen, setTemplateListOpen] = useState(false)
  const [isCitizenDocument, setCitizenDocument] = useState(false)
  const [isCitizenListOpen, setCitizenListOpen] = useState(false)
  const [logoSrc, setLogoSrc] = useState(city_logo)
  const [documentTemplate, setDocumentTemplate] = useState<DocumentTemplate | undefined>()
  const { job } = useJob()

  const {
    documents,
    handleGetDocuments,
    documentsLoading,
    setDocumentsLoading,
    setViewDocOpen,
    setViewDocument
  } = useContext(Context)

  useEffect(() => {
    documents === null && handleGetDocuments()
  }, [handleGetDocuments, documents])


  const {
    isDeleteOpen,
    setDeleteOpen,
    documentToDelete,
    setDocumentToDelete,
    handleDelete,
    handleCancel
  } = useDeleteDocument({ handleGetDocuments, setDocumentsLoading })

  const columns: GridColumns<K5Document> = [
    {
      field: 'customName',
      headerName: texts.customDocumentName,
      flex: 1,
      renderCell: (params: GridRenderCellParams<string | undefined>) => (params.value === undefined || params.value?.length === 0 ? <div style={{ fontStyle: "italic" }}>{texts.unnamed}</div> : params.value)
    },
    {
      field: 'name',
      headerName: texts.documentType,
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: texts.date,
      width: 150,
      valueGetter: (params: GridValueGetterParams) => (new Date(params.row.createdAt)),
      valueFormatter: params => 
        moment(new Date(params?.value)).format(DATE_FORMAT),
    },
    {
      field: 'actions',
      headerName: texts.actions,
      type: 'actions',
      getActions: (data: GridRowParams) => [
        (<Tooltip title={texts.view}>
          <GridActionsCellItem icon={<ViewIcon />} onClick={() => {
            setViewDocument(documents?.filter(d => d.id === data.id)[0])
            setViewDocOpen(true)
          }} label={texts.view} />
        </Tooltip>),
        (<Tooltip title={texts.show}>
          <GridActionsCellItem icon={<ShowIcon />} onClick={() => {
            fetchNui("showDocument", { docId: data.id, isCopy: false }).then((_d) => {}).catch(_e => {})
          }} label={texts.show} />
        </Tooltip>),
        (<Tooltip title={texts.copy}>
          <GridActionsCellItem icon={<CopyIcon />} onClick={() => {
            fetchNui("giveCopy", documents?.filter(d => d.id === data.id)[0]).then((_d) => {}).catch(_e => {})
          }} label={texts.copy} />
        </Tooltip>),
        (<Tooltip title={texts.delete}>
          <GridActionsCellItem icon={<DeleteIcon />} onClick={() => {
            setDocumentToDelete(documents?.filter(d => d.id === data.id)[0])
            setDeleteOpen(true)
          }} label={texts.delete} />
        </Tooltip>),
      ],
      width: 180
    },
  ];

  const handleCreate = useCallback((data: K5Document) => {
    setDocumentFormOpen(false)
    setDocumentsLoading(true)
    fetchNui('createDocument', JSON.stringify(data)).then(_retData => {
       handleGetDocuments()
       return
     }).catch(_e => {
       console.error('An error has occured')
     })

  }, [handleGetDocuments, setDocumentsLoading])

  const handleTemplateSelect = (t: DocumentTemplate, citizen: boolean) => {
    setTemplateListOpen(false)
    setCitizenListOpen(false)
    if (citizen) {
      setLogoSrc(city_logo)
      setCitizenDocument(true)
    } else {
      setLogoSrc(availableJobs.find(j => j.job === job?.name)?.logo || city_logo)
      setCitizenDocument(false)
    }
    
    setDocumentTemplate(t)
    setDocumentFormOpen(true)
  }

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div style={{ flex: 1, marginBottom: "10px" }}>
          <DataGrid
            loading={documentsLoading}
            style={{ height: '100%' }}
            rows={documents ?? []}
            columns={columns}
            pageSize={5}
            initialState={{
              sorting: {sortModel: [{field: "createdAt", sort: 'desc'}]}
            }}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {!!citizenTemplates.length && <Button variant="contained" style={{ marginRight: "8px" }} color="secondary" onClick={() => setCitizenListOpen(true)}>{texts.newCitizenDocumentBtn}</Button>}
          <Button variant="contained" onClick={() => setTemplateListOpen(true)}>{texts.newDocumentBtn}</Button>
        </div>
      </div>
      <Dialog maxWidth="md" open={isDocumentFormOpen} onClose={() => {
        setDocumentFormOpen(false)
      }}>
        <CreateDocument isCitizen={isCitizenDocument} handleCreate={handleCreate} logoSrc={logoSrc} template={documentTemplate!} handleClose={() => {
          setDocumentFormOpen(false)
        }} />
      </Dialog>
      <CreateDocumentModal open={isTemplateListOpen} handleClose={() => setTemplateListOpen(false)} handleTemplateClick={handleTemplateSelect} />
      <CreateDocumentModal citizen open={isCitizenListOpen} handleClose={() => setCitizenListOpen(false)} handleTemplateClick={handleTemplateSelect} />
      <DeleteDialog
        open={isDeleteOpen}
        handleAgree={handleDelete}
        handleCancel={handleCancel}
        title={texts.deleteDocumentTitle}
        text={`${texts.deleteDocumentQuestion} ${documentToDelete?.name || ""}`}
      />
      <DocumentView/>
    </>

  )
}

export default IssuedDocuments