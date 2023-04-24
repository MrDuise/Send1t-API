
# Send1t

### “Connecting people around the world!”
<p>The purpose of this project is to make a mobile application that satisfies the basic needs of a modern communication platform. This means that it will require a user to send instant messages with other users one-on-one in real-time, as well as be able to send a message to a group of people at the same time. This Repo is the API. 

The Front-End can be found here: https://github.com/MrDuise/Send1t-Client
<p>The problem that this projects solves is my own lack of understanding in a technology I use every single day. Mobile telecommunications is something that most everyone uses, from other software such as Snapchat, Facebook Messenger, WhatsApp, and many others. It's something that is needed in every field, in almost every walk of life. But like the washing machine, most people don’t know how it works, and when it breaks, someone else needs to fix it. 

<p>The purpose of this project is to fix my lack of understanding, as I seek to better myself in the ways of modern communication while at the same time developing an exceptional mobile chat app. 

## Installation

To install this project insure that you have Node and NPM installed. This is an Express API and will not work without Node
1. fork the main branch, then clone the repo
2. ```npm install``` to download the dependinces 
3. ```npm run start``` to start it up

This will get it running on your localhost, allowing access through Postman or some other API testing tool.

The postman collection used for testing can be found within the 'Extras' folder


## Technologies and Logical System Architecture
<p>This diagram shows the design of the logical solution of this project. A primary focus of this project is to design it in N-tier architecture, so each tier of the project, and the details of that layer, are displayed in this diagram. This diagram also serves to list the technologies used in this project and the role they played.
To summarize, the project will consist of a client layer, presentation layer, business layer, and a data access layer. The problem with Javascript based projects is that data access is not enforced in any way, requiring the developer to key the data access layers in mind. The only time the general rule of n-layer was semi broken is in the web-socket connection, in which this layer directly talks to the database throught the data access layer.

<img width="600" alt="image" src="readme docs/Technology diagram v2.png">



## Detailed Technical Design
### General Technical Approach
<p>Send1t is a MERN(Mongo, Express, React Native, Node) Stack application developed using N-layer and Model, View, Controller architecture. The back-end portion of the application was written with the JavaScript programming language, whereas the front-end of Send1t was be designed designed using simple tools such as draw.io and written using React Native. The application’s data will persist in a MongoDB database. All code will be managed in a GitHub repository so that code changes can be easily documented and tracked throughout the project’s timeline. 

### Key Technical Design Decisions
<p>This application will be created in using the Spring framework. It will be designed in N-layer architecture and use a Model, View, Controller structure. This design structure was chosen because the app is mainly a create, read, update, delete (CRUD) application so the N-layer/MVC structure is an optimal solution. 
<p>The presentation layer will consist of all the viewable aspects of the application such as where users can view posts and account information. The business layer will hold all the logical actions for features such as logging in, registering, and making posts. The data access layer is responsible for reading data from the database to the business layer so that actions can be executed. This would include validating login credentials and editing posts. The data persistence layer is the database itself. All data for posts and user information will persist in the database/database persistence layer. The data will exist in a relational database using MySQL so that data can be organized in a structured format. This will make CRUD operations much simpler across the application.
<p>Along with N-layer architecture, this application will also utilize Model, View, Controller (MVC) architecture. The models will be the container for all logic that relates to the application’s data. In this case, the user and post models. The controllers are responsible for handling all user requests and business logic of the application. This would include processing logins, registers, and making posts. Lastly, views will oversee all UI logic, including page navigation, text boxes, and buttons across the application.

## Database Design
The MongoDB database will be hosted through MongoDB Atlas. This removes a complex process of transfering all the data from a local system to cloud storage. The database will be split into 3 collections, the Users, Conversations, and Messages. Each collection has a conspending schema in the APIs code that enforces a standard layout as document databases don't enforce this. The users schema contains two lists of forgien keys. One is in the array of conversations, which is used to fetch all conversations that a user is a part of. The other is related to the contacts list. This is a reference to other user documents, so that anytime they update their information, it is also set to other users. The Messages colleciton is the only other place where foregin keys are used. This key is the conversationID, and is used to link the message to a single conversation. 


<img width="500" alt="image" src="https://user-images.githubusercontent.com/90354190/216126233-26f997ca-4546-490f-989e-baee36d66c0b.png">

