import NextAuth, { User } from "next-auth"
import { UserResponse } from "./authinterface"
import { JWT } from "next-auth/jwt"
declare module "next-auth" {
 interface User { 
   id:string
  user:UserResponse,
   token:string 
  }
 interface Session { 
  user:UserResponse 
  _id:string
} }


declare module "next-auth/jwt" {
   interface JWT extends User{ 

   }
}