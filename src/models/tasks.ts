import Task from './task';
require('colors');


class Tasks {

    public _list: any = {}

    constructor() {
        this._list = {}    
    }

    public loadTaskFromArray( tasks = []): void {
        tasks.forEach( (task: Task) => {
            let { id } = task;
            console.log(id);
            
            this._list[id] = task
        })
    }

    get arrayList() {
        const list: any[] = [];
        Object.keys(this._list).forEach((key: string): void => {
            list.push(this._list[key])
        })
        return list;
    }

    public createTask( desc: string ) {
        const task = new Task(desc);
        this._list[task.id] = task;
    }

    public getListTasks(): void {
        let list: any = [];
        
        this.arrayList.forEach( (task: Task, i) => {
            let index = `${i + 1}`.green;
            const { desc, completedIN } = task
            const status = (completedIN) ? 'Completed'.green : 'Pending'.red;

            console.log(`${index} ${desc} :: ${status}`)           

        });
    }

    public getListTaskCompleted( completed: boolean = true): void {

        this.arrayList.forEach((task: Task) => {
            
            const { desc, completedIN } = task
            const status: string = (completedIN) ? 'Completed'.green : 'Pending'.red;
            
            let cont: number = 0;
            
            if (completed) {
                if (completedIN) {
                    cont += 1;
                    console.log(`${cont.toString().yellow} ${desc} :: ${completedIN.green}`)
                }
            } else {
                if (!completedIN) {
                    cont += 1;
                    console.log(`${cont.toString().yellow} ${desc} :: ${status}`)
                }
            }
            
        })
    }

    public deleteTask( id: string ) {
        
        if (this._list[id]) {
            delete this._list[id];    
        }
    }

    public toggleCompleted(ids: any[] = []) {
        
        ids.forEach( (id) => {
            const task: Task = this._list[id];

            if ( !task.completedIN ) {
                task.completedIN = new Date().toISOString()
            }
        });

        this.arrayList.forEach( (task: Task) => {

            if ( !ids.includes(task.id) ) {
                const taskPending: Task = this._list[task.id];
                taskPending.completedIN = null;
            }
        })
    }
}

export default Tasks;