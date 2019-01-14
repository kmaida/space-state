interface IAPOD {
  copyright?: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

interface INEOAPI {
  links?: { [key: string]: any };
  element_count?: number;
  near_earth_objects?: { [key: string]: any };
}

interface INEO {
  name: string;
  estimated_diameter: string;                   // average of min / max, in miles
  is_potentially_hazardous_asteroid: boolean;
  relative_velocity: string;                    // mph
  miss_distance: string;                        // in miles
  fav: boolean;
}

export { IAPOD, INEOAPI, INEO };
