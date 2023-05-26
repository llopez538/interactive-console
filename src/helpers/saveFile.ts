import * as fs from 'node:fs';

const file: string = __dirname + '/../db/data.json';

const saveDB: any = (data: Object): void => {
    fs.writeFileSync(file, JSON.stringify(data));
}

const readDB: any = (): Object | null => {
    if(!fs.existsSync(file)) {
        return null;
    }

    const info = fs.readFileSync(file, {encoding: 'utf-8'});

    const data = JSON.parse(info);
    
    return data;
}

export {
    saveDB,
    readDB
}