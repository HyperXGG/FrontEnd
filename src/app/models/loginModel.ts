export interface loginModel {
    username: string;
    password: string;
}

export interface loginResult {
    token: string;
    expiration: string;
    role: string;
}