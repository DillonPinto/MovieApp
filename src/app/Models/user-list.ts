import {Movie} from './movie';

export class UserList {

     numOfMovies: number;
     movieArray:  Array<Movie>;
     listName:    string;


    constructor(listName: string) {
        this.listName = listName;
        this.movieArray = [];
        this.numOfMovies = 0;

    }


}


