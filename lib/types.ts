export enum ResponseCategory {
    none,
    regular,
    warning,
    alarm,
    error
}

export interface UserContext{
    userAddress: string;
}