import supabase, {supabaseUrl} from "./supabase";

export async function getCabins(){
    const { data, error } = await supabase
    .from('Cabins')
    .select('*')

    if(error) {
        console.error(error)
        throw new Error('cabins cant be loaded')
    }
    return data;
}

// export async function deleteCabin(id){
//     const { data, error } = await supabase
//     .from('Cabins')
//     .delete()
//     .eq('id', id)

//     if(error) {
//         console.error(error)
//         throw new Error('cabins cant be deleted')
//     }
//     return data;
// }

export async function deleteCabin(id) {
    // 1. Ambil data cabin berdasarkan ID untuk mendapatkan path gambar
    const { data: cabin, error: fetchError } = await supabase
        .from("Cabins")
        .select("image")
        .eq("id", id)
        .single();

    if (fetchError) {
        console.error(fetchError);
        throw new Error("Failed to fetch cabin data");
    }

    // 2. Jika ada gambar, hapus dari Supabase Storage
    if (cabin?.image) {
        const imagePath = cabin.image.replace(`${supabaseUrl}/storage/v1/object/public/cabins-image/`, "");

        const { error: storageError } = await supabase.storage
            .from("cabins-image")
            .remove([imagePath]);

        if (storageError) {
            console.error(storageError);
            throw new Error("Failed to delete image from storage");
        }
    }

    // 3. Hapus data cabin dari database
    const { error: deleteError } = await supabase
        .from("Cabins")
        .delete()
        .eq("id", id);

    if (deleteError) {
        console.error(deleteError);
        throw new Error("Cabin can't be deleted");
    }

    return { success: true };
}

export async function editCabin(newCabin, id){
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabins-image/${imageName}`;

    //1. Create/Edit the cabins
    let query = supabase.from('Cabins');

    //A. Create
    if(!id)
        query = query.insert([{...newCabin, image: imagePath}])

    //B. Edit
    if(id)
        query = query.update({ ...newCabin, image: imagePath }).eq('id', id)
    
    const { data, error } = await query.select().single()
    if(error){
        console.error(error)
        throw new Error('Cabin cant be created')
    }   

    if (newCabin.image && imageName) {
        //2. Upload the image
        const { error: storageError } = await supabase.storage
        .from('cabins-image')
        .upload(imageName, newCabin.image, {contentType: newCabin.image.type || "application/octet-stream",})

        //3. If upload error
        if(storageError) {
            await supabase.from("Cabins").delete().eq("id", data.id);
            console.error(storageError)
            throw new Error('Image cant be upload')
        }  
    } 

    
    return data;
}