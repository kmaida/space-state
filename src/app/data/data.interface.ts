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
  id: string;
  name: string;
  estimated_diameter: string;                   // average of min / max; miles
  is_potentially_hazardous_asteroid: boolean;
  relative_velocity: string;                    // mph
  miss_distance: string;                        // miles
  fav: boolean;
}

export { IAPOD, INEOAPI, INEO };
