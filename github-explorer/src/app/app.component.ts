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
  public pageSize = 10;
  public page = 1;
  public endIndex = 0;
  public startIndex = 0;

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

  showRepos(pageNumber = this.page, pageSize = this.pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    this.startIndex = startIndex;
    this.endIndex = endIndex;
    this.paginatedArray = this.repositoryArray.slice(startIndex, endIndex);
  }

  updatePage(value: number) {

    if (value == 1 && this.endIndex < this.repositoryArray.length) {
      this.page = this.page + value;

    } else {
      this.page = 1;
    }
    this.showRepos();
    console.log(this.endIndex);
  }
}
