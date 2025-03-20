export default interface RequestParamsType {
  __code?: "500";
  __dynamic?: boolean;
  __example?: FilterType;
}

export enum FilterType {
  "Все" = "all",
  "Android" = "android",
  "iOS" = "ios",
  "Дизайн" = "design",
  "Менеджмент" = "management",
  "QA" = "qa",
  "Бэк-офис" = "back_office",
  "Frontend" = "frontend",
  "HR" = "hr",
  "PR" = "pr",
  "Backend" = "backend",
  "Техподдержка" = "support",
  "Аналитика" = "analytics",
}

export type Departments =
  | "android"
  | "ios"
  | "design"
  | "management"
  | "qa"
  | "back_office"
  | "frontend"
  | "hr"
  | "pr"
  | "backend"
  | "support"
  | "analytics";
