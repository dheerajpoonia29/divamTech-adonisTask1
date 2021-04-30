# Adonis fullstack application

This is the fullstack boilerplate for AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Session
3. Authentication
4. Web security middleware
5. CORS
6. Edge template engine
7. Lucid ORM
8. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick
```

or manually clone the repo and then run `npm install`.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

## Given Task
### 1. Home Page: `URL: /
    1.1 `Add New User` button -> Create new  Userpage will open
    1.2 `Users List `button -> `Show all user list and also add edit and delete Button.
    Note: [ Delete the Button with consent to `Are you sure you want to delete, if yes then delete ]
    1.3 Create new user page -> username, Email, Password, Role `take these details of the user and save it.
    1.4 Apply RBAC(Role-Based Access Control) to users.  
    

### 2.Leave Apply: `URL: UserName/leave:`
  2.1  Add Calendar 
  2.2 when the user clicks on the date  Email template has shown -> in which he gives the reason of leave and duration of leave select the Email id of his head like Team Lead id or Team Manager ID and then sends mail to the recipient
  2.3 In the Leave section show the list of applied leave with their status like approve, pending, canceled. 
 
### 3. Admin Leave Section: `URI: Admin/Leave `
  3.1 Show all the Leave which need Approval.
  3.2 Change the status approved or canceled. 
