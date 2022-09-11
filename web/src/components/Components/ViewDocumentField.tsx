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
  font-size: 0.9rem;
`

const Value = styled("div")`
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 8px;
`