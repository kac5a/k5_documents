import { Typography } from "@mui/material"
import { styled } from "@mui/system"
import { CSSProperties, ReactNode } from "react"

type Props = {
  children: ReactNode
  style?: CSSProperties
}

const DocumentTitle = ({children, style}: Props) => {
  return (
    <Container style={style}>
      <Typography>{children}</Typography>
    </Container>
  )
}

export default DocumentTitle

const Container = styled("div")`
  width: 100%;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1b1d2e;
  color: #fff;
  border-radius: 13px;
`