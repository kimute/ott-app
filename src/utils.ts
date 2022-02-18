export function imagePath(id: string, format?:string){
    return `https://image.tmdb.org/t/p/${format? format:"original"}/${id}`;
}

export function getVideoKey(id: number){
    return localStorage.getItem(String(id))
}