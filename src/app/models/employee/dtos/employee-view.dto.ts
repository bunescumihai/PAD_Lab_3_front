import {Employee} from "../employee.model";
import {Department} from "../../department/department.model";

export type EmployeeViewDto = Omit<Employee, "departmentId"> & {
  department: Department;
}
