<h1 align="center"><strong>Digital Tasks Board</strong></h1>

## Services provided:

- Good note-taking system/mind mapping system.
- Quantifiable weekly performance tracking.
- Statistics dashboard that has weeks stamped with a note about overall emotional/mental state during that period.

## Skills I want to learn through the app:

🔝 [Back To Top Of Readme](https://github.com/me3zaAKAgoat/dtb#digital-tasks-board)

- Learn and master ReactJS.
- How to make a Smoothly animated website.
- How to implement a system where the state of the application is saved to the database as things change in real time.
- Write clean, performant and maintainable JS code.
- Write readable, well-documented and frequently commented code.
- Learn how to manage git repositories.
- How to make an app that uses modern web dev techniques.
- How to deploy and host a web app.
- How to use electron to turn a web app into a desktop app.
- Improve CSS skills.
- Learn basic concepts of UI and UX.

## Flow and logic of the app:

- The first note to be created sets a timer of for example 7 days (can be personalized), upon which the current tasks are archived and the week's final stats are recorded into the statistics page.
- Weeks may be terminated before the 7-day mark is reached
- When the app has been opened for the first time it should look for the current week hooked to the logged-in user then fetch all the tasks and load them to the UI.
- When a week is ended the current week id of the user is turned to Null.
- Statistics page will provide:
  - graph showing the progress through the weeks.
  - A way to access older weeks.
  - emotional/mental well-being graph pulled from stamp maker at end of week.
- When an end-the-week action is initiated>
  - the user current week key should be switched to null.
  - a modal asking for the emotinal overall satisifaction and notes about the week should show up to the user.
    - this modal can NOT be skipped by mistake and should appear WHENEVER the app is running until the user intentionally skips it.

## The database schemas:

🔝 [Back To Top Of Readme](https://github.com/me3zaAKAgoat/dtb#digital-tasks-board)

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

## Tasks

### Core

- [ ] push error bar to the highest order component possible and use a usecontext to avoid prop drilling
- [ ] update the avatar of users immediately after an avatar update call has successfully returned
- [ ] fallback for when there are no statistics in the last month
- [ ] make routers for updating the username and the password
- [ ] work on user adminsitration
  - [ ] make a sign up process.
  - [ ] figure out how to implement settings (theme, week length, username)
- [ ] make an abstraction layer for modals (seperate component that hosts modals)
- [ ] remove debounce from note text area and add an svg save button on the top right corner of the text area that animates on click
- [ ] add a retry button for every component's failure to load the data it needs (similar to twitter)
- [ ] make a wrapper function that updates the state after successful api requests.
- [ ] add a percentage next to number input field in task container
- [ ] add end of week button that renders a modal prompting the user to describe the week and then sends an api call to archive the ended week and create a stamp of it.
- [ ] work on custom skeleton component to every component that makes an inital fetch, so that this skeleton component only renders the wanted component after a successful fetch. (will enable moving tasks state to tasks section hopefully).
- [ ] make function wrappers for every module that has an action that necessitates a follow up, to avoid duplication and all the issues that stem from it.

### Secondary

- [ ] fix ssl
- [ ] make a friendly tutorial
- [ ] make modals into a seperate module
- [ ] work on a loading UI (skeleton) while the data is being fetched.
- [ ] add a visual aspect to the priority of tasks.
- [ ] make divs flicker on validation error.
- [ ] replace window alerts and confirms with custom modals.
- [ ] figure out how keep data stored client side (pouchDB and nedb and sessionstorage and localstorage) https://stackoverflow.com/questions/28314368/how-to-maintain-state-after-a-page-refresh-in-react-js https://rxdb.info/quickstart.html
- [ ] rich markdown text editor for notes component that behaves like discord text form parsing.
- [ ] give descriptions for navbar items on hover
- [ ] add a color for thematic/visual identity
- [ ] learn about svgs and how to draw animations [svg circle animation](https://stackoverflow.com/questions/46142291/animating-react-native-svg-dash-length-of-a-circle)
- [ ] each task should have a colored health indicator that flickers when low
- [ ] add a way the user can see the priority of a task.
- [ ] add keys in week schema that reflect the emotional/mental well-being of the user during that week.
- [ ] loading animation on debounces
- [ ] prevent user from being able to input any notes if a week isn't initiatied

  🔝 [Back To Top Of Readme](https://github.com/me3zaAKAgoat/dtb#digital-tasks-board)
