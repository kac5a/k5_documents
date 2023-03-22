import styled from "@emotion/styled"
import { Box, Grid, Card, CardContent, Typography, Paper } from "@mui/material"
import moment from "moment"
import city_logo from "../../assets/city_logo.png"
import DocumentTitle from "./Forms/DocumentTitle"
import ViewDocumentField from "./ViewDocumentField"
import SignedArea from "./SignedArea"
import { DATE_FORMAT_SHORT } from "../../utils/consts"
import { useContext } from "react"
import { texts } from "../../AppConfig"
import { DocumentCtx } from "../../providers/DocumentProvider"
import { availableJobs } from '../../AppConfig';

const DocumentViewFromPlayer = () => {
  
  const { document } = useContext(DocumentCtx)

  return (
    <Paper>
    <StyledDocument>
        <Box style={{width: 0}} sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={1}
            style={{padding: "3.5vh"}}
          >
            <Grid item container xs={12} justifyContent="center" flex={1}>
              <DocumentTitle>{document?.name}</DocumentTitle>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={6}>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                  <CityLogo src={availableJobs.find(j => j.job === document?.job)?.logo ?? city_logo} alt="Los Santos City" />
                </div>
              </Grid>
              <Grid item xs={6}>
                <Card elevation={2}>
                  <CardContent>
                    <Description>{document?.description}</Description>
                    <Grid container spacing={1} style={{marginTop: "0.7vh"}}>
                      <Grid item xs={6} >
                        <IssuerTitle>{texts.issuerFirstname}</IssuerTitle>
                      </Grid>
                      <Grid item xs={6}>
                        <IssuerTitle>{texts.issuerLastname}</IssuerTitle>
                      </Grid>

                      <Grid item xs={6} >
                        <IssuerData>{document?.issuer.firstname}</IssuerData>
                      </Grid>
                      <Grid item xs={6}>
                        <IssuerData>{document?.issuer.lastname}</IssuerData>
                      </Grid>

                      <Grid item xs={6}>
                        <IssuerTitle>{texts.issuerDOB}</IssuerTitle>
                      </Grid>
                      {document?.issuer.jobName ? <Grid item xs={6}>
                        <IssuerTitle>{texts.issuerJob}</IssuerTitle>
                      </Grid> : <Grid item xs={6}/>}

                      <Grid item xs={6} >
                        <IssuerData>{moment(new Date(document?.issuer.birthDate || "")).format(DATE_FORMAT_SHORT)}</IssuerData>
                      </Grid>
                      {document?.issuer.jobName ? <Grid item xs={6}>
                        <IssuerData>{ document?.issuer.jobName }</IssuerData>
                      </Grid> : <Grid item xs={6}/>}
                      
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid item container spacing={2} style={{ marginTop: "0.4" }}>
              {document?.fields.map((f, i) => {
                return (
                  <Grid item xs={6} key={i}>
                    <ViewDocumentField name={f.name} value={f.value} />
                  </Grid>)
                })}
            </Grid>
            <Grid item container xs={12} flex={1}>
              <DocumentTitle style={{marginTop: "1vh"}}>{document?.infoName}</DocumentTitle>
            </Grid>
            <Grid item container xs={12} flex={1}>
              <div style={{ whiteSpace: "pre-wrap", width: "55.5vh", marginTop: "0.5vh", minHeight: "18vh"}}>
                {document?.infoValue}
              </div>
            </Grid>
            <Grid item container xs={12} flex={1}>
              <DocumentTitle style={{ marginTop: "1vh" }}>{texts.termsAndSigning}</DocumentTitle>
            </Grid>
            <Grid item xs={12} container spacing={1}>
              <Grid item xs={6}>
                <Typography fontSize="0.6rem">{texts.terms1}</Typography>
                <Typography fontSize="0.6rem">{texts.terms2}</Typography>
                <Typography fontSize="0.6rem">{texts.terms3}</Typography>
                <Typography fontSize="0.6rem">{texts.terms4}</Typography>
                <Typography fontSize="0.6rem">{texts.terms5}</Typography>
              </Grid>
              <Grid item xs={6}>
                <SignedArea name={`${document?.issuer.firstname} ${document?.issuer.lastname}`} date={document?.createdAt!} isCopy={document?.isCopy} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </StyledDocument>
      </Paper>
  )
}

export default DocumentViewFromPlayer

const StyledDocument = styled("div")`
  width: 60vh;
  height: 90vh;
  display: flex;
  align-content: center;
  justify-content: center;
`

const Description = styled(Typography)`
  font-size: 0.7rem;
`

const IssuerTitle = styled(Typography)`
  font-weight: bold;
  font-size: 0.6rem;
`

const IssuerData = styled(Typography)`
  font-size: 0.8rem;
`

const CityLogo = styled('img')`
  width: 14vh;
`