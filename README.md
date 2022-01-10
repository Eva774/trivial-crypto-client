This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
When running in development mode it automatically tries to connect to `localhost:8080` for the websocket server of `dsptw-server`.

When built and served by the `dsptw-server` the client assumes the server runs on the same server and port, which by default is also `localhost:8080`. This can be changed in the `config.json` file of `dsptw-server`.

### `npm run build`

Builds the app for production to the `build` folder.


It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

