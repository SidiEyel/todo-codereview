# TodoMVC: React-Redux

## Description

This application uses React in combination with Redux to implement the TodoMVC application.

-   [React](https://reactjs.org/) is a JavaScript library for creating user interfaces.
-   [Redux](https://redux.js.org/) centralizes your application's state.
-   [React-Redux](https://react-redux.js.org/) is designed to work with React's component model.

## Tasks

### Delete a Task
The goal of this task is to implement the delete functionality for a single TODO-Item. To achieve this we need to implement the following: 

- Create deleteTodo function that dispatches an action of type DELETE_TODO.

- Add the deleteTodo action to the mapDispatchToProps function.

- Extend the todos reducer the handle DELETE_TODO action type.

- Use the action in the todo item component. 

### Filter all Tasks
The goal of this task is to implement the filter functionality for TODO-Items. To achieve this we need to implement the following: 

- Extend the getFilteredTodos function the handle active and completed todos. 

- Implement the getCompletedTodos logic to calculate the number of all completed todos.

### Clear all Completed Tasks
The goal of this task is to implement the delete functionality for all completed TODO-Items. To achieve this we need to implement the following: 

- Create clearCompleted function that dispatches an action of type CLEAR_COMPLETED.

- Add the clearCompleted action to the mapDispatchToProps function.

- Extend the todos reducer the handle CLEAR_COMPLETED action type.

- Use the action in the footer component. 


## Implementation details

This implementation uses Redux to manage state and data flow of the application.
The Redux pattern is similar to a mvc pattern, with the main difference that Redux is unidirectional.
Redux uses actions to dispatch a change, which is captured by reducers that update a central store.
Once the state in the store updates, the view receives the new state and can reflect those changes to the user.

Redux:\
Model: Redux store\
View: React ui components\
Controller: React connected components + Redux reducers

MVC:\
Model: maintains the data and behavior of an application\
View: displays the model in the ui\
Controller: serves as an interface between view & model components

The storage solution uses an in-memory data object that implements a simple array to hold the todos.

## Build steps

To build the static files, this application utilizes webpack. It minifies and optimizes output files and copies all necessary files to a `dist` folder.

## Requirements

The only requirement is an installation of Node, to be able to install dependencies and run scripts to serve a local server.

```
* Node (min version: 18.13.0)
* NPM (min version: 8.19.3)
```

## Local preview

```
terminal:
1. npm install
2. npm run dev
browser:
1. http://localhost:7001/
```
