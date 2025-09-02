"use client"

import React from "react";
import { useEffect, useState } from "react";
import { NasaImageItem } from "../lib/types";

export default function Page() {
    const today =  new Date().toISOString().split("T")[0];
    const [date, setDate] = useState<string>(today);
    const [data, setData] = useState<NasaImageItem | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if(!date) return;

        setLoading(true);
        setError(null);

        fetch(`/api?date=${date}`)
            .then(res => res.json())
            .then((json: NasaImageItem) => {
                setData(json);
        })
        .catch((err: unknown) => {
            console.error(err);
            const errorMessage = err instanceof Error ? err.message : 'Errore nel caricamento dei dati.';
            setError(errorMessage);
        })
        .finally(() => setLoading(false));
    }, [date]);

    return (
        <>
        <h1>{data.title}</h1>
        </>

    );
}