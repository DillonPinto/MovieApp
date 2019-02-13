import {Movie} from './movie';
import {UserList} from './user-list';

export class User {

    public username: string;
    public password: string;
    public _movieLists: Array<UserList>;


    constructor(private userName: string, private passwrd: string) {
        this.username = userName;
        this._movieLists = [];
        this.password = passwrd;
    }



    getMovieListByName(listName: string) {
        for (const list of this._movieLists) {

            if (list.listName === listName) {
                return list;
            }
        }

        return null;
    }

    isDuplicate(movieInfo: Movie, movieList: Array<Movie>): boolean {
        for (const movie of movieList) {
            if (movie.imdbID === movieInfo.imdbID) {
                return true;
            }
            return false;
        }
    }

    listIsDuplicate(listName: string, existingLists: UserList[]): boolean {

      for (const existingList of existingLists) {
        if (listName === existingList.listName) {
          return true;
        }
        return false;
      }
  }

  // Add move to list
  addToList(listName: string, movieInfo: Movie) {
    const existingList: UserList = this.getMovieListByName(listName);

    if (existingList && !(this.isDuplicate(movieInfo, existingList.movieArray))) {
        existingList.movieArray.push(movieInfo);
        existingList.numOfMovies++;
    }

    return null;
  }


  // Remove movie from list
  removeFromList(listName: string, imdbID: string) {
    const existingList: UserList = this.getMovieListByName(listName);

    for (const movie of existingList.movieArray ) {
      if (movie.imdbID === imdbID) {
        existingList.movieArray.splice(existingList.movieArray.indexOf(movie), 1);
        existingList.numOfMovies--;
        console.log(existingList.movieArray);
      }
    }
  }



  createNewList(mlistName: string) {

    // Error: No name entered.
    if (!mlistName || (this.listIsDuplicate(mlistName, this._movieLists))) {
        return null;
    }

    this._movieLists.push(new UserList(mlistName));

  }


}
