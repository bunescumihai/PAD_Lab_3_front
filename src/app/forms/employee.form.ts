import {FormBuilder, Validators} from "@angular/forms";

let fb = new FormBuilder();

export const employeeForm = fb.group({
  firstName: ['', [Validators.required, Validators.minLength(2)]],
  lastName: ['',[Validators.required, Validators.minLength(2)]],
  employmentDate: ['', [Validators.required]],
  salary: [0, [Validators.required]],
  departmentId: [0,[Validators.required]]
})
