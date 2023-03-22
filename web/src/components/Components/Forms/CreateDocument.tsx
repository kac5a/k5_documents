import {Button, Card, CardContent, Grid, styled, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import DocumentTitle from "./DocumentTitle";
import { usePlayerData } from "../../../hooks/usePlayerData";
import moment from "moment"
import { useJob } from "../../../hooks/useJob";
import { useState } from "react";
import SignButton from "./SignButton";
import { DATE_FORMAT_SHORT } from "../../../utils/consts";
import { texts } from "../../../AppConfig";

type Props = {
  template: DocumentTemplate
  handleCreate: (data: K5Document) => void
  handleClose: () => void
  logoSrc: string
  isCitizen?: boolean
}

const CreateDocument = ({ template, handleCreate, handleClose, logoSrc, isCitizen }: Props) => {
  
  const { playerData } = usePlayerData()
  const { job } = useJob()

  const [isSigned, setSigned] = useState(false)

  const { register, handleSubmit, formState: { errors }, control } = useForm<K5Document>({
    defaultValues: {
      name: template.documentName,
      createdAt: "",
      description: template.documentDescription,
      fields: template.fields,
      isCopy: false,
      infoName: template.infoName,
      infoValue: template.infoTemplate,
      issuer: {
        firstname: playerData?.firstname,
        lastname: playerData?.lastname,
        birthDate: moment(new Date(playerData?.dateofbirth || "")).format(DATE_FORMAT_SHORT),
        jobName: job?.label
      }
    }
  });

  const { fields: formFields } = useFieldArray({
    control,
    name: "fields",
    rules: { required: texts.requiredError }
  })



  const handleCreateDocument: SubmitHandler<K5Document> = (data: K5Document) => {
    let result = {
      name: data.name,
      createdAt: (new Date()).toString(),
      customName: data.customName?.length ? data.customName : undefined,
      job: !isCitizen ? job?.name : undefined,
      description: data.description,
      fields: data.fields,
      isCopy: false,
      infoName: data.infoName,
      infoValue: data.infoValue,
      issuer: {
        firstname: playerData?.firstname,
        lastname: playerData?.lastname,
        birthDate: moment(new Date(playerData?.dateofbirth || "")).format(DATE_FORMAT_SHORT),
        jobName: !isCitizen ? job?.label : undefined
      }
    } as K5Document

    handleCreate(result)
  }

  return (
    <form onSubmit={handleSubmit(handleCreateDocument)}>
      <StyledDocument>
        <Box style={{width: 0}} sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={1}
            style={{padding: "3.5vh"}}
          >
            <Grid item container xs={12} justifyContent="center" flex={1}>
              <DocumentTitle>{template.documentName}</DocumentTitle>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={6}>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                  <img style={{height: "18.5vh"}} src={logoSrc} alt="Los Santos City" />
                </div>
              </Grid>
              <Grid item xs={6}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography style={{fontSize: "0.8rem"}}>{template.documentDescription}</Typography>
                    <Grid container spacing={1} style={{marginTop: "8px"}}>
                      <Grid item xs={6} >
                        <Typography style={{ fontWeight: "bold", fontSize: "0.7rem" }}>{texts.issuerFirstname}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography style={{fontWeight: "bold", fontSize: "0.7rem"}}>{texts.issuerLastname}</Typography>
                      </Grid>

                      <Grid item xs={6} >
                        <Typography style={{ fontSize: "0.9rem" }}>{playerData?.firstname}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography style={{ fontSize: "0.9rem" }}>{playerData?.lastname}</Typography>
                      </Grid>


                      <Grid item xs={6}>
                        <Typography style={{fontWeight: "bold", fontSize: "0.7rem"}}>{texts.issuerDOB}</Typography>
                      </Grid>
                      {!isCitizen ? <Grid item xs={6}>
                        <Typography style={{fontWeight: "bold", fontSize: "0.7rem"}}>{texts.issuerJob}</Typography>
                      </Grid> :
                        <Grid item xs={6} />}

                       <Grid item xs={6} >
                        <Typography style={{ fontSize: "0.9rem" }}>{moment(new Date(playerData?.dateofbirth || "")).format(DATE_FORMAT_SHORT)}</Typography>
                      </Grid>
                      {!isCitizen ? <Grid item xs={6}>
                        <Typography style={{ fontSize: "0.9rem" }}>{ job?.label }</Typography>
                      </Grid> : <Grid item xs={6} />}
                      
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid item container spacing={2} style={{ marginTop: "4px" }}>
              {formFields.map((f, i) => {
                return (
                  <Grid item xs={6} key={f.id}>
                    <DocTextField
                      size="small"
                      label={f.name}
                      error={!!errors.fields}
                      helperText={errors.fields?.message as string}
                      {...register(`fields.${i}.value`)}
                    />
                    
                </Grid>)
              })}
            </Grid>
            <Grid item container xs={12} flex={1}>
              <DocumentTitle style={{marginTop: "1vh"}}>{template.infoName}</DocumentTitle>
            </Grid>
            <Grid item container xs={12} flex={1}>
              <div style={{ width: "55.5vh", marginTop: "1.5vh"}}>
                <DocTextField multiline rows={8}
                  label={template.infoName}
                  size="small"
                  error={!!errors.infoValue}
                  helperText={errors.infoValue?.message as string}
                  {...register("infoValue", { required: texts.requiredError })}
                />
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
                <SignButton name={`${playerData?.firstname} ${playerData?.lastname}`} isSigned={isSigned} setSigned={setSigned} />
              </Grid>
            </Grid>
            <Grid item container justifyContent="center" flex={1} style={{ marginTop: "1.5vh" }}>
              <DocTextField
                size="small"
                label={texts.customDocumentName}
                error={!!errors.customName}
                style={{width: "auto", marginRight: "auto", justifySelf: "flex-start"}}
                helperText={errors.customName?.message as string}
                {...register("customName")}
              />
              <Button disabled={!isSigned} type="submit" variant="contained" color="success" >{texts.createDocumentBtn}</Button>
              <Button variant="contained" color="secondary" style={{marginLeft: "1.8vh"}} onClick={handleClose} >{texts.cancel}</Button>
            </Grid>
          </Grid>
          
        </Box>
      </StyledDocument>
    </form>
  )
}

export default CreateDocument

const StyledDocument = styled("div")`
  width: 60vh;
  height: 90vh;
  display: flex;
  align-content: center;
  justify-content: center;
  
`

const DocTextField = styled(TextField)`
  width: 100%;
`