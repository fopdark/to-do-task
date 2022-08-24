export interface DataItem {
  id: string;
  title: string;
  shortDescription?: string;
  assignedTo: Employee | undefined;
  dueDate: Date;
  status: string;
}

export enum Status {
  closed = '0',
  open = '1',
}

export interface Employee {
  name: string;
  email: string;
}
