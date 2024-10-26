import {EmployeeViewDto} from "../models/employee/dtos/employee-view.dto";

export const employees: Array<EmployeeViewDto> = [
  {
    id: 100,
    firstName: "John",
    lastName: "Doe",
    employmentDate: "2020-05-15",
    department: {
      id: 101,
      name: "Marketing"
    },
    salary: 50000
  },
  {
    id: 101,
    firstName: "Jane",
    lastName: "Smith",
    employmentDate: "2019-08-12",
    department: {
      id: 102,
      name: "Engineering"
    },
    salary: 75000
  },
  {
    id: 102,
    firstName: "Michael",
    lastName: "Johnson",
    employmentDate: "2021-01-20",
    department: {
      id: 103,
      name: "Human Resources"
    },
    salary: 60000
  },
  {
    id: 103,
    firstName: "Emily",
    lastName: "Davis",
    employmentDate: "2018-03-10",
    department: {
      id: 104,
      name: "Finance"
    },
    salary: 65000
  },
  {
    id: 104,
    firstName: "David",
    lastName: "Wilson",
    employmentDate: "2017-11-22",
    department: {
      id: 105,
      name: "Sales"
    },
    salary: 55000
  }
];

