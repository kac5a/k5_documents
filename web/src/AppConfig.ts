declare var TEXTS: { [key: string]: string }
declare var COLORS: { [key: string]: string }
declare var AVAILABLE_JOBS: {job:string, templateGrades: number[], logo?: string}[]
declare var CITIZEN_TEMPLATES: DocumentTemplate[]

export const texts = typeof TEXTS === "undefined" ? {} : TEXTS
export const colors = typeof COLORS === "undefined" ? {} : COLORS
export const availableJobs = typeof AVAILABLE_JOBS === "undefined" ? [] : AVAILABLE_JOBS
export const citizenTemplates = typeof CITIZEN_TEMPLATES === "undefined" ? [] : CITIZEN_TEMPLATES