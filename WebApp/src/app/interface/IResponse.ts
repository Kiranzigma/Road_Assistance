export interface IResponse{
    auth:Boolean;
    token: any;
    user: Iuser;
}

export interface Iuser{
    userType : String
}

export interface Imake{
    Make_Name: String;
}