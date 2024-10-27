import {Component, inject, OnInit, TemplateRef} from '@angular/core';
import {APP_ROUTER_TOKENS} from "../../app-router-tokens";
import {ActivatedRoute, RouterLink, RouterModule} from "@angular/router";
import {pageLoadingAnimation} from "../../animations/page-loading-animation";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LoadingComponent} from "../../components/loading/loading.component";
import {EmployeeRepositoryService} from "../../services/repositories/employee-repository.service";
import {Observable, tap} from "rxjs";
import {ApiResponse} from "../../services/api/api-response";
import {EmployeeViewDto} from "../../models/employee/dtos/employee-view.dto";
import {AsyncPipe, NgIf, NgTemplateOutlet} from "@angular/common";
import {NotFoundComponent} from "../../components/not-found/not-found.component";
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-page',
  standalone: true,
  imports: [RouterLink, LoadingComponent, AsyncPipe, NgIf, NgTemplateOutlet, NotFoundComponent, RouterModule],
  templateUrl: './view-page.component.html',
  styleUrl: './view-page.component.scss',
  animations: pageLoadingAnimation
})
export class ViewPage implements OnInit{

  private readonly modalService = inject(NgbModal);
  private readonly location = inject(Location);
  private readonly activatedRoute = inject(ActivatedRoute);
  readonly employeeRepository = inject(EmployeeRepositoryService);

  employeeResponse!: Observable<ApiResponse<EmployeeViewDto>>;

  readonly routes = {
    create: `/${APP_ROUTER_TOKENS.CREATE}`,
    home: `/${APP_ROUTER_TOKENS.HOME}`,
    edit: `/${APP_ROUTER_TOKENS.EDIT}`,
  }

  employeeId!: number;


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
  }

  delete(){
    let employeeId = this.activatedRoute.snapshot.params['id'];

    this.employeeRepository.deleteEmployee(this.employeeId).subscribe({

    })
  }

  goBack() {
    this.location.back()
  }
}
