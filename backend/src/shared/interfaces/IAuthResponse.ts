export interface IAuthResponse extends Request {
    user: {
        sub: number,
        email: string,
        name: string,
        iat: number,
        exp: number,
    };
}