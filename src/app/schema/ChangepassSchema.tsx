  import * as zod from "zod"
export  const ChangepassSchema= zod.object({


   currentPassword:zod.string().nonempty('current password required').regex(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/),
    password: zod.string().nonempty("password is required").regex(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/),
    rePassword: zod.string().nonempty("repassword is required"),
   
})
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "must repassword match password",
  });

