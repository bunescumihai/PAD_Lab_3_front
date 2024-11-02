import {Component, inject, OnInit, signal, TemplateRef} from '@angular/core';
import {APP_ROUTER_TOKENS} from "../../app-router-tokens";
import {ActivatedRoute, Router, RouterLink, RouterModule} from "@angular/router";
import {pageLoadingAnimation} from "../../animations/page-loading-animation";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LoadingComponent} from "../../components/loading/loading.component";
import {EmployeeRepositoryService} from "../../services/repositories/employee-repository.service";
import {Observable, tap} from "rxjs";
import {ApiResponse} from "../../services/api/api-response";
import {EmployeeViewDto} from "../../models/employee/dtos/employee-view.dto";
import {AsyncPipe, NgFor, NgIf, NgTemplateOutlet} from "@angular/common";
import {NotFoundComponent} from "../../components/not-found/not-found.component";
import { Location } from '@angular/common';
import {ActivityRepositoryService} from "../../services/repositories/activity-repository.service";
import {Activity} from "../../models/activity/activity.model";
import {ActivityComponent} from "../../components/activity/activity.component";
import {routes} from "../../app.routes";
import {activityForm} from "../../forms/activity.form";
import {CreateActivityDto} from "../../models/activity/dtos/create-activity.dto";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-view-page',
  standalone: true,
  imports: [RouterLink, LoadingComponent, AsyncPipe, NgIf, NgFor, NgTemplateOutlet, NotFoundComponent, RouterModule, ActivityComponent, ReactiveFormsModule],
  templateUrl: './view-page.component.html',
  styleUrl: './view-page.component.scss',
  animations: pageLoadingAnimation
})
export class ViewPage implements OnInit{

  private readonly modalService = inject(NgbModal);
  private readonly location = inject(Location);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly employeeRepository = inject(EmployeeRepositoryService);
  readonly activityRepository = inject(ActivityRepositoryService);

  employeeResponse!: Observable<ApiResponse<EmployeeViewDto>>;
  activityResponse!: Observable<ApiResponse<Array<Activity>>>;

  readonly routes = {
    create: `/${APP_ROUTER_TOKENS.CREATE}`,
    home: `/${APP_ROUTER_TOKENS.HOME}`,
    edit: `/${APP_ROUTER_TOKENS.EDIT}`,
  }

  createActivityForm = activityForm;

  employeeId!: number;
  deleting = signal<boolean>(false);
  savingActivity = signal<boolean>(false);
  showActivityErrors = signal<boolean>(false);


  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true });
  }

  ngOnInit(): void {
    this.employeeId = this.activatedRoute.snapshot.params['id'];
    this.employeeResponse = this.employeeRepository.getEmployeeById(this.employeeId).pipe(
      tap(data  => {
        console.log(data);
      })
    );

    this.activityResponse = this.activityRepository.getActivitiesByEmployeeById(this.employeeId).pipe(
      tap(data  => {
        console.log(data);
      })
    );
  }

  delete(){
    this.employeeRepository.deleteEmployee(this.employeeId).pipe(
      tap(data => {
        this.deleting.set(data.loading);
        console.log(data);
      })
    ).subscribe(data =>{
      if(data.object && !data.error){
        window.location.href = this.routes.home;
      }
    });
  }

  saveActivity(){
    if(!this.createActivityForm.valid){
      this.showActivityErrors.set(true);
      return;
    }


    let activity: CreateActivityDto = {
      employeeId: this.employeeId!,
      entry: this.createActivityForm.controls.entry.value!,
      exit: this.createActivityForm.controls.exit.value!,
    }

    console.log("activity", activity);

    this.activityRepository.createActivity(activity).pipe(
      tap((data) => {
        this.savingActivity.set(data.loading);
      })
    ).subscribe(
      data => {
        if(data.object && !data.error){
          location.reload();
        }
      }
    )
  }

  goBack() {
    this.location.back()
  }

}
