export interface UserState {
    username: string,
    email: string,
    password: string
    code:string|null
}

export interface AuthState {
    data: UserState | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}