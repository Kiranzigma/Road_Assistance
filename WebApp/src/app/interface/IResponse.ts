export interface IResponse{
    auth:Boolean;
    token: any;
    user: Iuser;
}

export interface Iuser{
    id:String;
    userType : String;
    userFirstName : String;
    userLastName: String;
    userEmail: String;
    userPassword: String;
    isVerified: Boolean;
    userMobileNumber: Number;
    userGender: Number;
    vendorLicense: String;
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
