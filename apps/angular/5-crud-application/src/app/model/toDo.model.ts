export class ToDo {
  userId!: number;
  id!: number;
  title!: string;
  completed!: boolean;

  constructor(obj?: Partial<ToDo>) {
    Object.assign(this, obj);
  }
}

export interface TodoState {
  items: ToDo[];
  loading: boolean;
  error: string;
}
