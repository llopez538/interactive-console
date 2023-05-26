import { v4 as uuidv4 } from 'uuid';

class Task {

    id: string  = '';
    completedIN: string | null = null;

    constructor( public desc: string = '') {
        this.id = uuidv4();
    }

}

export default Task;