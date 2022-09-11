import {Button, Card, CardContent, Grid, IconButton, styled, TextField } from "@mui/material"
import { Box } from "@mui/system"
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { texts } from "../../../AppConfig";

type Props = {
  templateData?: DocumentTemplate
  handleCreate: (data: DocumentTemplate) => void
  handleEdit: (data: DocumentTemplate) => void
}

const CreateEditTemplate = ({templateData, handleCreate, handleEdit}: Props) => {
  const { register, handleSubmit, formState: { errors }, control } = useForm<DocumentTemplate>({
    defaultValues: templateData ?? {
      minGrade: null,
      documentName: "",
      documentDescription: "",
      fields: [],
      infoName: "",
      infoTemplate: ""
    }
  });
  const { fields: formFields, append, remove } = useFieldArray({
    control,
    name: "fields",
    rules: { required: texts.requiredError }
  })
  
  const handleCreateTemplate: SubmitHandler<DocumentTemplate> = (data: DocumentTemplate) => {
    handleCreate(data)
  }
  
  const handleEditTemplate: SubmitHandler<DocumentTemplate> = (data: DocumentTemplate) => {
    handleEdit(data)
  }

  return (
    <form onSubmit={templateData ? handleSubmit(handleEditTemplate) :  handleSubmit(handleCreateTemplate)}>
      <StyledDocument>
        <Box style={{width: "calc(60vh - 3.6vh)"}}>
          <Grid
            container
            spacing={1}
            width="100%"
          >
            <Grid item container xs={12} justifyContent="center" flex={1}>
              <div style={{ width: "27.7vh" }}>
                <DocTextField
                  size="small"
                  label={texts.docNameField}
                  error={!!errors.documentName}
                  helperText={errors.documentName?.message as string}
                  {...register("documentName", { required: texts.requiredError })}
                />
              </div>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={6}></Grid>
              <Grid item xs={6}>
                <Card elevation={2}>
                  <CardContent>
                    <DocTextField
                      size="small"
                      label={texts.docDescField}
                      error={!!errors.documentDescription}
                      helperText={errors.documentDescription?.message as string}
                      {...register("documentDescription", { required: texts.requiredError })}
                    />
                    <Grid container spacing={1} style={{marginTop: "8px"}}>
                      <Grid item xs={6} >
                        <DummyText></DummyText>
                      </Grid>
                      <Grid item xs={6}>
                        <DummyText></DummyText>
                      </Grid>
                      <Grid item xs={6}>
                        <DummyText></DummyText>
                      </Grid>
                      <Grid item xs={6}>
                        <DummyText></DummyText>
                      </Grid>
                      
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
                      style={{ width: "auto", flex: "1" }}
                      size="small"
                      label={texts.docFieldField}
                      error={!!errors.fields}
                      helperText={errors.fields?.message as string}
                      {...register(`fields.${i}.name`)}
                    />
                    <IconButton onClick={() => remove(i)}>
                      <DeleteIcon/>
                    </IconButton>
                    
                </Grid>)
              })}
              {formFields.length < 6 && (
                <Grid item xs={6}>
                  <Button onClick={() => append({name: "", value: ""})}
                    style={{ width: "100%" }}
                    variant="outlined"
                    startIcon={<AddIcon/>}
                  >{texts.docAddField}</Button>
                </Grid>)
              }
            </Grid>
            <Grid item container xs={12} flex={1}>
              <div style={{ width: "55.5vh", marginTop: "1.5vh"}}>
                <DocTextField
                  label={texts.docInfoNameField}
                  size="small"
                  error={!!errors.infoName}
                  helperText={errors.infoName?.message as string}
                  {...register("infoName", { required: texts.requiredError })}
                />
              </div>
            </Grid>
            <Grid item container xs={12} flex={1}>
              <div style={{ width: "55.5vh", marginTop: "1.5vh"}}>
                <DocTextField multiline rows={8}
                  label={texts.docInfoValueField}
                  size="small"
                  error={!!errors.infoTemplate}
                  helperText={errors.infoTemplate?.message as string}
                  {...register("infoTemplate", { required: texts.requiredError })}
                />
              </div>
            </Grid>
            <Grid item container xs={12} flex={1}>
              <div style={{ width: "55.5vh", marginTop: "1.5vh"}}>
                <DocTextField
                  type="number"
                  label={texts.docMinGradeField}
                  size="small"
                  {...register("minGrade")}
                />
              </div>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" flex={1} style={{ marginTop: "1.5vh" }}>
            <Button type="submit" variant="contained" color="success" >{templateData ? texts.editTemplateBtn : texts.createTemplateBtn}</Button>
          </Grid>
        </Box>
      </StyledDocument>
    </form>
  )
}

export default CreateEditTemplate

const StyledDocument = styled("div")`
  width: 60vh;
  height: 90vh;
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 1.8vh;
  
`

const DocTextField = styled(TextField)`
  width: 100%;
`

const DummyText = styled("div")`
  height: 1.8vh;
  background: lightgray;
  border-radius: 1px;
  width: 100%
`