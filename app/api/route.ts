import { retrieveData } from "../lib/nasa";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const {searchParams} = new URL(req.url);
        const date = searchParams.get("date");
        if(!date){
            return;
        }
        const data = await retrieveData(date);
        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
