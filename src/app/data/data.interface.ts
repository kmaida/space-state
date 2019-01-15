interface INEOAPI {
  links?: { [key: string]: any };
  element_count?: number;
  near_earth_objects?: { [key: string]: any };
}

interface INEO {
  id: string;
  name: string;
  estimated_diameter: number;                   // average of min / max; miles
  is_potentially_hazardous_asteroid: boolean;
  relative_velocity: number;                    // mph
  miss_distance: number;                        // miles
  nickname?: string;
}

interface INEONICKNAME {
  id: string;
  nickname: string;
}

export { INEOAPI, INEO, INEONICKNAME };
