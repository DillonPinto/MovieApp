import {Rating} from './rating';

export class Movie {
    Title: string;
    Year: number;
    Poster: string;
    imdbID: string;

    // More below
    Rated: string;
    Release: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Ratings: Array<Rating>;

    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: boolean;


    constructor(Title: string, Year: number, Poster: string, imdbID: string) {
        this.Title = Title;
        this.Year = Year;
        this.Poster =  Poster;
        this.imdbID = imdbID;
    }

}





