import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {

  private APIURL = 'https://api.github.com/users';

  constructor(
    private http: HttpClient
  ) { }

  getUsers(user: string) {
    return this.http.get<any[]>(`${this.APIURL}/${user}/repos`);
  }

}
