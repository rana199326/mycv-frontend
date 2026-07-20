import { Experience } from "src/types/Experience";

export const experienceData: Experience[] = [
  {
    id: 0,
    name: "Ingénieur développeur C#",
    employer_id: 1,
    start_date: new Date("2023-05-01"),
    end_date: new Date("2024-03-31"),
    responsibilities: [
      {
        responsibility_id: 1,
        responsibility: "Microsoft.Net, UML, méthodes Agiles.",
      },
      {
        responsibility_id: 2,
        responsibility:
          "Développer des IHM (WPF), des WebServices (WCF) et des interactions avec la base de données SQL Server",
      },
    ],
    created_At: new Date("2023-05-01"),
  },
  {
    id: 2,
    name: "Développeur web",
    employer_id: 2,
    start_date: new Date("2022-10-01"),
    end_date: new Date("2023-04-30"),
    responsibilities: [
      {
        responsibility_id: 1,
        responsibility: "PHP, MySQL, JavaScript, HTML, CSS",
      },
      {
        responsibility_id: 2,
        responsibility: "Agile, Scrum, Kanban",
      },
    ],
    created_At: new Date("2023-05-01"),
  },
];
