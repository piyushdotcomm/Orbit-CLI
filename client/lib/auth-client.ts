import { deviceAuthorizationClient } from "better-auth/plugins"
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005",
    
      plugins: [ 
    deviceAuthorizationClient(), 
  ], 
})