export interface NasaAPODData {
  date: string;
  explanation: string;
  media_type: 'image' | 'video';
  service_version: string;
  title: string;
  url: string;
  hdurl?: string;
  thumbnail_url?: string;
  copyright?: string;
}

export interface NasaNeoWs {
  id: string;
  name: string;
  [key: string]: unknown;
}


export interface NasaImageItem {
  data: {
    nasa_id: string;
    title: string;
    [key: string]: unknown;
  };
}

export interface NasaImageSearchResult {
  items: NasaImageItem[];
}