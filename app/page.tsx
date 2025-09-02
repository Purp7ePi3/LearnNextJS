"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState<string>(today);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!date) return;

    setLoading(true);
    setError(null);

    fetch(`/api?date=${date}`)
      .then(res => res.json())
      .then((json) => {
        setData(json);
      })
      .catch(err => {
        console.error(err);
        setError("Errore nel caricamento dei dati.");
      })
      .finally(() => setLoading(false));
  }, [date]);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", padding: "20px" }}>
      
      {/* Calendario sempre visibile in alto */}
      <div style={{ alignSelf: "center", marginBottom: "20px" }}>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          style={{ padding: "10px", fontSize: "16px" }}
          max={today} // non permette date future
        />
      </div>

      {/* Contenuto centrato nello spazio rimanente */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "20px" }}>
        {loading && <h1>Loading...</h1>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {data && !loading && !error && (
          <>
            <h1>{data.title}</h1>

            {data.media_type === "image" ? (
              <img 
                src={data.url} 
                alt={data.title} 
                style={{ maxWidth: "80%", borderRadius: "10px" }} 
              />
            ) : data.media_type === "video" ? (
              <iframe 
                src={data.url} 
                title={data.title} 
                style={{ width: "80%", height: "450px", border: "none" }} 
                allowFullScreen
              />
            ) : (
              <p>Media non disponibile</p>
            )}

            {data.explanation && <p style={{ maxWidth: "600px", textAlign: "justify" }}>{data.explanation}</p>}
          </>
        )}
      </div>
    </div>
  );
}
