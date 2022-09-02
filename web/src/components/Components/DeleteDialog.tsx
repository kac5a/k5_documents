import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material"
import { texts } from "../../AppConfig"

type Props = {
  open: boolean
  handleAgree: () => void
  handleCancel: () => void
  title: string
  text: string
}

const DeleteDialog = ({open, handleAgree, handleCancel, title, text}: Props) => {
  return (
    <Dialog
      open={open}
      onClose={handleCancel}
    >
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAgree} autoFocus>{texts.delete}</Button>
        <Button onClick={handleCancel} >
          {texts.cancel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDialog