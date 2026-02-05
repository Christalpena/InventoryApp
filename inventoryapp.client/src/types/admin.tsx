export interface AdminUser {
    id: number;
    username: string;
    role: string;
}

export interface AdminProduct {
    id: number;
    name: string;
    description: string;
    quantity: number;
    createdBy: string;
}
