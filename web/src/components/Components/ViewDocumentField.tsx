import { styled } from "@mui/material"

type Props = {
  name: string
  value: string
}

const ViewDocumentField = ({ name, value }: Props) => {
  return (
    <Container>
      <Name>{name}</Name>
      <Value>{value}</Value>
    </Container>
  )
}

export default ViewDocumentField

const Container = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const Name = styled("div")`
  width: 100%;
  font-size: 1rem;
  font-weight: bold;
`

const Value = styled("div")`
  width: calc(100% - 5px);
  font-size: 0.8rem;
  margin-left: 5px;
  margin-bottom: 8px;
`