## DevOps 
### Render Webhosting
## [https://send1t-api.onrender.com](https://send1t-api.onrender.com)
<p>The Send1t API is the only part of the application that is hosted. It is hosted using Render Web Service. This made delivering updates to my API much easier, as its connected to my Github repos main branch, so any major update is automaticlly built on Render. The MongoDB database is set up through MongoDB Atlas, which is hosted by AWS. This is auto scaled and I don't need to touch it, I just need my access token. 
  
## Logging
Logging exists at each HTTPs route within the API. This is handled by the logging fraemwork Morgan, which automatically records the route that the requst hit and the response code that was sent back, the time of the request, and how long the response took. This is sent to Renders internal hosting logs, from which I can download them if I so wish. 
  
  
## Functional Requirements
<details closed>
<summary>Login Requirements</summary>


|      Sub-Features      |    Actor    |                                              Description                                             |                                             Outcome                                             | In Scope? | Completed? |
|:----------------------:|:-----------:|:----------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------:|:---------:|:----------:|
|   User Authentication   |    User     |                                   I would like to input my username                                  |                      so that I can access web site                      |    Yes    |    Yes     |
|   User Authentication   |    User     |                                   I would like to input my password                                  |                      so that I can access web site                      |    Yes    |    Yes     |
|   User Authentication   |   System    |            I would like to display an error if username is incorrect                                |               so that web site is not accessible              |    Yes    |    Yes     |
|   User Authentication   |   System    |            I would like to display an error if password  is incorrect                               |               so that web site is not accessible              |    Yes    |    Yes     |
|   User Authentication   |   System    |      I would like to display a system error if credential store is not found                       |      so that support can debug a system issue      |    Yes    |    Yes     |
|   User Authentication   |   System    |                           I would like to verify the username                                       |               so that only authorized users can have access               |    Yes    |    Yes     |
|   User Authentication   |   System    |                           I would like to verify the password                                       |               so that only authorized users can have access               |    Yes    |    Yes     |
| Social Media Integration|    User     |                       I would like to login in with Facebook                                       |       so that I can sign in without making a brand new account        |    No    |    No     |
| Social Media Integration|    user     |                        I would like to login in with Twitter                                       |       so that I can sign in without making a brand new account        |    No    |    No     |
| Social Media Integration|    user     |                        I would like to login with Google                                        |       so that I can sign in without making a brand new account        |    No    |    No     |
</details>
  
<details closed>
<summary>Register Requirements</summary>

|     Sub-Features     |    Actor    |                                              Description                                             |                                             Outcome                                             | In Scope? | Completed? |
|:--------------------:|:-----------:|:----------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------:|:---------:|:----------:|
|      Registration    |    User     |                    I would like to register on web site before login                     |                               So that I have an account                               |    Yes    |    Yes     |
|                      |    User     |                                I would like to enter a username                                |                              So that I can make an account                              |    Yes    |    Yes     |
|                      |    User     |                                  I would like to enter a password                                 |                              So that I can make an account                              |    Yes    |    Yes     |
|                      |    User     |                                  I would like to enter a first name                                |                              So that I can make an account                              |    Yes    |    Yes     |
|                      |    User     |                                   I would like to enter a last name                                |                              So that I can make an account                              |    Yes    |    Yes     |
|                      |    User     |                                      I would like to enter an email                                  |                              So that I can make an account                              |    Yes    |    Yes     |
| Password Requirements |   System    |                              Verify that password has one number                              |                       So that the password meets the minimum security requirements                      |    Yes    |    Yes     |
|                      |   System    |                           Verify that password has 1 lower case character                          |                       So that the password meets the minimum security requirements                      |    Yes    |    Yes     |
|                      |   System    |                           Verify that password has 1 upper case character                          |                       So that the password meets the minimum security requirements                      |    Yes    |    Yes     |
|                      |   System    |                           Verify that password has min of 8 characters                           |                       So that the password meets the minimum security requirements                      |    Yes    |    Yes     |
|                      |   System    |                           Verify that password has max of 32 characters                          |                       So that the password meets the minimum security requirements                      |    Yes    |    Yes     |
|  Email Verification   |   System    | Verify that email has not been used and display an error if it has been taken |                           So that no duplicate accounts are made                          |    Yes    |    Yes     |
|      User Access      |   System    |                   Verify that password is linked to the username entered                   |               So only the correct password can gain access to that account              |    Yes    |    Yes     |
|                      |   System    |                                         Encrypt the password                                        |                            So that the password is not stored as plain text                           |    Yes    |    Yes     |
|    Profile Picture    |    User     |                       Register a profile picture, limited in size to 200*200 pixels                       |                                               N/A                                               |    Yes    |    no     |
|  Minimum Requirements |   System    |     Display the minimum requirements of the username as an error if the one entered does not match     | So the user knows the entered data will not work and what they should try instead |    Yes    |    Yes     |
|                      |   System    |     Display the minimum requirements of the password as an error if the one entered does not match     | So the user knows the entered data will not work and what they should try instead |    Yes    |    Yes     |
| Unique Username Check |   System    | Verify that the entered username has not been used and display an error if it has been taken |                       So that every username is unique |    Yes    |    Yes     |
  
