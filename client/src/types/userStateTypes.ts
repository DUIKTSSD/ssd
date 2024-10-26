export interface UserState {
    username: string,
    email: string,
    password: string
}

export const SET_USER = 'SET_USER'

interface SetUserAction {
    type: typeof SET_USER;
    payload: UserState
}

export type UserActionTypes  = SetUserAction