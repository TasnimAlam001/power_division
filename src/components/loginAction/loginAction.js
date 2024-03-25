"use server";

import { signIn } from "../../app/auth";
import { AuthError } from "next-auth";



export async function loginAction(formData) {
    // console.log(formData)
  try{
    await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirectTo: "/dashboard",
    });

    
  }catch(error){
    if(error instanceof AuthError){
      switch(error.type)
      {
        case "CredentialSignin":
            return {error: "Invalid Credentials"}
        default:
          return  {error: "Unknown Error"}
      }
    }
    throw error;
  }
}
