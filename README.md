# MyFlixAngularClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Description

This project has been created for the purpose of building the client-side for an app myFlix using Angular.
The project is using existing server-side code (REST API and a database) including documentation.

## User stories

- As a user I am looking for possibility to get information of movies including director and genre to improve my knowledge about movies I have seen or planning to see.
- As a user I want to be able to set up a profile where i can update and save my information as well as adding movies to my favorite list

## Key Features

- Main page is Welcome view allowing the user to log in or register
- Once login/registration has been successfull a screen with all Movies appears
- Each movie has set of options, which when clicked user will see details of the movie also option to add movie to favorite movies list of user.

# Process of development

### Instalation of Angular

1. Confirm that Angular is not installed 

`ng --version`

2. If Angular is not installed on the device

`npm install -g @angular/cli`

### Setting up new Angular project

1. On your terminal navigate to chosen location/folder and set up the project

`ng new your-project-name`

2. Navigate to new project 

`ng serve --open`

### Setting up loading of data from existing movie API

1. Create Angular HttpClient 

- in app.modules.ts add:  `import { HttpClientModule } from '@angular/common/http'
- in in the imports of @NgModule add HttpClientModule

2. Create Angular Service for the REST API

- In the app folder implement new Service

`ng generate service fetch-api-data`

- In fetch-api-data.service.ts file add these imports

` import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';`
` import { Observable, throwError } from 'rxjs';`
` import { catchError } from 'rxjs/operators';`
` import { map } from 'rxjs/operators';`

3. Implementation of services logic to create API calls

- User login
- User registration
- Get list of all movies
- Get one single movie
- Get genre
- Get director
- Get user
- Add a movie to the list of favorite movies
- Get a list of user's favorite movies
- Edit user's profile
- Delete existing user
- Delete a movie from user's favorite movies list


### Applicatio requires implementation of Angular Material

1. Project dependency instalation

`ng add @angular/material`

2. In app.modules.ts import modules from Angular Material

3. In order of functionality of other components add modules to the array of imports

### Create necessary components for the user's ability to use application

Creation of a component:

` ng generate component your-component-name`

Creation of components structure:

- Welcome Screen
  - User Registration
  - User login
- Movie Card
- Navbar
- Movie Card components
  - Synopsis
  - Director
  - Genre
- Profile View
  - Edit profile

### Routing

1. Import Angular built-in router:

` import { RouterModule, Routes } from '@angular/router';`

2. To be added into the app.component.html

`<router-outlet></router-outlet>`

3. Add routes into app.module.ts

### TypeDoc Documentation

1. Install typeDoc:

` npm install typedoc`

2. Comment the code

3. Run the typedoc to create documentation:

` npx typedoc --entryPointStrategy expand ./src`






