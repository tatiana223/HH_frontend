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

export const VACANCIES_MOCK: VacanciesResult = { 
  vacancies: [
    {
      vacancy_id: 1,
      vacancy_name: "Водитель курьер",
      description: "Требуемый опыт работы: не требуется\nЧастичная занятость, гибкий график\nВозможно временное оформление: договор услуг, подряда, ГПХ, самозанятые, ИПХ\nВозможна подработка: сменами по 4-6 часов",
      money_from: 180000,
      money_to: 220000,
      city: "Москва",
      name_company: "Купер",
      peculiarities: "Нарушение слуха",
      url: "http://localhost:9000/images/2.png",
    },
    {
      vacancy_id: 2,
      vacancy_name: "Оператор контакт-центра",
      description: "Требуемый опыт работы: 1-2 года\nПолная занятость, гибкий график\nОформление по ТК РФ\nВозможна удаленная работа",
      money_from: 3500,
      money_to: 50000,
      city: "Москва",
      name_company: "Контакт Плюс",
      peculiarities: "Нарушение слуха",
      url: "",
    },
  ],
};
