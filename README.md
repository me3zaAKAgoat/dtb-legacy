<h1 align="center"><strong>Digital Tasks Board</strong></h1>

## To run the project in development mode

1. clone the repostiory.

2. Install all the dependencies using.

```bash
npm i
```

3. go into the dtb/dtb-backend directory and create the environment file.

```bash
#create a .env file in dtb/dtb-backend folder
#copy this into it
PORT = 3003
MONGODB_URI = 'mongodb+srv://me3zaAKAgoat:XyzK5ynkLfBMDmjK@cluster0.i8hd6nc.mongodb.net/?retryWrites=true&w=majority'
SECRET ='echoukri Dtb Website Key'
```

4. turn on the backend server.

```bash
cd dtb-backend/
npm run dev
```

5. run the frontend on the client

```bash
cd dtb-frontend/
npm start
```

## Services provided:

- Good note-taking system/mind mapping system.
- Quantifiable weekly performance tracking.
- Statistics dashboard that has weeks stamped with a note about overall emotional/mental state during that period.

## Skills I want to learn through the app:

🔝 [Back To Top Of Readme](https://github.com/me3zaAKAgoat/dtb#digital-tasks-board)

- Learn and master ReactJS.
- How to make a Smoothly animated website.
- How to implement a system where the state of the application is saved to the database as things change in real time.
- Write clean performant code and maintainable JS code.
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

## The database structures:

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

- [ ] thoroughly describe the automatic synchronization system.
- [ ] work on a loading UI (skeleton) while the data is being fetched.
- [ ] add loading animation to any component thats awaiting an api calls response (login for example).
- [ ] make the basic layout for the statistics page.
- [ ] rework task containers ( laggy expansion animation ).
- [ ] make a settings page.
- [ ] make a signup page.
- [ ] refractor spree to make code more readable and more performant.
- [ ] make a purple theme.
- [x] thoroughly describe the flow/usage of the app.
- [ ] make a new proper logo.
- [ ] handle token expiration on the front-end. https://stackoverflow.com/questions/61997401/how-to-logout-user-when-token-expires-in-react-app
  - log out on every JWT error response received
- [ ] figure out how keep data stored client side (pouchDB and nedb and sessionstorage and localstorage) https://stackoverflow.com/questions/28314368/how-to-maintain-state-after-a-page-refresh-in-react-js https://rxdb.info/quickstart.html
- [ ] read chapter 7 react router
- [ ] rich text notes like discord parsing
- [x] make a valorant abilities HUD inspired HUD for week status
- [x] custom context menu on tasks
  - add possibility to delete tasks
- [ ] add a percentage next to number input field in task container
- [ ] description filled on submission does not have to be non empty
- [ ] fix modal behaviour when clicked outside of form
- [ ] give descriptions for navbar items on long hover
- [x] make task info modals bigger
- [ ] change overall font to a more flexible one (modern looking - minimalistic)
- [x] change time left to jst tasks title
- [ ] add a color for thematic/visual identity
- [x] tasks should be fetched at home component level and not tasks container component and passed to TasksContainer and updated with every successful debounce api call

```js
useEffect(() => {
	ref.current = state;
}, [state]);
```

- [x] figure out how to make an animated completion circle ![Heads Up Display](/READMEcontent/HUD.png)
- [ ] add end of week button that renders a modal prompting the user to describe the week and then sends an api call to archive the ended week and create a stamp of it.
- [ ] learn about svgs and how to draw animations [svg circle animation](https://stackoverflow.com/questions/46142291/animating-react-native-svg-dash-length-of-a-circle)
- [x] sanitize the code for api calls on debounce
- [ ] have settings open in a modal
- [ ] each task should have a colored health indicator that flickers when low
- [ ] make divs flicker on validation error.
- [x] when update progress response is received tasks should be synced
- [x] fix WHY THE FUCK the user cant update two functions progresses without fucking up the state enitrely
  - the usecallback function that enabels debouncing makes it so the memozoized function always has the state of the time it was initially rendered on so any changes to state made out of it will always result in older state of other tasks.
  - so what about giving up usecallback entirely and making the file scoped and not function scoped, well then the fuckign debounces override each other and only the latest debounce will make an api call
- [x] make buttons that change in size be centered and not change height downwards but towrads all sides instead.
- [ ] work on custom skeleton component to every component that makes an inital fetch, so that this skeleton component only renders the wanted component after a successful fetch. (will enable moving tasks state to tasks section hopefully).
- [ ] replace window alerts and confirms with custom modals.
- [ ] figure out how to set custom context menu to base element to something other than button.
- [ ] fix and rework singular tasks components.
- [ ] add a indicator of which page the user is on.
- [ ] make function wrappers for every module that has an action that necessitates a follow up, for avoiding duplication and all the issues that stem from it.
- [ ] add a way the user can see the prioirty of a task.
- [ ] add keys in week schema that reflect the emotional/mental well-being of the user during that week.

🔝 [Back To Top Of Readme](https://github.com/me3zaAKAgoat/dtb#digital-tasks-board)
