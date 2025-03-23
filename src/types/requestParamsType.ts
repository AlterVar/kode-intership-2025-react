export default interface RequestParamsType {
  __code?: "500";
  __dynamic?: boolean;
  __example?: Departments | "all";
}

export type CacheConfig = {
  override: true;
};

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
