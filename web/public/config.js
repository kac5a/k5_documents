// These are the jobs that can create documents. The ranks in templateGrades can create templates for this job.
const AVAILABLE_JOBS = [
  {
    job: 'police',
    templateGrades: [3, 4],
    logo: 'https://i.imgur.com/YsTyMCc.png',
  },
  {
    job: 'ambulance',
    templateGrades: [3],
    logo: 'https://i.pinimg.com/564x/6b/88/4f/6b884f7ebe28ff56a0e1fd9f5c47890a.jpg',
  },
  {
    job: 'mechanic',
    templateGrades: [4],
    logo: '/web/build/mechaniclogo.jpg',
  },
]

// These templates are visible to all players. If you don't want
// any citizen templates, delete everything inside the [] like this:
//    const CITIZEN_TEMPLATES = []
//
// If these templates are empty, the issued documents tab will
// not be visible to players who fon't have a specified job.
const CITIZEN_TEMPLATES = [
  {
    id: 'citizen_contract',
    documentName: 'Citizen Contract',
    documnetDescription:
      'This is a document between two citizens of Los Santos. This document is an official legal document.',
    fields: [
      {
        name: 'Firstname',
        value: '',
      },
      {
        name: 'Lastname',
        value: '',
      },
      {
        name: 'Valid Until',
        value: '',
      },
    ],
    infoName: 'INFORMATION',
    infoTemplate: '',
  },
]

const COLORS = {
  // These are hexadecimal color codes for the main theme. You can change them as you wish.
  // Primary colors are colors of buttons, and some texts, while secondary color is used for the cancel button.
  primary: '#E37777',
  secondary: '#DCAF62',

  // These two should stay RGBA to give them a 90% opacity. Only change the first 3 numbers with any RGB code
  // i.e. rgba([red], [green], [blue], 0.9)
  menuGradientBottom: 'rgba(209, 142, 142, 0.9)',
  menuGradientTop: 'rgba(243, 243, 203, 0.9)',
}

// These are the texts that show up on the NUI. Translate them as you wish. If you'd like to change
// the client texts, go to the config.lua file.

const TEXTS = {
  myDocumentsTitle: 'My Documents',
  issuedDocumentsTitle: 'Issued Documents',
  templatesTitle: 'Templates',
  customDocumentName: 'Document Name',
  documentType: 'Type',
  documentName: 'Name',
  unnamed: 'Unnamed',
  actions: 'Actions',
  edit: 'Edit',
  cancel: 'Cancel',
  delete: 'Delete',
  view: 'View',
  show: 'Show',
  copy: 'Copy',
  newTemplateBtn: 'New Template',
  deleteTemplateTitle: 'Delete Template',
  deleteTemplateQuestion: 'Are you sure you want to delete this template?:',
  date: 'Date',
  newDocumentBtn: 'New Document',
  newCitizenDocumentBtn: 'New Citizen Document',
  deleteDocumentTitle: 'Delete Document',
  deleteDocumentQuestion: 'Are you sure you want to delete this document?:',
  signHereText: 'Sign Here',
  selectDocumentType: 'Select a document type',
  cannotIssueDocument: 'You cannot issue a document with this job',
  issuerFirstname: 'ISSUER FIRSTNAME',
  issuerLastname: 'ISSUER LASTNAME',
  issuerDOB: 'ISSUER DOB',
  issuerJob: 'ISSUER JOB',
  termsAndSigning: 'TERMS AND SIGNING',
  terms1: 'This document, when signed, becomes an official document.',
  terms2:
    'By signing this document you are legally bound for its context and accept every legal consequence it may generate.',
  terms3:
    'Every copy of this document is equal in value of its original. Be extra careful when giving copies.',
  terms4:
    "Make sure you are fully aware of this document's context before you sign.",
  terms5: "Don't hesitate to seek help from legal council before signing.",
  requiredError: 'This field is required',
  docNameField: 'DOCUMENT NAME',
  docDescField: 'DOCUMENT DESCRIPTION',
  docFieldField: 'FIELD NAME',
  docAddField: 'Add Field',
  docInfoNameField: 'INFORMATION TITLE',
  docInfoValueField: 'INFORMATION TEMPLATE',
  docMinGradeField: 'MINIMUM JOB GRADE',
  editTemplateBtn: 'EDIT TEMPLATE',
  createTemplateBtn: 'CREATE TEMPLATE',
  createDocumentBtn: 'CREATE DOCUMENT',
  documentCopy: 'COPY',
}
