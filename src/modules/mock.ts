import { VacanciesResult } from "./vacanciesApi";

export const VACANCIES_MOCK: VacanciesResult = { 
  vacancies: [
    {
      vacancy_id: 1,
      vacancy_name: "Водитель курьер",
      description: "Требуемый опыт работы: не требуется\nЧастичная занятость, гибкий график\nВозможно временное оформление: договор услуг, подряда, ГПХ, самозанятые, ИПХ\nВозможна подработка: сменами по 4-6 часов",
      money_from: "180000",
      money_to: "220000",
      city: "Москва",
      name_company: "Купер",
      peculiarities: "Нарушение слуха",
      url: "http://localhost:9000/images/2.png",
    },
    {
      vacancy_id: 2,
      vacancy_name: "Оператор контакт-центра",
      description: "Требуемый опыт работы: 1-2 года\nПолная занятость, гибкий график\nОформление по ТК РФ\nВозможна удаленная работа",
      money_from: "35000",
      money_to: "50000",
      city: "Москва",
      name_company: "Контакт Плюс",
      peculiarities: "Работа подходит для людей с ограниченными возможностями",
      url: "",
    },
  ],
};