</details>
  
<details closed>
<summary>Home Requirements</summary>

|  Sub-Feature  |    Actor    |                                Description                               |                             Outcome                            | In Scope? | Completed? |
|:-------------:|:-----------:|:------------------------------------------------------------------------:|:--------------------------------------------------------------:|:---------:|:----------:|
| Home Page     | As a user   | I would like a home page                                                 | so I can view posts and other content                          | yes       | yes        |
| Search Users  | As a user   | I would like to search for other users                                   | so that I can see their accounts and send them friend requests | yes       | yes        |
| Search Posts  | As a user   | I would like to search the app for posts                                 | so that I can see all posts that contain what I search         | yes       | yes        |
| Search Bar    | As a user   | I would like a search bar                                                | so that I can search for user accounts and posts               | yes       | yes        |
| Search Button | As a user   | I would like a clickable button                                          | so that I can execute a search                                 | yes       | yes        |
| Usernames     | As a user   | I would like each post to show the username of the person that posted it | so I can know who posted each post                             | yes       | yes        |
| Post Cards    | As a system | I would like each post to be formatted as a card                         | so the page will be formatted and organized                    | yes       | yes        |
  
</details>
  
<details closed>
<summary>Account Requirements</summary>

|      Sub-Feature     |    Actor    |                                       Description                                       |                                            Outcome                                           | In Scope? | Completed? |
|:--------------------:|:-----------:|:---------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------:|:---------:|:----------:|
| Edit Account         | As a user   | I would like to edit my account details (password, email, phone number)                 | so that my account becomes more personalized                                                 | yes       | yes        |
| Edit Button          | As a user   | I would like a button that will take me to a page to edit all account   details         | so that I can change my account details                                                      | yes       | yes        |
| Home Course/Handicap | As a user   | I would like to list my home golf course and handicap index                             | so that other users can see where I golf and my skill level                                  | yes       | yes        |
| Account Security     | As a system | I would like to encrypt user passwords in a database                                    | so that their accounts will be secured                                                       | yes       | yes        |
| Logout Button        | As a user   | I would like a button that will log me out of my account                                | so that my account cannot be accessed by other people                                        | yes       | yes        |
| Account Page         | As a user   | I would like an account page                                                            | so that I can see all of my account details in one place                                     | yes       | yes        |
| View Accounts        | As a user   | I would like to view other users' account pages                                         | so that I can see their username, home course, and handicap index                            | no        | yes        |
| Handicap API         | As a system | I would like to hook up users' handicap index with a GHIN API                           | so that users' handicaps will be automatically updated and true                              | no        | no         |
| Home Course API      | As a system | I would like to hook up golf course API                                                 | so that users can choose real courses as their home course                                   | no        | no         |
| Store Account Info   | As a system | I would like to store all user account information in a database                        | so that user data is backed up and protected from data loss                                  | yes       | yes        |
| Friends              | As a user   | I would like to send friend requests to other users                                     | so that I can become friends with them and see their posts                                   | no        | no         |
| Profile Picture      | As a user   | I would like to have a profile picture                                                  | so that people can see what I look like                                                      | no        | no         |
| Post Cards           | As a system | I would like each post to be formatted as a card                                        | so the page will be formatted and organized                                                  | yes       | yes        |
| Delete Posts         | As a user   | I would like a button that deletes a post                                               | so that the person who made the post can prevent anyone else from seeing   that post anymore | yes       | yes        |
| Remove Deleted Posts | As a system | I would like deleted posts to be removed from the database                              | so the data of that post is permanently removed from data storage                            | yes       | yes        |
| Edit Posts           | As a user   | I would like to edit posts                                                              | so I can change what my posts contain                                                        | yes       | yes        |
| Edit Button          | As a user   | I would like a clickable button that directs me to edit a post                          | so that I can edit a post                                                                    | yes       | yes        |
| Edit Content         | As a user   | I would like a text box where I can edit the previous input for a post                  | so that I can change the post contents                                                       | yes       | yes        |
| Edit Error Message   | As a system | I would an error message to display if input doesn’t fit requirements                   | so the user can know if they entered incorrect data                                          | yes       | yes        |
| Edit Post Data       | As a system | I would like the edited post's data to be changed in the database to   reflect the edit | so the database will have accurate data                                                      | yes       | yes        |
  
