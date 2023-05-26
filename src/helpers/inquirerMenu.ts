import Task from "../models/task";
import Tasks from "../models/tasks";

require('colors');

const inquirer = require('inquirer');

const questions: Object[] =  [
    {
        type: 'list',
        name: 'option',
        message: 'What you want to do?',
        choices: [
            {
                value: '1',
                name:`${'1.'.yellow} Create task`
            },
            {
                value: '2',
                name:`${'2.'.yellow} List task`
            },
            {
                value: '3',
                name:`${'3.'.yellow} List task completed`
            },
            {
                value: '4',
                name:`${'4.'.yellow} List task pending`
            },
            {
                value: '5',
                name:`${'5.'.yellow} Complete task(s)`
            },
            {
                value: '6',
                name:`${'6.'.yellow} Delete task`
            },
            {
                value: '0',
                name:`${'0.'.yellow} Exit\n`
            },
        ]

    }
];

const enter = [
    {
        type: 'input',
        name: 'stop',
        message: `Click to ${'ENTER'.yellow} to continue \n`
    }
]


const inquirerMenu = async (): Promise<string> => {
    console.clear();
    
    console.log('==============================='.green);
    console.log('     Choose a option '.yellow);
    console.log('===============================\n'.green);

    const { option } = await inquirer.prompt(questions); 
    
    return option;
}

const stopInquirerMenu = async (): Promise<void> => {
    await inquirer.prompt(enter);
}

const readIput = async ( message: string = '' ): Promise<any> => {

    const questionInput = [
        {
            type: 'input',
            name: 'description',
            message,
            validate( value: any ) {
                if (value.length === 0) {
                    return 'Pleas insert a value';
                }
                return true;
            }
        }
    ];

    const { description } = await inquirer.prompt(questionInput);
    return description;
}

const listTaskToDelete = async (tasks: any = []) => {

    const choices = tasks.map( (task: any, i: number): Object => {
        const idx = `${ i + 1 }.`.yellow;
        return {
            value: task.id,
            name: `${idx} ${task.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0. '.yellow + 'Cancel'
    });

    const question = [
        {
            type: 'list',
            name: 'id',
            message: 'Delete',
            choices 
        }
    ];

    const { id } = await inquirer.prompt(question); 

    return id;
    
}

const confirm = async ( message: string ): Promise<boolean> => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message,

        }
    ];

    const { ok } = await inquirer.prompt(question);

    return ok;
}

const checkListTask = async (tasks: any = []) => {

    const choices = tasks.map( (task: Task, i: number): Object => {
        const idx = `${ i + 1 }.`.yellow;
        return {
            value: task.id,
            name: `${idx} ${task.desc}`,
            checked: (task.completedIN ? true : false)
        }
    });

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Choice',
            choices 
        }
    ];

    const { ids } = await inquirer.prompt(question); 

    return ids;
    
}

export {
    inquirerMenu,
    stopInquirerMenu,
    readIput,
    listTaskToDelete,
    confirm,
    checkListTask
};