import {FormBuilder, Validators} from "@angular/forms";

let fb = new FormBuilder();

export const employeeForm = fb.group({
  firstName: ['', [Validators.required]],
  lastName: ['',[Validators.required]],
  employmentDate: ['', [Validators.required]],
  salary: [0, [Validators.required]],
  departmentId: [0,[Validators.required]]
})
