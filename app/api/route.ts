import { retrieveAPOD  } from "../lib/APODData";
import { retrievAsteroid } from "../lib/allAsteroid";

import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        let data;
        const url = new URL(req.url);
        const {searchParams, pathname} = url;
        console.log("Full URL:", req.url);
        console.log("Pathname:", pathname);
        console.log("Includes /close?", pathname.includes('/close'));
        
        if (pathname.includes('/close')) {
            data = await retrievAsteroid();
            console.log("Sono qui dentro");
            console.log(data);
            return;
        }
        
        const date = searchParams.get("date");
        
        if (date) {
            data = await retrieveAPOD(date);
            return NextResponse.json(data);
        }
        
        // If neither date nor id is provided, return error
        return NextResponse.json({ error: "Either date or id parameter is required" }, { status: 400 });
       
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}