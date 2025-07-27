# Simple Node.js web app

---

The app is based on the popular framework web Express.js aand combine the ORM capacity of Sequelize to manage database models. This app allows to register any ID (in this case car plate ID) and then register an event related to that ID once per day.

Roles:

* Super Admin: Only this role can register users and change roles in the app.
* Admin: This role can add IDs and events.
* User: Need to wait Super Admin to activate account and assign a role.

## Main features

---



* Server Side Render (SSR) thorugh EJS view engine, giving the hability to control render and access to view routes from the server.
* ORM thorugh sequelize connected to a relational database PostgreSQL.
* Authentication through JWT.
* Authorization based on JWT and middlewares that allows give proper access to each user rol.
* Implementation of Model View Controller (MVC) design pattern that allows to separate responsabilities.
* Modularity throug the implementation of middlewares.

## How to run

---

Run these commands below to start de application as any other node app.

```
npm install
npm run dev
```

## Things to improve

---

* Use refresh token to give a best way to logout users using this tokens to invalidate the connection as client request.
* Use cron task to delete expired blacklisted token from database.
* Set email as a MFA.
