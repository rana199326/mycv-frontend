import { educationFormData, schoolFormData } from "../types/Education";
export const educationData: educationFormData[] = [
    {
        id: 1,
        degreeName: "Licence en Informatique",
        status: "Diplômé",
        level: "Bac +3",
        graduationDate: "2020-06-15",
    },
    {
        id: 2,
        degreeName: "Master en Intelligence Artificielle",
        status: "En cours",
        level: "Bac +5",
        graduationDate: "",
    },
    ];
export const schoolData: schoolFormData[]= [
    {
    id: 1,
    name: "École Polytechnique",
    city: "Palaiseau",
    country: "France",
    },
    {
        id: 2,
        name: "Université Paris-Saclay",
        city: "Orsay",
        country: "France",
    },
]
;