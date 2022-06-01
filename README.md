# ThalesInterview-server<a name="top"></a>

An application level backend application to read qrcodes and process qr codes and get information out of them.

## Table of Contents <a name="toc"></a>

- [Search Server](#top)
  - [Table of Contents](#toc)
  - [Justification of Design Decisions](#design)
  - [Implemented Tests and Discussion](#tests)
  - [Setup Instructions](#setup)

## Justification of Design Decisions <a name="design"></a>

I used Nodejs with Javascript as I had only less than 2 days to complete this assignment.

While Typescript is good for [scaleability](https://www.toptal.com/typescript/typescript-vs-javascript-guide) as compared to Javascript, I used Javascript (JS) here as scaleability is of the least concern to me. Furthermore, due to the good documentation and maturity of JS, I chose this as it is good for fast prototyping.

The database is simply non relational as we need not related each user to the image that they insert. Hence, a choice of a NOSQL database like MongoDB. Due to the nature of this project, MongoDB is highly [dynamic](https://www.geeksforgeeks.org/difference-between-firebase-and-mongodb/) in nature, which gives the freedom of defining the structure beforehand as compared to firebase. Furthermore, the number of reads and writes to the firebase would definitely cause a blaze plan for a 2 day project like this.

NodeJS is also used here for fast prototyping and is especially good for a potential Agile nature project like this. NodeJS is also mature in its framework and is food for file support unlike that of FASTAPI. Also, speed is faster than that of most frameworks.

## Implemented Tests and Discussion <a name="tests"></a>

The testing was designed based on unit testing. Due to time constraints as I had only a day left to finish this, I utilised the Jest js testing library to provide tests on the main function, which was to test if the QRCode in the image is valid or not. As file uploading is rather huge, I had to ensure that each file byte is transferrred over. Hence, the high timeout timing to prevent the TCP file connection from being cut off before the whole image file is being sent over.

## Setup Instructions <a name="setup"></a>

<br/>

### Requirements

What ever that is highlighted in bold is very important in ensuring that the cloned code works.

- Node version of 16.4.1
- <b>node package manager (npm) </b> to install and provide the scripts for running the respository.
- env file
- eslint and prettier configured on your vscode (optional)

<br/>
<br/>

### Main code respository

As this is a private repository, you would have to clone. Primarily, I work using HTTPS with the following command.

For Mac users, you can open the terminal through the search bar.

For Windows users, make sure that you have git bash.

1. Clone the repository via the <b> terminal</b>

```
git clone https://github.com/caramelmelmel/thalesInterview-server.git
```

2. Change directory into the repository

```
cd thalesInterview-server
```

3. Create a `.env` file of the following in the project root.

```
MONGODB = mongodb+srv://melody:thales1234@cluster0.jyaoach.mongodb.net/?retryWrites=true&w=majority

SECRET_KEY = fhjqw0t4y065h4obt4634[lhjasfs_30=
```

4. Once you are in the repository, ensure that you first do an installation of all the dependencies in the `package.json`

```cmd
npm i
```

5. Run the server

```
 npm run dev
```

You should have the following output. Note that my terminal screenshot shows the output that you should obtain.

<p align="center"><img width="420px" src="./RMIMG/welps.png"></p>

### Postman API

Before preparing anything else, the database has already been seeded with entries. Since, it's an online database, it can easily be accessed for the purpose of this assignment.

Ensure that you can access the Postman link [here](https://documenter.getpostman.com/view/14761488/Uz5FHvvZ).

Before you do anything else, Register and login first.

#### Procedure:

1. Registration

`http://localhost:8000/register`

Ensure that you enter the email and password fields.
Follow the API documentation and simply run the fields.

2. Login

`http://localhost:8000/login`

Ensure that you enter the email and password fields.
Follow the API documentation and simply run the fields. It will check if you are in the database. Once you successfully Login, you will obtain the bearer token like in the image below.

Copy the bearer token like the one highlighted in blue.

<p align="center"><img width="420px" src="./RMIMG/postmanlogin.png"></p>

3. Authenticated routes
Once completed, paste the bearer token in the bearer token headers. An example authenticated route is shown below. Follow the screenshots sequentially on the postman interface.
<p align="center"><img width="420px" src="./RMIMG/postmanislife.png"></p>

Select Bearer Token from the dropdown displayed.

<p align="center"><img width="420px" src="./RMIMG/postmanselect.png"></p>

Paste the token in the blue highlighted text box.

<p align="center"><img width="420px" src="./RMIMG/pastetoken.png"></p>

4. Non authenticated routes

5. File based routes
   To upload the file image of your choice, do the following steps sequentially:

Select File from the dropdown based on the image below.

<p align="center"><img width="420px" src="./RMIMG/selfileoption.png"></p>
Click on Select Files and then upload your file.
<p align="center"><img width="420px" src="./RMIMG/uipower.png"></p>

#### Testing

very simply, just run the following command in the terminal in the project root directory again.

```
 npm run test
```
