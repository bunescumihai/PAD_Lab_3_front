import {Component, inject} from '@angular/core';
import {EmployeeListItemComponent} from "../../components/employee-list-item/employee-list-item.component";
import {RouterLink} from "@angular/router";
import {APP_ROUTER_TOKENS} from "../../app-router-tokens";
import {pageLoadingAnimation} from "../../animations/page-loading-animation";
import {employees} from "../../moks/employees";
import {AsyncPipe, NgFor, NgIf} from "@angular/common";
import {LoadingComponent} from "../../components/loading/loading.component";
import {EmployeeRepositoryService} from "../../services/repositories/employee-repository.service";
import {tap} from "rxjs";
import {NotFoundComponent} from "../../components/not-found/not-found.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    EmployeeListItemComponent,
    RouterLink,
    NgFor,
    NgIf,
    LoadingComponent,
    AsyncPipe,
    NotFoundComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  animations: pageLoadingAnimation
})
export class HomePage {
  private employeeRepository = inject(EmployeeRepositoryService);


  readonly routes = {
    create: `/${APP_ROUTER_TOKENS.CREATE}`,
    home: `/${APP_ROUTER_TOKENS.HOME}`
  }

  employeesResponse = this.employeeRepository.employees.pipe(
    tap(data => console.log(data))
  );


}
