import supabase, { supabaseUrl } from "./supabase"

export async function signUp({fullName, email, password}){
    const {data, error} = await supabase.auth.signUp({
        email, 
        password, 
        options: {
            data : {
                fullName,
                avatar: "",
            }
        },
    });

    if(error) throw new Error(error.message);

    return data;
}

export async function login({email, password}){   
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if(error) throw new Error(error.message);
    
    return data;
}

export async function getCurrentUser(){
    const {data : session} = await supabase.auth.getSession();    
    if(!session.session){
        console.log("session tidak ditemukan");
        return null;
    } 

    const{data, error} = await supabase.auth.getUser();
    console.log(data);

    if(error) throw new Error(error.message);
    return data?.user;
}

export async function logout(){
    const {error} = await supabase.auth.signOut();
    if(error) throw new Error(error.message);
}

export async function updateCurrentUser({password, fullName, avatar}){
    let updateData;
    if(password) updateData = {password};
    if(fullName) updateData = {data:{fullName}};

    const {data, error} = await supabase.auth.updateUser(updateData)
    if(error) throw new Error(error.message);   
    if(!avatar) return data;

    const fileName = `avatar-${data.user.id}-${Math.random()}`; 
    const {error : storageError} = await supabase.storage.from('avatars').upload(fileName, avatar);
    if(storageError) throw new Error(error.message);   

    const{data:updateUser, error: error2} = supabase.auth.updateUser({data: {avatars: `${supabaseUrl}/storage/v1/object/public/avatars//${fileName}`,}})
    if(error2) throw new Error(error.message); 
    return updateUser;
}