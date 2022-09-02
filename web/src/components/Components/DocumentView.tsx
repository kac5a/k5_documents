import styled from "@emotion/styled"
import { Dialog, Box, Grid, Card, CardContent, Typography } from "@mui/material"
import moment from "moment"
import { useContext } from "react"
import { Context } from "../../context/Context"
import city_logo from "../../assets/city_logo.png"
import DocumentTitle from "./Forms/DocumentTitle"
import ViewDocumentField from "./ViewDocumentField"
import SignedArea from "./SignedArea"
import { DATE_FORMAT_SHORT } from "../../utils/consts"
import { texts } from "../../AppConfig"

const DocumentView = () => {
  const {isViewDocOpen, viewDocument: document, setViewDocOpen} = useContext(Context)

  return (
    <Dialog maxWidth="md" open={isViewDocOpen} onClose={() => {setViewDocOpen(false)}} scroll="body">
      <StyledDocument>
        <Box style={{width: 0}} sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={1}
            style={{padding: "40px"}}
          >
            <Grid item container xs={12} justifyContent="center" flex={1}>
              <DocumentTitle>{document?.name}</DocumentTitle>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={6}>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                  <img style={{height: "200px"}} src={city_logo} alt="Los Santos City" />
                </div>
              </Grid>
              <Grid item xs={6}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography style={{fontSize: "0.8rem"}}>{document?.description}</Typography>
                    <Grid container spacing={1} style={{marginTop: "8px"}}>
                      <Grid item xs={6} >
                        <Typography style={{ fontWeight: "bold", fontSize: "0.7rem" }}>{texts.issuerFirstname}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography style={{fontWeight: "bold", fontSize: "0.7rem"}}>{texts.issuerLastname}</Typography>
                      </Grid>

                      <Grid item xs={6} >
                        <Typography style={{ fontSize: "0.9rem" }}>{document?.issuer.firstname}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography style={{ fontSize: "0.9rem" }}>{document?.issuer.lastname}</Typography>
                      </Grid>


                      <Grid item xs={6}>
                        <Typography style={{fontWeight: "bold", fontSize: "0.7rem"}}>{texts.issuerDOB}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography style={{fontWeight: "bold", fontSize: "0.7rem"}}>{texts.issuerJob}</Typography>
                      </Grid>

                       <Grid item xs={6} >
                        <Typography style={{ fontSize: "0.9rem" }}>{moment(new Date(document?.issuer.birthDate || "")).format(DATE_FORMAT_SHORT)}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography style={{ fontSize: "0.9rem" }}>{ document?.issuer.jobName }</Typography>
                      </Grid>
                      
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid item container spacing={2} style={{ marginTop: "4px" }}>
              {document?.fields.map((f, i) => {
                return (
                  <Grid item xs={6} key={i}>
                    <ViewDocumentField name={f.name} value={f.value} />
                  </Grid>)
                })}
            </Grid>
            <Grid item container xs={12} flex={1}>
              <DocumentTitle style={{marginTop: "10px"}}>{document?.infoName}</DocumentTitle>
            </Grid>
            <Grid item container xs={12} flex={1}>
              <div style={{ width: "600px", marginTop: "16px", minHeight: "200px"}}>
                {document?.infoValue}
              </div>
            </Grid>
            <Grid item container xs={12} flex={1}>
              <DocumentTitle style={{ marginTop: "10px" }}>{texts.termsAndSigning}</DocumentTitle>
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
    </Dialog>
  )
}

export default DocumentView

const StyledDocument = styled("div")`
  width: 60vh;
  height: 90vh;
  display: flex;
  align-content: center;
  justify-content: center;
`