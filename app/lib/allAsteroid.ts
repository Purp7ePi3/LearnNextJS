import { NasaNeoWs } from "./types";

export async function retrieveImageDat(): Promise<NasaNeoWs>{
    const apiKey = process.env.NASA_API_KEY;
    if(!apiKey) {
        throw new Error("NASA_API_KEY non impostata");
    }

    const res = await fetch(`https://images-api.nasa.gov/search?q=asteroid`);
    
    if(!res.ok) {
        throw new Error(`Errore nella chiamata NASA: ${res.status}`);
    }

    const data: NasaNeoWs = await res.json();
    return data;
}