import {Inject, Component, Input, OnInit} from '@angular/core';
import {Movie} from '../Models/movie';
import {User} from '../Models/user';
import {DataSyncService} from '../../services/data-sync.service';
import {UserList} from '../Models/user-list';
import {MAT_DIALOG_DATA, MatDialog, PageEvent} from '@angular/material';
import {NewListDialogComponent} from '../new-list-dialog/new-list-dialog.component';
import {WebApiRequestServiceService} from '../../services/web-api-request.service.service';


@Component({
  selector: 'app-movie-cards',
  templateUrl: './movie-cards.component.html',
  styleUrls: ['./movie-cards.component.css']
})



export class MovieCardsComponent implements OnInit {

  // Constants
  readonly POSTER_DOES_NOT_EXIST = 'http://story-one.com/wp-content/uploads/2016/02/Poster_Not_Available2.jpg';



  // Input decorators used to receive data from MovieListsComponent or MovieSearchComponent
   @Input() movieArray: Array<Movie>;
   @Input() searchMode: boolean;
   @Input() currentList: UserList;



  // Member variables
  dialogListName: string;
  addMovieToNewList: boolean;
  currentUser: User;

  constructor(private userData: DataSyncService, public dialog: MatDialog,
              private movieAPI: WebApiRequestServiceService) {}


  ngOnInit() {
    this.userData.currentUser.subscribe(currentUser => this.currentUser = currentUser);
  }


  // Implements the functionality for the "Watch trailer on IMDB" button
  openImdbPageInNewWindow(imdbID: string) {
    window.open(`https://www.imdb.com/title/${imdbID}/` );
  }


 // Adds the user's data to
  addToUser(title: string, posterSrc: string, imdbID: string, movieYear: number, list: UserList) {

    this.currentUser.addToList(list.listName, new Movie(title, movieYear, posterSrc, imdbID));
    this.userData.syncUserData(this.currentUser);
    console.log(this.currentUser);

 }




  // Remove a movie from a list
  removeFromUser(imdbID: string, list: UserList) {
    this.currentUser.removeFromList(list.listName, imdbID);
    this.userData.syncUserData(this.currentUser);
  }






  // Create the dialog box required to create a list
  newListDialog(title: string, posterSrc: string, imdbID: string, movieYear: number): void {
    const dialog = this.dialog.open(NewListDialogComponent, {
      width:  '300px',
      height: '300px',
      data: {
        dialogListName: this.dialogListName,
        addMovieToNewList: this.addMovieToNewList,
        movieTitle: title
      }
    });


    dialog.afterClosed().subscribe(result => {
      // Exit if undefined/null
      if (!result) {
        return;
      }
      this.dialogListName = result.dialogListName;
      this.addMovieToNewList = result.addMovieToNewList;
      this.currentUser.createNewList(this.dialogListName);


      if (this.addMovieToNewList) {
        this.currentUser.addToList(this.dialogListName, new Movie(title, movieYear, posterSrc, imdbID));
      }

    });

  }




}
