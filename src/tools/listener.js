import chalk from 'chalk';
import logger from '@tools/logging';
import config from 'config';
import { dbConnection } from 'src/dbConnection';

/**
 * Spins a server on given socket parameters [HOST, PORT].
 */

export default function registerListener(app, PORT, HOST) {
	const environment = config.util.getEnv('NODE_ENV');
	const server = app.listen(PORT, HOST, async () => {
		const { address, port } = server.address();
		logger.info(`server at port ${chalk.magenta(port)} in ${chalk.yellow(environment)} mode`);
		logger.info(`Listening for requests at ${chalk.cyan(address + ':' + port)}`);
		logger.info(`Logging level set to: ${chalk.blue(logger.level)}`);
		await dbConnection();
	});
}
