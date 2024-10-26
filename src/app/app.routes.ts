import { Routes } from '@angular/router';
import {APP_ROUTER_TOKENS} from "./app-router-tokens";
import {HomePage} from "./pages/home/home-page.component";
import {CreatePage} from "./pages/create/create-page.component";
import {EditPage} from "./pages/edit/edit-page.component";
import {ViewPage} from "./pages/view/view-page.component";

export const routes: Routes = [
  {
    path: APP_ROUTER_TOKENS.HOME,
    component: HomePage,
  },
  {
    path: APP_ROUTER_TOKENS.CREATE,
    component: CreatePage,
  },
  {
    path: APP_ROUTER_TOKENS.EDIT,
    component: EditPage,
  },
  {
    path: APP_ROUTER_TOKENS.VIEW,
    component: ViewPage,
  },
];
