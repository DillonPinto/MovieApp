import { Injectable } from '@angular/core';
// @ts-ignore
import {Movie} from '../app/Movie';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SearchResults} from '../app/Models/search-results';

@Injectable({
  providedIn: 'root'
})
export class WebApiRequestServiceService {
  readonly FILTER_BY_ID = 'ID';
  readonly ALWAYS_FILTER_BY_TITLE = false;
  readonly PAGE_ONE = 1;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    // Adds a DoNotIntercept attribute to the header to exclude these requests from the interceptor module
    this.headers = new HttpHeaders().append(
      'DoNotIntercept',
      'true'
    );
  }

  async searchByName(searchString: string, filterByID: boolean, pageRequested: number) {

    const apiKey = 'sampleApiKey';
    const filter = (filterByID) ? 'i' : 's';
    const page = pageRequested.toString();
    searchString = searchString.trim(); // Removes spaces before and after the string, so search results aren't affected.

    return  await this.http
      .get(`http://www.omdbapi.com/?${filter}=${searchString}&apikey=${apiKey}&page=${page}&type=movie`,
        {headers: this.headers}).toPromise();

  }

}
