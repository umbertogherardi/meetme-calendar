  This current project that we implemented falls in line with what we originally pitched, however, there were some unexpected complexities that delayed the process.
Specifically, the areas where we really struggled with was dealing with "moment" (moment js), authorization, and user settings. These areas were the most difficult primarily
because we never dealt with these topics directly, and learning how to authorize a user and only allow certain users to have certain privileges were foreign to us.
We were able to handle these issues by just "powering" through, and doing extra research/learning to fully understand these topics. Also, for the authorization aspect and user settings,
I used a previous lab reference in my Web Programming class and tried to relate it back to React and Express. The general idea of how our authorization worked was to just pull data from
the database and make sure the username and password matched with what the user had typed in. Likewise, we did decide to scope out URL/route shortcuts as this proved far too difficult and complex.
This means that any user can directly access another user's calendar if they have the exact URL. We also had to scope out scheduling meetings with different users, as once again, this proved
far too difficult for our knowledge and level of React. 
  The most interesting part of our final project was implementing the user's settings page. This page was one of the more complex pages because it involved having to read and store the user's
login and be able to present the user with an option of changing their password and fully terminating their account from the database. Also, what made this interesting was that the backend
code didn't work originally as it wasn't parsing the database correctly, however, after some modifications, it worked. It turned out that we never stored the current user's username, so it kept giving
us errors. Similarly, just being able to interact with the database and backend made it all the more fun and interesting, as we got to see the changing of passwords and the termination
of accounts in real-time.
  Lastly, if we had more time, we would like to have added the scheduling and meetings between the current user and other contacts, as well as added different calendar themes that the user can
set and change. Although we tried this at first, the implementation and coding were difficult and very hard to understand. Even with the countless hours of research and learning, these topics were far too complex 
for us (beginners of React). We also had to prioritize our time and other features on the web application as well, so we decided to pivot away from these features since these features weren't as "important" as
the features we implemented. 
  Overall, given our knowledge of both frontend and backend development, we would say our project was well-thought-out and followed very closely with our original proposal with just a few adjustments. We hope you enjoy
using our calendar!
