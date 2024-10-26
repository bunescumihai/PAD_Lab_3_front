import { Component } from '@angular/core';
import {APP_ROUTER_TOKENS} from "../../app-router-tokens";
import {RouterLink} from "@angular/router";
import {pageLoadingAnimation} from "../../animations/page-loading-animation";

@Component({
  selector: 'app-view-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './view-page.component.html',
  styleUrl: './view-page.component.scss',
  animations: pageLoadingAnimation
})
export class ViewPage {
  readonly routes = {
    create: `/${APP_ROUTER_TOKENS.CREATE}`,
    home: `/${APP_ROUTER_TOKENS.HOME}`
  }
}
