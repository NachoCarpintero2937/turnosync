export interface IntTasks {
    id: number;
    type: 'email' | 'wsp'; 
    recipients: string[]; 
    img: string; 
    title: string | null; 
    message: string;
    status: 'pending' | 'processing' | 'completed' | 'failed'; 
    show_button: boolean | null;
    created_at: string; 
    updated_at: string; 
    process: boolean;
    percentage_completed:number;
 }