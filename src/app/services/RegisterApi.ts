import axios from "axios";
import * as zod from "zod";
import { Schema } from "../schema/RegisterSchema";
export default async function Signup(userData:zod.infer<typeof Schema>) {
try {
    let {data}= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",userData)
   return data
} catch (error:any) {
    return  error.response?.data
}
}
