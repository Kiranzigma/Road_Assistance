export interface IResponse{
    auth:Boolean;
    token: any;
    user: Iuser;
}

export interface Iuser{
    userType : String
}

export interface IUserRequest{
    created_Date: string;
    id: string;
    state: string;
    description: string;
    user: Iuser
}
