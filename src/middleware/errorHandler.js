// export const errorHandler = (err, req, res, next) => {
//     console.error('Error:', err);

//     const status = err.status || 500;
//     const message = err.message || 'Internal Server Error';

//     res.status(status).json({
//         status: 'error',
//         message
//     });
// }; 


// import chalk from 'chalk';

// export const errorHandler = (err, req, res, next) => {
//     // Get the current timestamp
//     const timestamp = new Date().toISOString();

//     // Log error details with enhanced formatting
//     console.error(chalk.bgRed.white.bold('✖ ERROR:') + ' ' + chalk.red.bold(err.message));
//     console.error(chalk.bgYellow.black.bold('⏰ TIMESTAMP:') + ' ' + chalk.yellow(timestamp));
//     console.error(chalk.bgBlue.white.bold('➡ REQUEST:') + ' ' + chalk.cyan(`${req.method} ${req.url}`));
//     console.error(chalk.bgCyan.black.bold('🖥 USER-AGENT:') + ' ' + chalk.cyan(req.headers['user-agent']));
//     console.error(chalk.bgMagenta.black.bold('🔍 STACK TRACE:'));
//     console.error(chalk.gray(err.stack)); 

//     // Add a visual separation after the stack trace
//     console.error(chalk.bgGray.white.bold('\n----- END OF ERROR -----\n'));

//     // Send error response to the client
//     const status = err.status || 500;
//     const message = err.message || 'Internal Server Error';
//     res.status(status).json({
//         status: 'error',
//         message
//     });
// };


// import chalk from 'chalk';

// export const errorHandler = (err, req, res, next) => {
//     const timestamp = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });

//     console.error(chalk.bgRed.white.bold(' ❌ ERROR ') + ' ' + chalk.red.bold(err.message));
//     console.error(chalk.bgYellow.black.bold(' 🕒 TIMESTAMP ') + ' ' + chalk.yellow(timestamp));
//     console.error(chalk.bgBlue.white.bold(' 🌐 REQUEST ') + ' ' + chalk.cyan(`${req.method} ${req.url}`));
//     console.error(chalk.bgMagenta.white.bold(' 📱 USER-AGENT ') + ' ' + chalk.cyan(req.headers['user-agent']));
//     console.error(chalk.bgGray.white.bold(' 🛠 STACK TRACE '));
//     console.error(chalk.gray(err.stack));

//     console.error(chalk.bgWhite.black.bold('\n----- END OF ERROR -----\n'));

//     const status = err.status || 500;
//     const message = err.message || 'Internal Server Error';
//     res.status(status).json({
//         status: 'error',
//         message
//     });
// };
import chalk from 'chalk';

export const errorHandler = (err, req, res, next) => {
    const timestamp = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });

    console.error(chalk.bold.bgRed.white(' ❌ ERROR ') + ' ' + chalk.red.bold(err.message));
    console.error(chalk.bold.bgCyan.white(' 🕒 TIMESTAMP ') + ' ' + chalk.cyan(timestamp));
    console.error(chalk.bold.bgBlue.white(' 🌐 REQUEST ') + ' ' + chalk.whiteBright(`${req.method} ${req.url}`));
    console.error(chalk.bold.bgGreen.white(' 📱 USER-AGENT ') + ' ' + chalk.green(req.headers['user-agent']));
    console.error(chalk.bold.bgGray.white(' 🛠 STACK TRACE '));
    console.error(chalk.redBright(err.stack));

    console.error(chalk.bgWhite.black.bold('\n---------- END OF ERROR ----------\n'));

    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({
        status: 'error',
        message
    });
};

