import { Component } from '@angular/core';
import {EmployeeListItemComponent} from "../../components/employee-list-item/employee-list-item.component";
import {RouterLink} from "@angular/router";
import {APP_ROUTER_TOKENS} from "../../app-router-tokens";
import {pageLoadingAnimation} from "../../animations/page-loading-animation";
import {employees} from "../../moks/employees";
import {NgFor} from "@angular/common";
import {LoadingComponent} from "../../components/loading/loading.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
    imports: [
        EmployeeListItemComponent,
        RouterLink,
        NgFor,
        LoadingComponent
    ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  animations: pageLoadingAnimation
})
export class HomePage {
  readonly routes = {
    create: `/${APP_ROUTER_TOKENS.CREATE}`,
    home: `/${APP_ROUTER_TOKENS.HOME}`
  }

  employees = employees;
}
