import {Component, inject, OnInit, signal} from '@angular/core';
import {pageLoadingAnimation} from "../../animations/page-loading-animation";
import {APP_ROUTER_TOKENS} from "../../app-router-tokens";
import {Router, RouterLink} from "@angular/router";
import {employeeForm} from "../../forms/employee.form";
import {ReactiveFormsModule} from "@angular/forms";
import {NgIf, Location} from "@angular/common";
import {EmployeeRepositoryService} from "../../services/repositories/employee-repository.service";
import {Employee} from "../../models/employee/employee.model";
import {CreateEmployeeDto} from "../../models/employee/dtos/create-employee.dto";
import {tap} from "rxjs";
import {routes} from "../../app.routes";

@Component({
  selector: 'app-create-page',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './create-page.component.html',
  styleUrl: './create-page.component.scss',
  animations: pageLoadingAnimation
})
export class CreatePage implements OnInit{

  private readonly location = inject(Location);
  private readonly employeeRepository = inject(EmployeeRepositoryService);
  private readonly router = inject(Router);

  readonly routes = {
    create: `/${APP_ROUTER_TOKENS.CREATE}`,
    home: `/${APP_ROUTER_TOKENS.HOME}`,
    view: `/${APP_ROUTER_TOKENS.VIEW}`
  }

  createEmployeeForm = employeeForm;

  showErrors = signal<boolean>(false);
  saving = signal<boolean>(false);

  save() {
    console.log(employeeForm.value);

    if(this.createEmployeeForm.valid){
      let emp: CreateEmployeeDto = {
        firstName: this.firstName.value || '',
        lastName: this.lastName.value || '',
        employmentDate: this.employmentDate.value|| '',
        departmentId: this.departmentId.value || 0,
        salary: this.salary.value || 0
      }

      this.employeeRepository.createEmployee(emp).pipe(
        tap((data) => {
          this.saving.set(data.loading);
        })
      ).subscribe(
        data => {
          if(data.object && !data.error){
            this.router.navigate([this.routes.view, data.object.id])
          }
        }
      );

    }else{
      this.showErrors.set(true);
    }

  }

  get firstName(){
    return employeeForm.controls.firstName;
  }

  get lastName(){
    return employeeForm.controls.lastName;
  }

  get employmentDate(){
    return employeeForm.controls.employmentDate;
  }

  get departmentId(){
    return employeeForm.controls.departmentId;
  }

  get salary(){
    return employeeForm.controls.salary;
  }

  goBack() {
    this.location.back();
  }

  ngOnInit(): void {
    this.createEmployeeForm.reset();
  }

}
