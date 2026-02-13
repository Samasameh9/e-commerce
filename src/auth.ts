import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { failedLogin, succcessLogin } from "./types/authinterface";
import {jwtDecode} from 'jwt-decode'

export const authOptions:NextAuthOptions={
    pages:{
signIn:'/login'
    },
providers:[
    Credentials({
        name:'credentials',
        credentials:{
            email:{},
            password:{}
        },
        authorize:async (credentials)=>{
            const response=await fetch(`${process.env.API}/auth/signin`,{
                method:'POST',
                body:JSON.stringify({
                    email:credentials?.email,
                    password:credentials?.password
                }),
                headers:{
                    "Content-Type": "application/json",
                }
            })
            const payload:succcessLogin|failedLogin= await response.json()
            console.log(payload);
            
          if('token' in payload){
            const decodeToken:{id:string}= jwtDecode(payload.token)
              return {
                id:decodeToken.id,
                email:payload.user.email,
                user:payload.user,
                token:payload.token,
                

            }
          }else{
            throw new Error("error..")
          }
        }
    })
],
callbacks:{
    jwt:({token,user})=>{
if(user){
    token.user=user.user
token.token=user.token
token.id=user.id
}
return token
    },
    session:({session,token})=>{
if(token){
    session.user=token.user
    session._id=token.id
}
return session
    }
}
}