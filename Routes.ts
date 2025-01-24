export const ROUTES = {
  HOME: "/",
  VACANCIES: "/vacancies",
  LOGIN: "/login",
  PROFILE: "/user",
  RESPONSE: "/responses",
};

export type RouteKeyType = keyof typeof ROUTES;

export const ROUTE_LABELS: { [key in RouteKeyType]: string } = {
  HOME: "Главная",
  VACANCIES: "Вакансии",
  LOGIN: "Авторизация",
  PROFILE: "Личный кабинет",
  RESPONSE: "Заявки",
};
