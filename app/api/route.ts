import { retrieveData } from "../lib/nasa";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const {searchParams} = new URL(req.url);
        const date = searchParams.get("date");
        if(!date){
            return NextResponse.json({ error: "Date parameter is required" }, { status: 400 });
        }
        const data = await retrieveData(date);
        return NextResponse.json(data);
    } catch (err: any) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
