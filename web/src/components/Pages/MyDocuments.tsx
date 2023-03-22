import { DataGrid, GridActionsCellItem, GridColumns, GridRowParams, GridValueGetterParams } from "@mui/x-data-grid"
import ViewIcon from "@mui/icons-material/Visibility"
import DeleteIcon from "@mui/icons-material/Delete"
import ShowIcon from '@mui/icons-material/UploadFile';
import { useContext, useEffect } from "react"
import { fetchNui } from "../../utils/fetchNui"
import { Tooltip } from "@mui/material"
import moment from "moment";
import { DATE_FORMAT } from "../../utils/consts";
import { texts } from "../../AppConfig";
import { Context } from "../../context/Context";
import DocumentView from "../Components/DocumentView";
import DeleteDialog from "../Components/DeleteDialog";
import useDeleteDocument from "../../hooks/useDeleteDocument";

const MyDocuments = () => {

  const {
    documentCopies,
    handleGetDocumentCopies,
    documentCopiesLoading,
    setDocumentCopiesLoading,
    setViewDocOpen,
    setViewDocument
  } = useContext(Context)

  const {
    isDeleteOpen,
    setDeleteOpen,
    documentToDelete,
    setDocumentToDelete,
    handleDelete,
    handleCancel
  } = useDeleteDocument({ handleGetDocuments: handleGetDocumentCopies, setDocumentsLoading: setDocumentCopiesLoading })

  useEffect(() => {
    documentCopies === null && handleGetDocumentCopies()
  }, [documentCopies, handleGetDocumentCopies])

  const columns: GridColumns<K5Document> = [
    {
      field: 'customName',
      headerName: texts.customDocumentName,
      flex: 1,
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
            setViewDocument(documentCopies?.filter(d => d.id === data.id)[0])
            setViewDocOpen(true)
          }} label={texts.view} />
        </Tooltip>),
        (<Tooltip title={texts.show}>
          <GridActionsCellItem icon={<ShowIcon />} onClick={() => {
            fetchNui("showDocument", { docId: data.id, isCopy: true }).then((_d) => {}).catch(_e => {})
          }} label={texts.show} />
        </Tooltip>),
        (<Tooltip title={texts.delete}>
          <GridActionsCellItem icon={<DeleteIcon />} onClick={() => {
            setDocumentToDelete(documentCopies?.filter(d => d.id === data.id)[0])
            setDeleteOpen(true)
          }} label={texts.delete} />
        </Tooltip>),
      ],
      width: 180
    },
  ];

  return (
    <>
      <div style={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={documentCopies ?? []}
          columns={columns}
          loading={documentCopiesLoading}
          pageSize={5}
          initialState={{
              sorting: {sortModel: [{field: "createdAt", sort: 'desc'}]}
            }}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>
      <DeleteDialog
        open={isDeleteOpen}
        handleAgree={handleDelete}
        handleCancel={handleCancel}
        title={texts.deleteDocumentTitle}
        text={`${texts.deleteDocumentQuestion} ${documentToDelete?.name || ""}`}
      />
      <DocumentView />
    </>
  )
}

export default MyDocuments