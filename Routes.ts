export const ROUTES = {
  HOME: "/",
  VACANCIES: "/vacancies",
  LOGIN: "/login",
  REGISTER: "/register",
  PROFILE: "/user",
  RESPONSE: "/response",
  VACANCIESEDIT: "/vacancies/edit",
  VACANCIESCREATE: "/vacancies/create",
  FORBIDDEN: "/forbidden",
  NOTFOUND: "/notfound",
};

export type RouteKeyType = keyof typeof ROUTES;

export const ROUTE_LABELS: { [key in RouteKeyType]: string } = {
  HOME: "Главная",
  VACANCIES: "Вакансии",
  LOGIN: "Авторизация",
  PROFILE: "Личный кабинет",
  REGISTER: "Регистрация",
  RESPONSE: "Заявки",
  VACANCIESEDIT: "Управление вакансиями",
  VACANCIESCREATE: "Создание вакансии",
  FORBIDDEN: "Доступ запрещен",
  NOTFOUND: "Не найдено",
};
