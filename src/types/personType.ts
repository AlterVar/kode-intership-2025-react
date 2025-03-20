import { Departments } from "./requestParamsType";

export interface PersonType {
  id: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  userTag: string;
  department: Departments;
  position: string;
  birthday: string;
  phone: string;
}
