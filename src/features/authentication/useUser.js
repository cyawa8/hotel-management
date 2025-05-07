import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiLogin";

export function useUser(){
    const {isLoading, data: user} = useQuery({
        queryKey: ["user"],
        queryFn : getCurrentUser,
    });
    console.log(user);
    
    return {isLoading, user, isAuthenticated: user?.role === "authenticated"};

 // Ambil user dari data (cek apakah data memiliki struktur yang benar)
//  const users = user?.user || null;
//  const isAuthenticated = user !== null; // Bisa dicek dengan lebih pasti

//  return { isLoading, users, isAuthenticated };
}