import { ListItemButton, ListItemIcon, ListItemText, SxProps, Theme } from "@mui/material"

type Props = {
  title: string
  selected?: boolean
  onClick: () => any
  color?: string
  style?: SxProps<Theme>
  iconComponent: JSX.Element 
}

const ListElement = ({title, selected, onClick, color, iconComponent, style}:Props) => {
  return (
    <ListItemButton
      selected={selected}
      onClick={(_event) => onClick()}
      sx={{
        width: "calc(100% - 20px)",
        color: 'primary.contrastText',
        borderRadius: "20px",
        margin: "10px",
        padding: "5px 10px",
        '&:hover': {
          bgcolor: 'background.default',
        },
        '&.Mui-selected': {
          bgcolor: "primary.main",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2);",
          '&:hover': {
            bgcolor: 'primary.light',
          }
        },
        '& .MuiListItemIcon-root': {
          color: 'primary.contrastText',
          minWidth: "40px"
        },
        ...style
      }}
    >
      <ListItemIcon>
         {iconComponent}
      </ListItemIcon>
      <ListItemText primary={title} />
    </ListItemButton>
  )
}

export default ListElement