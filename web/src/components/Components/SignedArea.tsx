import { styled } from "@mui/system"
import moment from "moment"
import { texts } from "../../AppConfig"
import { DATE_FORMAT } from "../../utils/consts"

type Props = {
  name: string
  date: string
  isCopy: boolean | undefined
}

const SignedArea = ({ name, date, isCopy }: Props) => {

  return (
    <Container>
      <SignHere>
        <span>{texts.signHereText}</span>
        <span>{isCopy ? texts.documentCopy : ""}</span>
      </SignHere>
      <div style={{ fontFamily: "'Oooh Baby', cursive" }}>{name}</div>
      <SignData>{texts.date}: {moment(new Date(date)).format(DATE_FORMAT)}</SignData>
    </Container>
  )
}

export default SignedArea


const Container = styled("div")`
  display: flex;
  flex-direction: column;
  padding: 1.8vh;
  justify-content: center;
  width: 100%;
  font-size: 1.7rem;
  height: 100%;
  margin-bottom: 1.8vh;
  border: 1px solid #000;
`

const SignHere = styled("div")`
  font-size: 0.7rem;
  margin-bottom: auto;
  display: flex;
  justify-content: space-between;
  justify-self: flex-start;
`


const SignData = styled("div")`
  font-size: 0.7rem;
`