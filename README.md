# Fullstack Engineer Take Home
## Directions
Your objective is to write a simple React based web application that useds the API of this server. Build this app as if it were the beginning of a much larger project and consider all the things that come with that. Code quality, state management, routing, URL structure, and reusability are all equally important.

## Deliverables
Create your app in its own folder. Make sure to include a `package.json` and a way to run the server (**Tip: If you use create-react-app, this should just be `npm run start`**). Zip up your app folder **ONLY** and send it back to us. Add to your email a description of the work you did, choices you made and the reasoning behind them, issues you faced, and any other information you think we might find relevant.

## Features to Implement

### User List
The first feature to implement is to list and paginate all users. Find a UI framework you're comfortable to give the app some styling. You don't need to go overboard or spend a lot of time on styling. Using prebuilt components and styling/themes is fine.

Show a table of users, each with profile picture, first and last name and a link to the user's profile.

Paginate the list for 20 users at a time. There are 200 users and 10 pages total.

### User Profile
When the link to a user profile is loaded, show all of the user information except the ID. There also needs to be a way to edit the first name, last name, age or any of the address fields. **Make sure to save the changes to the server.**

Links directly to a user profile should work. For example, if I type http://localhost:8080/user/1 in the address bar, it should immediately load the user profile for user 1.

## Tips
- You can use [create-react-app](https://create-react-app.dev/). If you're comfortable enough with React and the needed build tools you don't need to. But when you submit, we should be able to run it with a single command. If you do use CRA, make sure to [eject](https://create-react-app.dev/docs/available-scripts#npm-run-eject) prior to submitting.
- Javascript is fine, Typescript is a huge bonus. We write Typescript at GreenPark. Not an issue if you don't know Typescript. Do this project in what you're comfortable with.
- As mentioned, use any UI framework you're comfortable with. [Antd](https://ant.design) is what we use. [Bootstrap](https://getbootstrap.com/) is fine. If you have something you know and are comfortable with, go with that.

## API
To run the API server, you can either download and install Docker ([Mac](https://docs.docker.com/docker-for-mac/install/) or [PC](https://docs.docker.com/docker-for-windows/install/)) or download and install [Go](https://golang.org/dl/).

### Running the API Server
No matter which method you choose to run the server, it will run on port 8080. You should then be able to access it at `http://localhost:8080`

#### Run With Go
This may be the easiest option if you're not familiar with Docker.

After install Go, run the server

    go run *.go

#### Run With Docker
After installing Docker
1. Build the container

        docker build -t greenpark-api .
2. Run the container

        docker run --rm -it --name greenpark-api -p 8080:8080 greenpark-api

### Documentation

#### GET /api/users
| Parameter | Description |
|---|---|
| limit | Define the number of users returned. By default is 100. |
| skip | Skip some number of users before returning the next `limit` |

##### Example
    /api/users?limit=20&skip=40

##### Response
    {
        "id": 1,
        "first": "John",
        "last": "Doe",
        "email": "john.doe.@gmail.com",
        "age": 55,
        "address": "1313 Mockingbird Lane",
        "city": "San Francisco",
        "state": "California",
        "zip": "94102",
        "profile_pic": "https://s3.aws.com/something.jpg"
    }

| Status Code | Description |
|---|---|
| 200 | All good |
| 400 | Invalid value provided for `skip` or `limit` |

#### POST /api/users/[:id]
##### REQUEST
**Only send the fields you want to update**. All fields except `id` and `profile_pic` can be updated.

    {
        "first": "John",
        "last": "Doe",
        "email": "john.doe.@gmail.com",
        "age": 55,
        "address": "1313 Mockingbird Lane",
        "city": "San Francisco",
        "state": "California",
        "zip": "94102",
    }

##### Response
| Status Code | Description |
|---|---|
| 200 | All good |
| 400 | Invalid JSON provided as the request body |
| 404 | The user id provided in the URL does not exist |
