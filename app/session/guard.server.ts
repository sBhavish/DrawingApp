import { redirect } from "react-router"

export const requireUser = (request: Request)=> {
    if(false){
        redirect('/login')
    }
}