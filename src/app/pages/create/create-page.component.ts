import {Component, inject, OnInit, signal} from '@angular/core';
import {pageLoadingAnimation} from "../../animations/page-loading-animation";
import {APP_ROUTER_TOKENS} from "../../app-router-tokens";
import {RouterLink} from "@angular/router";
import {employeeForm} from "../../forms/employee.form";
import {ReactiveFormsModule} from "@angular/forms";
import {NgIf, Location} from "@angular/common";

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
  readonly routes = {
    create: `/${APP_ROUTER_TOKENS.CREATE}`,
    home: `/${APP_ROUTER_TOKENS.HOME}`
  }

  createEmployeeForm = employeeForm;

  showErrors = signal<boolean>(false);

  save() {
    console.log(employeeForm.value);
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
