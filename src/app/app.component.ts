import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MovieApp';
}
/* TODO
* Here are the details for the specific features we’d like to see:

    Ability to list all “Movies to Watch” lists~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
    Ability to create an unlimited number of “Movies to Watch” lists each with a unique name
    Ability to list all movies in a “Movies to Watch” list when it is clicked on.
    Ability to add new movies to a “Movies to Watch” list.

        When adding a movie to a “Movies to Watch” list, the add feature should auto-populate with movie names from an online movie names
        API.  This should work similar to how Google predicts what you are looking for by the letter you have typed in.  You can begin
         auto-populating choices a user can select from after three letters are typed.

    Ability to edit/delete movies in a “Movies to Watch” list.
    Lists should get saved to a database and loaded and retrieve from that database each time the web application is visited.
    (Bonus Points – Not required) Ability to click on a movie name in a list that would open a trailer for the movie online or
     take you to a rating page for the movie online.
*
* */
