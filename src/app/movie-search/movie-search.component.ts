import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';
import { FormControl } from '@angular/forms';
import {WebApiRequestServiceService} from '../../services/web-api-request.service.service';
import {SearchResults} from '../Models/search-results';
import {Movie} from '../Models/movie';
import {forEach} from '@angular/router/src/utils/collection';
import {User} from '../Models/user';
import {DataSyncService} from '../../services/data-sync.service';
import {PageEvent} from '@angular/material';

@Component({
    selector: 'app-movie-search',
    templateUrl: './movie-search.component.html',
    styleUrls: ['./movie-search.component.css'],

})


export class MovieSearchComponent implements OnInit {


    selected: string;
    @Input() currentUser: User;


    searchResults: SearchResults;
    suggestedResults: SearchResults;
    movieArray: Array<Movie>;
    options: Array<Movie>;
    currentSearch: string;

    constructor(private movieAPI: WebApiRequestServiceService,
                private userData: DataSyncService) {
        this.selected = 'Title';
    }

    ngOnInit() {
        this.searchResults = new SearchResults(); // Initialize so not undefined when accessed.
        this.userData.currentUser.subscribe(currentUser => this.currentUser = currentUser);

    }





    handleEvent(event: KeyboardEvent, searchString: string) {

        // Exit function if user is trying to scroll with the arrowkeys or if the search box is empty.
        if (event.code === 'ArrowUp'   || event.code === 'ArrowDown'  ||
            event.code === 'ArrowLeft' || event.code === 'ArrowRight' || (!searchString.length)) {
            return;
        }


        // Handle keyboard event. Using switch for speed
        switch (event.code) {


            case 'Enter': {
                this.handleEnter(searchString);
                break;
            }

            case 'Backspace': {
                this.handleBackspace(searchString);
                break;
            }

            default: {

                if (searchString.length >= 3) {
                    this.searchSuggested(searchString, this.selected === this.movieAPI.FILTER_BY_ID);
                }

                break;
            }
        }
    }



    handleEnter(searchString) {
        // Exit function if search string is empty.
        if (!searchString.length) {
            return;
        }
        this.searchMovies(searchString, this.selected === this.movieAPI.FILTER_BY_ID, this.movieAPI.PAGE_ONE);
        this.options = []; // Set options to empty to close autocomplete
    }






    handleBackspace(searchString: string) {

        if (searchString.length < 3) {
            this.options = [];
        } else {
            this.searchSuggested(searchString, this.selected === this.movieAPI.FILTER_BY_ID);
        }

    }

    // TODO FIX EMPTY ID SEARCH
    //  TODO FIX SEARCHES FOR LESS THAN 3 CHAR

    // TODO IMPPLEMENT MODAL FOR FULL INFO
    // TODO FILL OUT CARDS' INFO SPACE

    // TODO TOAST FOR NO RESULTS OR ERROR
    // TODO FIGURE OUT PASS BY REFERENCE FOR THESE TWO FUNCTIONS
    async searchMovies(searchString: string, filter: boolean, page: number) {
        this.currentSearch = searchString;
        let movie: Movie;
        this.searchResults = new SearchResults(); // Clear for new search. If not cleared, http responses could be mixed
                                                  // from previous searches.

        if (!filter) {
            this.searchResults = <SearchResults>await this.movieAPI.searchByName(searchString, filter, page);
            this.movieArray = this.searchResults.Search;
        } else {

            movie = <Movie>await this.movieAPI.searchByName(searchString, filter, page);
            this.searchResults.Response = movie.Response;
            this.movieArray = [];
            if (this.searchResults.Response) {
                this.movieArray.push(movie);
            }

        }
        console.log(this.searchResults.Response); // TODO REMOVE
    }

    async searchSuggested(searchString: string, filter: boolean) {
        this.suggestedResults = <SearchResults> await this.movieAPI.searchByName(searchString, filter,
            this.movieAPI.PAGE_ONE);
        this.options = this.suggestedResults.Search;
    }


    handlePage(pageEvent: PageEvent) {

      this.searchMovies( this.currentSearch, this.selected === this.movieAPI.FILTER_BY_ID,
        pageEvent.pageIndex + 1); // PageIndex is zero-based so it needs to be shifted up by 1 page
        window.scrollTo(0, 0);
    }

}

