const path = require("node:path");
const auth = require("express-basic-auth");
const express = require("express");

const app = express();

const basicAuth = auth({
	realm: "SmartUniversalMirror² Area restricted.",
	users: { SmartUniversalMirror: "CallMeADog" }
});

app.use(basicAuth);

// Set available directories
const directories = ["/tests/configs", "/tests/mocks"];
const rootPath = path.resolve(`${__dirname}/../../../`);

for (let directory of directories) {
	app.use(directory, express.static(path.resolve(rootPath + directory)));
}

let server;

exports.listen = (...args) => {
	server = app.listen.apply(app, args);
};

exports.close = async () => {
	await server.close();
};