</details>
  
<details closed>
<summary>Posts Requirements</summary>

|      Sub-Feature      |    Actor    |                                       Description                                       |                                            Outcome                                           | In Scope? | Completed? |
|:---------------------:|:-----------:|:---------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------:|:---------:|:----------:|
| Make Post             | As a user   | I would like to make a post                                                             | so that other users can see what I have to say in the home page                              | yes       | yes        |
| Post Button           | As a user   | I would like a clickable button that directs me to make a post                          | so that I can make a post                                                                    | yes       | yes        |
| Post Content          | As a user   | I would like a text box where I can input my post data                                  | so I can include my post content                                                             | yes       | yes        |
| Post Requirement      | As a system | I would like posts to consist of 1-280 characters                                       | so that I can verify the data is correctly entered                                           | yes       | yes        |
| Post Error Message    | As a system | I would an error message to display if input doesn’t fit requirements                   | so the user can know if they entered incorrect data                                          | yes       | yes        |
| Post Storage          | As a system | I would like to store posts in a database                                               | so that all posts are saved and can be read to the home page for viewing                     | yes       | yes        |
| Delete Posts          | As a user   | I would like a button that deletes a post                                               | so that the person who made the post can prevent anyone else from seeing   that post anymore | yes       | yes        |
| Remove Deleted Posts  | As a system | I would like deleted posts to be removed from the database                              | so the data of that post is permanently removed from data storage                            | yes       | yes        |
| Edit Posts            | As a user   | I would like to edit posts                                                              | so I can change what my posts contain                                                        | yes       | yes        |
| Edit Button           | As a user   | I would like a clickable button that directs me to edit a post                          | so that I can edit a post                                                                    | yes       | yes        |
| Edit Content          | As a user   | I would like a text box where I can edit the previous input for a post                  | so that I can change the post contents                                                       | yes       | yes        |
| Edit Error Message    | As a system | I would an error message to display if input doesn’t fit requirements                   | so the user can know if they entered incorrect data                                          | yes       | yes        |
| Edit Post Data        | As a system | I would like the edited post's data to be changed in the database to   reflect the edit | so the database will have accurate data                                                      | yes       | yes        |
| Comments              | As a user   | I would like to comment on other users' posts                                           | so I can communicate with other users                                                        | no        | no         |
| Comment Button        | As a user   | I would like a clickable button that directs me to make a comment                       | so that I can make a comment                                                                 | no        | no         |
| Comment Content       | As a user   | I would like a text box where I can input my comment data                               | so I can include my comment content                                                          | no        | no         |
| Comment Requirement   | As a system | I would like comments to consist of 1-280 characters                                    | so that I can verify the data is correctly entered                                           | no        | no         |
| Comment Error Message | As a system | I would an error message to display if input doesn’t fit requirements                   | so the user can know if they entered incorrect data                                          | no        | no         |
| Comment Storage       | As a system | I would like to store comments in a database                                            | so that all comments are saved and can be read to the home page for   viewing                | no        | no         |
| Liking Posts          | As a user   | I would like a button I can click to like posts                                         | so that the user whose post I like will know I liked their post                              | no        | no         |
| Post Time             | As a user   | I would like to see when a post was posted                                              | so that I can know when the post was posted                                                  | yes       | yes        |
| Pictures              | As a user   | I would like to post pictures                                                           | so that I can show other users my pictures                                                   | no        | no         |
| Picture File Drop     | As a user   | I would like a file dropbox                                                             | so that I can add picture files to the post                                                  | no        | no         |
| Picture Caption       | As a user   | I would like to add a caption to my picture posts                                       | so that I can describe the pictures                                                          | no        | no         |
  
