import {FormBuilder, Validators} from "@angular/forms";

let fb = new FormBuilder();

export const activityForm = fb.group({
  entry: ['',[Validators.required]],
  exit: ['', [Validators.required]],
})
