import { Component } from '@angular/core';
import {pageLoadingAnimation} from "../../animations/page-loading-animation";
import {RouterLink} from "@angular/router";
import {APP_ROUTER_TOKENS} from "../../app-router-tokens";

@Component({
  selector: 'app-edit-page',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.scss',
  animations: pageLoadingAnimation
})
export class EditPage {
  readonly routes = {
    create: `/${APP_ROUTER_TOKENS.CREATE}`,
    home: `/${APP_ROUTER_TOKENS.HOME}`
  }
}
