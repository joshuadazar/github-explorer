import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IRepo } from '../../models/iRepo';
@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {

  private APIURL = 'https://api.github.com/users';

  constructor(
    private http: HttpClient
  ) { }

  getUsers(user: string) {
    return this.http.get<IRepo[]>(`${this.APIURL}/${user}/repos`);
  }

}
