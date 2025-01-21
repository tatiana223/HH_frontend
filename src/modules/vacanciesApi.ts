export interface Vacancy {
  vacancy_id: number;
  description: string;
  vacancy_name: string;
  money_from: number;
  money_to: number;
  city: string;
  name_company: string;
  peculiarities: string;
  url: string;
}


export interface VacanciesResult {
  vacancies: Vacancy[];
}


export const VacanciesList = async (vacancy_name: string): Promise<VacanciesResult> => {
  const response = await fetch(`/api/vacancies/?vacancies_name=${vacancy_name}`);
  const data = await response.json();
  console.log("OOOOhhhO", data);
  return data
};

export const GetVacancyById = async (vacancy_id: number | string): Promise<Vacancy> => {
  const response = await fetch(`/api/vacancies/${vacancy_id}/`);
  const data = await response.json();
  console.log("OOOO0000O", data);
  return data
};



