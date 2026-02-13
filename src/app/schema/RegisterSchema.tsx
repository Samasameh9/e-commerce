  import * as zod from "zod"
export  const Schema= zod.object({


    name: zod.string().nonempty("name is required").max(8, "max name char is 5").min(3, "min name char is 3"),
    email: zod.string().nonempty("email is required").regex(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/, "invalid email"),
    password: zod.string().nonempty("password is required").regex(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/),
    rePassword: zod.string().nonempty("repassword is required"),
    phone:zod.string().nonempty("phone is required").regex(/^01[0125][0-9]{8}$/,'invalid phone number'),
})
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "must repassword match password",
  });

