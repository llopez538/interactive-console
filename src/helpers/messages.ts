require('colors');
import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline';

const showMenu = ():Promise<any> => {
    return new Promise( (resolve) => {
        console.clear();
    
        console.log('==============================='.green);
        console.log('     Choose a option '.yellow);
        console.log('===============================\n'.green);
    
        console.log(`${'1.'.yellow} Create task`);
        console.log(`${'2.'.yellow} List task`);
        console.log(`${'3.'.yellow} List task completed`);
        console.log(`${'4.'.yellow} List task pending`);
        console.log(`${'5.'.yellow} Complete task(s)`);
        console.log(`${'6.'.yellow} Delete task`);
        console.log(`${'0.'.yellow} Exit\n`);
        resolve(true);
    
        const readln = readline.createInterface({input, output });
        
        readln.question('Choose a option: ', (opt:any)=> {
            readln.close();
            resolve(opt);
        });
    });
}

const stop = () => {
    return new Promise( (resolve)=> {
    
        const readln = readline.createInterface({input, output });
        
        readln.question(`\nClick to ${'ENTER'.yellow} to continue \n`, (opt)=> {
            readln.close();
            resolve(opt);
        });
    });
}

export {
    showMenu,
    stop
}
