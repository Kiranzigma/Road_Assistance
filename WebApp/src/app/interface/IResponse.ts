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
    created_Date: string;
    id: string;
    state: string;
    description: string;
    user: Iuser
}

export interface userResponse{
    userEmail: String;
    userPassword: String;
}

export interface verificationResponse{
    userEmail: String;
    verificationCode: String;
}