import { styled } from "@mui/system"
import { useCallback, useState } from "react"
import { texts } from "../../../AppConfig"

type Props = {
  name: string
  isSigned: boolean
  setSigned: (signed: boolean) => void
}

const SignButton = ({ name, isSigned, setSigned }: Props) => {

  const [writtenName, setWrittenName] = useState("")
  const [signing, setSigning] = useState(false)

  const sign = useCallback((index: number) => {
    !signing && setSigning(true)

    if (index < name.length-1) {
      index++
      setWrittenName((t) => t + name[index])
      setTimeout(function () { sign(index); }, 150);
    }

    if (index === name.length - 1) setSigned(true)
  },[name, setSigned, signing])

  return (
    <Container issigned={!!isSigned} onClick={() => !signing && sign(-1)}>
      <SignHere>{texts.signHereText}</SignHere>
      <div style={{fontFamily: "'Oooh Baby', cursive"}}>{writtenName}</div>
    </Container>
  )
}

export default SignButton

type ContainerProps = {
  issigned: boolean
}

const Container = styled("div")<ContainerProps>`
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: center;
  width: 100%;
  font-size: 1.7rem;
  height: 100%;
  border: 1px solid #000;
  margin-bottom: 20px;
  cursor: ${(props) => !!props.issigned ? "initial" : "pointer"};
`

const SignHere = styled("div")`
  font-size: 0.7rem;
  margin-bottom: auto;
  justify-self: flex-start;
`