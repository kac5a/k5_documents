declare type Page = {
  index: number
  title: string,
  component: JSX.Element,
  iconComponent: JSX.Element
  bossOnly?: boolean
  jobAccess?: boolean
}

declare type Job = {
  grade: number
  grade_label: string
  grade_name: string
  label: string
  name: string
  isBoss: boolean
}

declare type Field = {
  name: string
  value: string
}

declare type K5Document = {
  id?: string
  name: string
  customName?: string
  job?: string
  createdAt: string
  description: string
  fields: Field[]
  infoName: string
  infoValue: string
  isCopy: boolean
  issuer: {
    firstname: string
    lastname: string
    birthDate: string
    jobName: string
  }
}

type DocumentTemplate = {
  id?: string
  minGrade: number | null
  documentName: string
  documentDescription: string
  fields: Field[]
  infoName: string
  infoTemplate: string
}

type Texts = {
  [k: string]: string
}

type PlayerData = {
  firstname: string,
  lastname: string,
  dateofbirth: string
}