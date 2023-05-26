import colors from 'colors';

import { 
    inquirerMenu, 
    listTaskToDelete, 
    readIput, 
    stopInquirerMenu,
    confirm,
    checkListTask 
}  from './helpers/inquirerMenu';

import Tasks from './models/tasks';
import { readDB, saveDB } from './helpers/saveFile';

const main = async (): Promise<void> => {
    let opt: string = '';

    const tasks = new Tasks();
    const taskDB = readDB();

    if (taskDB) {
        tasks.loadTaskFromArray(taskDB);
    }

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1': // 'Create task'
                const desc = await readIput('Description:');
                tasks.createTask(desc);
                break;

            case '2': // 'List task'
                tasks.getListTasks(); 
                break;

            case '3': // 'List task completed'
                tasks.getListTaskCompleted(true)
                break;
                
            case '4': // 'List task pending'
                tasks.getListTaskCompleted(false)
                break;

            case '5': // 'Complete task(s)'
                const ids = await checkListTask(tasks.arrayList);
                tasks.toggleCompleted(ids);
                console.log(ids);
                
                break;

            case '6': // 'Delete task'
                const id = await listTaskToDelete(tasks.arrayList);
                
                if (id !== '0') {
                    
                    const confirmation = await confirm("Do you want to delete this task?");
                    
                    if(confirmation) {
                        
                        tasks.deleteTask(id);
                        console.log('task deleted');
                        
                    }
                }
                
                break;

            case '0': // 'Exit'
                break;
        
            default:
                break;
        }

        console.log('\n');
        saveDB(tasks.arrayList);
        
        await stopInquirerMenu();

    } while (opt !== '0');

}

main();