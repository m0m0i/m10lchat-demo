# Multilingual Chat Frontend
## Introduction
This is the Multilingual chat and the toxic behavior detection solution demo application.\
In the online gaming world and coming Metaverse world, this might includes a lot of unwilling behaviors, such as sexual harassment, hate speech, threats of violence, doxing, spamming, flaming, griefing, and intentionally inhibiting the performance of one’s own team. So we want to mitigate this kind of "disruptive behavior" for healthy happy gaming/virtual lives.
This multilingual chat application demo is using Google Cloud AI power to find out "bad behaviors", so as to you can simply detect and ban bad players.

## Preparation
A few steps to set up this demo.
### Backend Service
This is the frontend application for the demo. You can use [this repo](https://github.com/Wonha/multilingual-chat.git) for the backend service.

### Firebase Authentication
You need a firebase project for the user authentication.
Please refer [this website](https://firebase.google.com/docs/auth) for preparing Firebase Authenticaiton.\

### `.env` file
You need to create `.env` file on the root directory of your local application code directory(the same directory as `package.json`)
```
# Firebase config
REACT_APP_API_KEY=""
REACT_APP_AUTH_DOMAIN=""
REACT_APP_PROJECT_ID=""
REACT_APP_STORAGE_BUCKET=""
REACT_APP_MESSAGING_SENDER_ID=""
REACT_APP_APP_ID=""
REACT_APP_MEASUREMENT_ID=""

# Backend server address
REACT_APP_SERVER_ADDRESS=""
```

## Getting Started 🚀
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).\
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

### `npm run build`

Builds the app for production to the `build` folder.\

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

## Notes
Enhancement ideas
- [ ] isLoading
- [ ] Change language within the room

Disclaimer
This project is not an official Google project. It is not supported by Google and Google specifically disclaims all warranties as to its quality, merchantability, or fitness for a particular purpose.


## License
[Apache License, version 2.0](http://www.apache.org/licenses/LICENSE-2.0)  
[Terms of Service for Firebase Services](https://firebase.google.com/terms/).
