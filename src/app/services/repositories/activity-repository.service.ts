// noinspection TypeScriptValidateTypes

import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of, startWith} from "rxjs";
import {ApiResponse} from "../api/api-response";
import {EmployeeViewDto} from "../../models/employee/dtos/employee-view.dto";
import {Employee} from "../../models/employee/employee.model";
import {Activity} from "../../models/activity/activity.model";

@Injectable({
  providedIn: 'root'
})
export class ActivityRepositoryService {

  private readonly http = inject(HttpClient);
  constructor() { }

  getActivitiesByEmployeeById(id: number): Observable<ApiResponse<Array<Activity>>>{
    return this.http.get<Array<Activity>>(`/api/activity/${id}`)
      .pipe(
        map(data => ({
          loading: false,
          error: null,
          object: data,
        })),
        startWith({
          loading: true,
          error: null,
          object: null
        }),
        catchError(err => of({
          loading: false,
          error: err,
          object: null,
        }))
      )
  }

  createActivity(activity: Activity){

    return this.http.post<Activity>(`/api/activity`, activity)
      .pipe(
        map(data => ({
          loading: false,
          error: null,
          object: data,
        })),
        startWith({
          loading: true,
          error: null,
          object: null
        }),
        catchError(err => of({
          loading: false,
          error: err,
          object: null,
        }))
      );
  }
}
