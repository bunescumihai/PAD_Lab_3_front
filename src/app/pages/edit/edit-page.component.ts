import {Component, inject, OnInit, signal, TemplateRef} from '@angular/core';
import {pageLoadingAnimation} from "../../animations/page-loading-animation";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {APP_ROUTER_TOKENS} from "../../app-router-tokens";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AsyncPipe, Location, NgIf} from "@angular/common";
import {employeeForm} from "../../forms/employee.form";
import {LoadingComponent} from "../../components/loading/loading.component";
import {NotFoundComponent} from "../../components/not-found/not-found.component";
import {ReactiveFormsModule} from "@angular/forms";
import {EmployeeRepositoryService} from "../../services/repositories/employee-repository.service";
import {Observable, tap} from "rxjs";
import {ApiResponse} from "../../services/api/api-response";
import {EmployeeViewDto} from "../../models/employee/dtos/employee-view.dto";
import {Employee} from "../../models/employee/employee.model";

@Component({
  selector: 'app-edit-page',
  standalone: true,
  imports: [
    RouterLink,
    LoadingComponent,
    NotFoundComponent,
    ReactiveFormsModule,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.scss',
  animations: pageLoadingAnimation
})
export class EditPage implements OnInit{

  private readonly location = inject(Location);
  private readonly activateRoute = inject(ActivatedRoute);
  private readonly employeeRepository = inject(EmployeeRepositoryService);

  readonly routes = {
    create: `/${APP_ROUTER_TOKENS.CREATE}`,
    home: `/${APP_ROUTER_TOKENS.HOME}`
  }

  editEmployeeForm = employeeForm;

  employeeResponse!: Observable<ApiResponse<EmployeeViewDto>>;

  employeeData!:Employee;

  showErrors = signal<boolean>(false);

  goBack() {
    this.location.back();
  }

  ngOnInit(): void {
    let employeeId = this.activateRoute.snapshot.params['id'];

    this.employeeResponse = this.employeeRepository.getEmployeeById(employeeId).pipe(
      tap(data => {
        if(!data.loading && !data.error && data.object){
          console.log(data);
          const { department, ...rest } = data.object;

          this.employeeData = { ...rest, departmentId: data.object.id };

          this.editEmployeeForm.patchValue(this.employeeData);
        }
      })
    )
  }

  resetFormValues() {
    this.editEmployeeForm.patchValue(this.employeeData);
  }

  saveChanges(){
    let employeeId = this.activateRoute.snapshot.params['id'];
    if(!this.editEmployeeForm.valid){
      this.showErrors.set(true);
      return;
    }

    let employee: Employee = {
      id: employeeId,
      firstName: this.editEmployeeForm.controls.firstName.value!,
      lastName: this.editEmployeeForm.controls.lastName.value!,
      employmentDate: this.editEmployeeForm.controls.employmentDate.value!,
      departmentId: this.editEmployeeForm.controls.departmentId.value!,
      salary: this.editEmployeeForm.controls.salary.value!
    }

    this.employeeRepository.updateEmployee(employee).subscribe();
  }
}
