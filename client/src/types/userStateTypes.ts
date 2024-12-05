export interface UserState {
    username: string,
    email: string,
    password: string
}
export interface VerificationData {
    email: string;
    code: string;
}

export interface AuthState {
    data: UserState | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}