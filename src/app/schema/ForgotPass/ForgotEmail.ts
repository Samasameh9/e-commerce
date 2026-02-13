  import * as zod from "zod"
export  const ForgotEmail= zod.object({
    email: zod.string().nonempty("email is required").regex(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/, "invalid email"),
  
})
 