</details>
  
<details closed>
<summary>User Interface Requirements</summary>

|   Sub-Feature  |    Actor    |                                   Description                                  |                                      Outcome                                     | In Scope? | Completed? |
|:--------------:|:-----------:|:------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------:|:---------:|:----------:|
| Logo           | As a system | I would like the company logo to appear in the top left corner of every   page | so the app looks more professional                                               | yes       | yes        |
| Header         | As a system | I would like every page to have a header including nav bar, titles, and   logo | so the app is clean and usable                                                   | yes       | yes        |
| Title          | As a system | I would like the company name to appear at the top of every page               | so the app looks more porfessional                                               | yes       | yes        |
| Page title     | As a user   | I would like each page's title to appear at the top of the page                | so I will know where I am in the app                                             | yes       | yes        |
| Color Scheme   | As a user   | I would like a pleasurable color scheme                                        | so I will have a better experience using the app and it will be more   organized | yes       | yes        |
| Navigation Bar | As a user   | I would like a navigation bar                                                  | so I can easily navigate the app                                                 | yes       | yes        |
| Menu           | As a user   | I would like a menu dropdown                                                   | so I can easily navigate the app                                                 | no        | yes        |
| Pictures       | As a system | I would like pictures to appear in the background of pages                     | so the app is more appealing to the user                                         | no        | no         |
| Theme          | As a system | I would like all components to have a similar theme                            | so the app will appeaar more professional and be esier for users to   understand | yes       | yes        |
  
</details>
  
<details closed>
<summary>Cloud Requirements</summary>

|   Sub-Feature   |    Actor    |                        Description                        |                         Outcome                        | In Scope? | Completed? |
|:---------------:|:-----------:|:---------------------------------------------------------:|:------------------------------------------------------:|:---------:|:----------:|
| Deploy to Cloud | As a system | I would like this application to be deployed to the cloud | so that the application is more scalable and secure    | no        | yes        |
| Build Pipeline  | As a system | I would like this application to have abuild pipeline     | So the app will be continuosly integrated to the cloud | no        | yes        |
  
</details>
  
## Non-Functional Requirement
The non-functional requirement (NFR) of Mulligan is data integrity. This means that Mulligan will ensure that 100% of the data will be accurate, secure, persistent across the entire system. Data being displayed in the web application will be the same as the data in the database in all cases and situations. Along with being accurate, password data will need to be encrypted so that account data and accessibility is secure. 
#### Database/Model Class Design and Relationship
The system will need to be designed in a specific way to accurately store data to ensure it is persistent. This system is using a MySQL relational database, so it is important the tables in that database are directly modeled after the User Model and Post Model classes in the application. This will ensure that the variables used in the application models are related to identical columns in each table. Those columns will be named the exact same as the model variables, so it will be very easy to understand how data will be accessed and manipulated across the system.
#### Data Validation
Spring data validation will be used in this application wherever users are required to input data. This will ensure that entered data will fit the database variable requirements (Reference ER Diagrams section). For example, the User Model has a variable set for username. This variable, in the database and application, has the requirements of being of type String and between the lengths of 2-36 characters. This means that the application will not allow the user to enter in any data that does not fit these requirements. What this will do for data integrity, is that it will ensure all data matches the same constraints and forces the user to abide by those constraints. This will guarantee that data is accurate, secure, and persistently existing in the database in the correct format.
#### N-Layer Architecture
By designing this application in N-layer architecture, each layer of the application will be separated and can only access the layer directly above and below itself (Reference Logical System Diagram). This will ensure that data cannot be accessed and manipulated directly from any layer other than the data access layer. For example, we would not want the database to be directly accessible from the client layer because it would pose a security risk and it also raises the potential that the data integrity is affected. All data manipulation and access will occur in the data access layer, which will be designed to abide by the constraints of the model classes and database table structures.
#### Data Encryption
User account passwords will be used for a user to login to their account. Without their password, they will not be able to access their account. In turn, if someone else knows their password, they can access their account which is a security risk in the system. To help prevent this from happening, password data will be encrypted in the database. This will require the system to handle encryption and decryption of the password data as it is used throughout the system to authenticate a user for their account.


