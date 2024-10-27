import {Component, Input} from '@angular/core';
import {EmployeeViewDto} from "../../models/employee/dtos/employee-view.dto";
import {RouterLink} from "@angular/router";
import {APP_ROUTER_TOKENS} from "../../app-router-tokens";

@Component({
  selector: 'app-employee-list-item',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './employee-list-item.component.html',
  styleUrl: './employee-list-item.component.scss'
})
export class EmployeeListItemComponent {
  @Input() employee!: EmployeeViewDto;

  readonly routes = {
    view: `/${APP_ROUTER_TOKENS.VIEW}`,
  }
}
