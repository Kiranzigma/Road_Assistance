export interface IResponse{
    auth:Boolean;
    token: any;
    user: Iuser;
}

export interface Iuser{
    userType : String
}

export interface IUserRequest{
    created_at: string;
    number: string;
    state: string;
    title: string;
    user: Iuser;
    items: [];
    total_count: number;
}
