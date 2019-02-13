# MovieApp
This project is a movie database application. The application allows users to search for movies and add them to their own custom lists for reference.

This project was generated with [Angular CLI] version 7.2.3.


# Functionality implemented: 
  
  * Login, register, and save user sessions without requiring the user to log back in again
  * Ability to search for movies by title or IMDB id with autocomplete
  * Entity framework used to store user records/objects. 
  * All UI components implemented using the Angular material package
  * Ability to create lists
  * Pagination for all results displayed
  * Poster not available image displayed if a poster isn't available to display on a movie card
  * Ability to add a movie to list or remove one from a list


## Future improvements
Use the Angular material CDK virtual-scroll-viewport instead of the paginator for an efficient infinite scroll that only
renders the list items that are in view, allowing memory usage to be kept low.

Add a rating system and a modal box for full movie info

Grid layout for a more efficient use of space.

Search engine optimization using Google Search Console (Web master tools) to index the site on Google and similar tools
for other major search engines.

Include more common error codes, including a 404 page.

Implement a more efficient data structure for storing and retrieving movies (hashmap/set)

Add delete account functionality

Implment better validation of login credentials
