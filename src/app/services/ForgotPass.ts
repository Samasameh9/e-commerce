'use server'
import axios from "axios";
type ForgotPassData = {
  email: string;
};
export default async function ForgotPass(userData:ForgotPassData) {
try {
    let {data}= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",userData)
   return data
} catch (error:any) {
    return  error.response?.data
}
}

//reset code
export  async function ResetCode(userData:{}) {
try {
    let {data}= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",userData)
   return data
} catch (error:any) {
    return  error.response?.data
}
}
//reset password
export  async function ResetPassword(userData:{}) {
try {
    let {data}= await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",userData)
   return data
} catch (error:any) {
    return  error.response?.data
}
}

