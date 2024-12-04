export const ROUTES = {
  HOME: "/",
  VACANCIES: "/vacancies",
};

export type RouteKeyType = keyof typeof ROUTES;

export const ROUTE_LABELS: { [key in RouteKeyType]: string } = {
  HOME: "Главная",
  VACANCIES: "Вакансии",
};
