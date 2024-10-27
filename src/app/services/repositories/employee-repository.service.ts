// noinspection TypeScriptValidateTypes

import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of, startWith} from "rxjs";
import {ApiResponse} from "../api/api-response";
import {EmployeeViewDto} from "../../models/employee/dtos/employee-view.dto";
import {Employee} from "../../models/employee/employee.model";

@Injectable({
  providedIn: 'root'
})
export class EmployeeRepositoryService {

  private readonly http = inject(HttpClient);
  constructor() { }

  getEmployeeById(id: number): Observable<ApiResponse<EmployeeViewDto>>{
    return this.http.get<EmployeeViewDto>(`/api/employee/${id}`)
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

  readonly employees: Observable<ApiResponse<Array<EmployeeViewDto>>> = this.http.get<Array<EmployeeViewDto>>(`/api/employee/all`)
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

  createEmployee(employee: Employee){

    return this.http.post<Employee>(`/api/employee`, employee)
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

  updateEmployee(employee: Employee){

    return this.http.put<Employee>(`/api/employee`, employee)
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

  deleteEmployee(id: number){

    return this.http.delete<Employee>(`/api/employee/${id}`)
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
