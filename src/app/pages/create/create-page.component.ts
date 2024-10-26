import { Component } from '@angular/core';
import {pageLoadingAnimation} from "../../animations/page-loading-animation";
import {APP_ROUTER_TOKENS} from "../../app-router-tokens";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-create-page',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './create-page.component.html',
  styleUrl: './create-page.component.scss',
  animations: pageLoadingAnimation
})
export class CreatePage{
  readonly routes = {
    create: `/${APP_ROUTER_TOKENS.CREATE}`,
    home: `/${APP_ROUTER_TOKENS.HOME}`
  }
}
