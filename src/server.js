import express from 'express';
import 'dotenv/config';
import config from 'config';
import chalk from 'chalk';

import logger from '@tools/logging';
import { dbConnection } from './dbConnection';

import {
	checkEnv,
	registerLogging,
	registerPreprocessor,
	registerRouters,
	setupDocs
} from '@tools';

const PORT = config.get('port');

const app = express();

app.use(express.json());
registerLogging(app);
checkEnv();
registerPreprocessor(app);
setupDocs(app);
registerRouters(app);

const server = app.listen(PORT);

server.once('listening', async () => {
	const { address, port } = server.address();
	const environment = config.util.getEnv('NODE_ENV');
	logger.info(`server at port ${chalk.magenta(port)} in ${chalk.yellow(environment)} mode`);
	logger.info(`Listening for requests at ${chalk.cyan(address + ':' + port)}`);
	logger.info(`Logging level set to: ${chalk.blue(logger.level)}`);

	await dbConnection();
});

module.exports = server;
