import { Component } from '@angular/core';
import { IRepo } from './models/iRepo';
import { HttpRequestsService } from './services/http/http-requests.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public errorMessages = {
    notFound: "This user doesn't exists, please check for typing errors",
    empty: "This user exist but does not have repositories",
    length: "type at least 5 alphanumerical characters",
  };
  public validationSearch = "";
  public tableStatus = "Please check if user exist or typed correctly";
  public searchValue = "joshuadazar";
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
    this.getRepoData();
  }

  getRepoData(value = this.searchValue) {
    if (this.validateSearchValue()) {
      this.paginatedArray = [];
      this.ds.getUsers(value).subscribe(res => {
        if (res !== undefined) {
          this.repositoryArray = res;
          this.showRepos();
        }
      }, error => {
        if (error.status === 404) {
          this.errorMessage(this.errorMessages.notFound);
          this.tableStatus = this.errorMessages.notFound;
        }
      })
    }
  }

  validateSearchValue() {
    this.searchValue = this.searchValue.trim();

    return this.searchValue.length > 3
      ? this.cleanErrorMessage()
      : this.errorMessage(this.errorMessages.length);
  }

  cleanErrorMessage() {
    this.validationSearch = "";
    return true;
  }

  errorMessage(message: string) {
    this.validationSearch = message;
    return false
  }

  showRepos(pageNumber = this.page, pageSize = this.pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    this.startIndex = startIndex;
    this.endIndex = endIndex;

    if (this.repositoryArray.length == 0) {
      this.errorMessage(this.errorMessages.empty);
      this.tableStatus = this.errorMessages.empty;
    }
    else {
      this.paginatedArray = this.repositoryArray.slice(startIndex, endIndex);
    }
  }

  updatePage(value: number) {

    if (value == 1 && this.endIndex < this.repositoryArray.length) {
      this.page = this.page + value;
    }
    else {
      this.page = 1;
    }

    this.showRepos();
  }

  onKeyPress(e: KeyboardEvent, value: number) {
    e.code == "Space" || e.code == "Enter" && this.updatePage(value);
  }

  searchValueRequest(e: KeyboardEvent) {
    e.code == "Enter" && this.getRepoData(this.searchValue);
  }
}
