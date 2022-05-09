export interface IAPOD {
  copyright?: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
  stars?: number;
}

export interface IUPDATE {
  stars: number;
}
