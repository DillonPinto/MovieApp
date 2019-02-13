import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {WebApiRequestServiceService} from '../../services/web-api-request.service.service';
import {SearchResults} from '../Models/search-results';
import {Movie} from '../Models/movie';
import {RestApiService} from '../../services/rest-api.service';
import {User} from '../Models/user';
import {UserList} from '../Models/user-list';
import {DataSyncService} from '../../services/data-sync.service';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-movie-lists',
    templateUrl: './movie-lists.component.html',
    styleUrls: ['./movie-lists.component.css']
})


// Implements the stored lists UI
export class MovieListsComponent implements OnInit {

    user: User;
    private movieArray: Array<Movie>;
    private searchResults: SearchResults;



    // Inject services into the component
    constructor(private movieAPI: WebApiRequestServiceService,
                private RestAPI: RestApiService,
                private userData: DataSyncService,
                private authService: AuthService, private router: Router) {
    }




    ngOnInit() {
        this.userData.currentUser.subscribe(currentUser => this.user = currentUser);

    }


    logout() {
      this.authService.logout();
    }

}
