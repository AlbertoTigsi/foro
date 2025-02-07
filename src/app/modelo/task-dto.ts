export class TaskDTO {
    title?: string;
    description?: string;
    status?: string;
    priority?: string;
    created_by?: number; 
    assigned_to?: number
    due_date?: Date;

}