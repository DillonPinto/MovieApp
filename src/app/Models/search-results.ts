import {Movie} from './movie';

export class SearchResults {
    Search: Array<Movie>;
    totalResults: number;
    Response: boolean;

    constructor () {
        this.Search = [];
        this.totalResults = 0;
        this.Response = false;
    }
}
