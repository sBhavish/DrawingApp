import PocketBase from 'pocketbase';
import { Users } from './pb.collections.server';

const pb = new PocketBase(process.env.POCKETBASE_BASE_URL);

export default pb;

export async function createUser(
    emailorUsername: string,
    password: string,
){
    const authData = await pb.collection(Users).authWithPassword(emailorUsername, password);
}

export async function checkIfUserExists(emailOrUsername:string) {
    const user = await pb.collection("users").getFirstListItem(`username="${emailOrUsername}"`);
    if(!user){
        return false;
    }else{
        return true;
    }
}

