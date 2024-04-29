# meetme-calendar

Our final project assignment for CSCI446 - Web Applications

1) Make sure to install dependencies ("npm install")
2) Don't forget to do "npm install axios" (authentication for logins)

3) Backend:
    - "npm run start"
    - Make sure MongoDB is up and running (MongoCompass is helpful)
    - To make sure your database functions is working, use Postman to test it.

4) Frontend:
    - npm run start


TODOS for Henerik:
    - Certain users are only allowed certain navigation tabs.
    - Still need to redirect users to a certain page after logging in / signing up.

TODOS for Umberto:
- Implement add event functionality on month view.
- Have events be displayed on month view.
- Events should be clickable and removable/editable on month view.
- Implement contacts and populate contacts list with mongoData.
    (probably as simple as a userId as the primary, then a list of other userIds as the contacts).
- Do settings stuff (mostly visual options, like changing the color of events and the today color in the calendar).
- Do the same logic in month view for week and day views (probably finish month view first before doing these).
