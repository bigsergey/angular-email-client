# Simple AngularJS Email Client

Simple AngularJS project based on modularity architecture.

**Project directory structure:**

```
app/
---- shared/ acts as reusable components or partials
-------- search/
------------ search.js
------------ searchView.html
-------- highlightfilter
------------ highlight.js
-------- etc.
---- components/ modules for each feature
-------- sidebar/
------------ sidebar.js
------------ sidebarView.html
-------- mailview/
------------ mialviewController.js
------------ mailviewView.html
-------- etc.
---- app.js
---- main.html
assests/
---- css/
index.html
```

## Running

In project directory:

```bash
npm install
bower install
gulp
```
Applcation is avialable at [http://localhost:8000](http://localhost:8000).

Don't forget to run mail server:

```bash
node server/server.js
```



