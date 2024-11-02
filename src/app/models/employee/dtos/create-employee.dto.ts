import {Employee} from "../employee.model";

export type CreateEmployeeDto = Omit<Employee, "id">;
