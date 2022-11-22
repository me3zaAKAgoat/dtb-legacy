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

- Have a log for all the changes made that then decides what API calls need to be made to sync the client and database (changes include: task progress changes - notes changes)
- The saving system then takes the logs and refreshes the sync indicator while also making the necessary API calls when the user initiates the syncing
- Save to the local storage then set a time-period after which updates are automatically made to the cloud.

### Tasks

- update the notes component into a rich text editor.
- thoroughly describe the automatic synchronization system.
- work on an Auto-save feature.
- work on a loading UI (skeleton) while the data is being fetched.
- add a terminate the week button.
- make the basic layout for the statistics page.
- rework task containers ( laggy expansion animation ).
- make a settings page.
- make a signup page.
- refractor spree to make code more readable and more performant.
- fix the website's erratic behavior when the window is downsized and the user tries to scroll.
- change the size of the components (use em and rem for all things so the sizes are more responsive).
- make a purple theme.
- thoroughly describe the flow/usage of the app.
- make a new proper logo.
- handle token expiration on the front-end.
