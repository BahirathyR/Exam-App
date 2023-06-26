import Exam from "../Exam";

export const examListDef = [

      {
          headerName: "Name",
          field: "name",
          sortable: true,
          filter: true
      },
      {
          headerName: "Total Questions",
          field: "totalquestions",
          sortable: true,
          filter: true
      },
      {
          headerName: "Total Correct Answers",
          field: "totalcorrectanswers",
          sortable: true,
          filter: true
      },
      {
          headerName: "Percentage",
          field: "percentage",
          sortable: true,
          filter: true
      },

      {
            headerName: "View",
            field: "view",
            // cellRenderer: "ButtonActionRenderer",
            sortable: true,
            filter: true
      }

  ]