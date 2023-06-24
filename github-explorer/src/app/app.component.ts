import { Component } from '@angular/core';
import { IRepo } from './models/iRepo';
import { HttpRequestsService } from './services/http/http-requests.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public repositoryArray: IRepo[] = [];
  public paginatedArray: IRepo[] = [];
  public page = 1;

  constructor(
    private ds: HttpRequestsService
  ) { }

  ngOnInit() {
    this.ds.getUsers().subscribe(res => {
      if (res !== undefined) {
        this.repositoryArray = res;
        console.log(res);
        this.showRepos();
      }
    })
  }

  showRepos(pageNumber = this.page, pageSize = 10) {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    console.log(endIndex);
    this.paginatedArray = this.repositoryArray.slice(startIndex, endIndex);
  }

  updatePage(value: number) {
    if (this.page > 1) {
      this.page = this.page + value;
      this.showRepos();
    }
  }
}
