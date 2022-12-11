<h1 align="center"><strong>Digital Tasks Board</strong></h1>

## Services provided:

- Good note-taking system/mind mapping system.
- Quantifiable weekly performance tracking.
- Statistics dashboard that has weeks with a pinned statement for each week.

## Skills I want to learn through the app:

- Learn and master ReactJS.
- How to make a Smoothly animated website.
- How to implement a system where the state of the application is saved to the database as things change in real-time.
- Write clean performant code and maintainable JS code.
- Write readable code well documented and frequently commented code.
- Learn how to manage git repositories, pulls, forks and merges.
- How to make an app that uses modern techniques.
- How to deploy and host a web app.
- How to use electron to turn a web app into a desktop app.
- Improve CSS skills.
- Learn basic concepts of UI and UX.

## Flow and logic of the app:

- The first note to be created sets a timer of for example 7 days (can be personalized), upon which the current tasks are archived and the week's final stats are recorded into the statistics page.
- Weeks may be terminated before the 7-day mark is reached
- When the app has been opened for the first time it should look for the current week hooked to the logged-in user then fetch all the tasks and load them to the UI.
- When a week is ended the current week id of the user is turned to Null.

## The database structures:

- Collections: Tasks, Weeks, Users.
- Tasks belong to Weeks and Users.
- Weeks belong to Users.
- Tasks: title, description, priority, progress, and the id of weeks.
- Weeks: start date, end date, result, the id of the user, and list of task ids.
- Users: username, name, password, weeks, and current week.

## Autosave system

[IndexDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB)

- on frontend set a setInterval inside a useEffect that calls the function that decyphers the requests to be sent to the server.

- set a localStorage key that represents a chain of strings of this form

  - stringified object+stringified object+...

  - object to stringify

    { type : type of request, path : path to request ,object : object to send with request}

### Tasks

- thoroughly describe the automatic synchronization system.
- work on an Auto-save feature.
- work on a loading UI (skeleton) while the data is being fetched.
- add a terminate the week button.
- make the basic layout for the statistics page.
- rework task containers ( laggy expansion animation ).
- make a settings page.
- make a signup page.
- refractor spree to make code more readable and more performant.
- make a purple theme.
- thoroughly describe the flow/usage of the app.
- make a new proper logo.
- handle token expiration on the front-end. https://stackoverflow.com/questions/61997401/how-to-logout-user-when-token-expires-in-react-app
- figure out how keep data stored client side (pouchDB and nedb and sessionstorage and localstorage) https://stackoverflow.com/questions/28314368/how-to-maintain-state-after-a-page-refresh-in-react-js https://rxdb.info/quickstart.html
- read chapter 7 react router
- rich text notes like discord parsing
- make a valorant abilities HUD inspired HUD for week status
- custom context menu on tasks
- add possibility to delete tasks
- add a percentage next to number input field in task container
- only render expanded container when task is clicked
- description filled on submission does not have to be non empty
- have a useref that stores all progresses to be used to count the global progress when needed
- fix modal behaviour when clicked outside of form
