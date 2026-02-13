'use server'
import axios from "axios";
type ForgotPassData = {
  email: string;
};
export default async function ForgotPass(userData:ForgotPassData) {
try {
    let {data}= await axios.post(`${process.env.API}/auth/forgotPasswords`,userData)
   return data
} catch (error:any) {
    return  error.response?.data
}
}

//reset code
export  async function ResetCode(userData:{}) {
try {
    let {data}= await axios.post(`${process.env.API}/auth/verifyResetCode`,userData)
   return data
} catch (error:any) {
    return  error.response?.data
}
}
//reset password
export  async function ResetPassword(userData:{}) {
try {
    let {data}= await axios.put(`${process.env.API}/auth/resetPassword`,userData)
   return data
} catch (error:any) {
    return  error.response?.data
}
}

