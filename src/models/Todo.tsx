export interface ToDo {
    id: string;
    text: string;
    dueDate?: Date;
    done: boolean;
    doneDate?: Date;
    priority: 'High' | 'Medium' | 'Low';
    creationDate: Date;
  }
  