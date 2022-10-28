export type CompanyId = {
  companyId: string
  jobFunctionIds?: string[]
  divisionIds?: string[]
  departmentIds?: string[]
  storeIds?: string[]
}

export type CompanyIdForm = {
  companyId: string
  ischecked?: boolean
  jobFunctionIds?: string[]
  divisionIds?: string[]
  departmentIds?: string[]
  storeIds?: string[]
}

export type FormValue = {
  companies: CompanyIdForm[]
}

export type GroupEmpType = {
  companies?: CompanyId[]
  salaryAdminPlanIds?: string[]
  employeeTypes?: string[]
  employeeClassificationIds?: string[]
  positionLevelIds?: string[]
}

export const groupEmpData: GroupEmpType = {
  companies: [
    {
      companyId: "1",

      jobFunctionIds: ["2c73c0f1-d844-48c5-a14d-863bda9438cc"],
      divisionIds: [
        "cf9c70ca-f436-4b89-8857-b0c232739060",
        "df5c9de7-79c0-420f-b0fe-9cb1089210e0",
      ],
      departmentIds: [
        "4ce48e41-0a9e-42f9-8741-82cd7a2e510e",
        "12c30e5b-5ece-45b4-a5e8-0f38f968e82d",
      ],
      storeIds: ["659d5c7a-ee2d-4d98-bbd7-8c30016efb23"],
    },
    {
      companyId: "2",
    },
    {
      companyId: "3",
    },
    {
      companyId: "4",
    },
    {
      companyId: "5",
    },
    {
      companyId: "6",
    },
    {
      companyId: "7",
    },
    {
      companyId: "8",
    },
    {
      companyId: "9",
    },
    {
      companyId: "10",
    },
    {
      companyId: "11",
    },
    {
      companyId: "12",
    },
    {
      companyId: "13",
    },
    {
      companyId: "14",
    },
    {
      companyId: "15",
    },
    {
      companyId: "16",
    },
    {
      companyId: "17",
    },
    {
      companyId: "18",
    },
    {
      companyId: "19",
    },
    {
      companyId: "20",
    },
    {
      companyId: "21",
    },
    {
      companyId: "22",
    },
    {
      companyId: "23",
    },
    {
      companyId: "24",
    },
    {
      companyId: "25",
    },
    {
      companyId: "26",
    },
    {
      companyId: "27",
    },
    {
      companyId: "28",
    },
    {
      companyId: "29",
    },
    {
      companyId: "30",
    },
    {
      companyId: "31",
    },
    {
      companyId: "32",
    },
    {
      companyId: "33",
    },
    {
      companyId: "35",
    },
    {
      companyId: "36",
    },
    {
      companyId: "37",
    },
    {
      companyId: "38",
    },
    {
      companyId: "39",
    },
  ],
}

export const companyData = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
]

export const jobData = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
]
