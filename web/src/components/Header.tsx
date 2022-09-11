import { Typography, IconButton, styled } from "@mui/material"
import LogoutIcon from '@mui/icons-material/Logout';
import { VisibilityCtx } from "../providers/VisibilityProvider";
import { isEnvBrowser } from "../utils/misc";
import { fetchNui } from "../utils/fetchNui";
import { useContext } from "react";

type Props = {
  title: string
}

const Header = ({title}: Props) => {
  const {setVisible, visible} = useContext(VisibilityCtx)
  return (
      <Container>
        <Typography variant="h6" component="div" color="primary.default" sx={{ flexGrow: 1, color: "primary.main" }}>
          {title}
        </Typography>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => {
            if (!isEnvBrowser()) fetchNui("hideFrame");
            else setVisible(!visible);
          }} 
        >
          <LogoutIcon />
        </IconButton>
      </Container>
  )
}

const Container = styled("div")`
  display: flex;
  margin-bottom: 0.7vh;
`

export default Header