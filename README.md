# Abstract Strategy Gamers Club

![Screen shot](./images/screenshot.PNG)

## A site for fans of abstract strategy games

[Abstract Strategy Gamers Club](https://morning-ravine-10944.herokuapp.com/)

https://morning-ravine-10944.herokuapp.com/

### Allowing users to find fellow players near them, and explore the world of abstract strategy board games.

A web site in development for fans of abstract strategy board games like chess, go, and othello, with a focus on less-well-known abstracts that don’t have the web presence of more popular games like chess.  Allows users to create an authenticated profile that records the games they are interested in playing.  Using information from their profile, it also allow users to find other site members who are interested in playing the same games they are and sorts them by geographical proximity to facilitate setting up in-person gaming sessions or local gaming groups.  Future features will include pages for individual games featuring links to strategy resources, and the ability to form local groups.

To give the functionality of the app available so far a try, sign up for an account with any valid street address, then log in.  From there, click on "Dashboard" and then the "Edit profile" button.  Once there, select one or more games from the list and hit "Save," then click on the "Nearby users" button.  This will bring up a list of all users who are interested in at least one of the games you selected when editing your profile, sorted by distance in miles from the address you supplied at sign up.  In the future, this will also include a link to each user's profile page.  Or, just sign in as "guest@gmail.com" with a password of "password" and click on "Dashboard" and "Nearby users."

#### Created with React, Express, Node, MySQL, Sequelize, Bulma, and geocoding libraries.
