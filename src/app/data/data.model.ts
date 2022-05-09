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

const initialNEO: INEO = {
  id: '',
  name: '',
  estimated_diameter: 0,
  is_potentially_hazardous_asteroid: false,
  relative_velocity: 0,
  miss_distance: 0,
  nickname: ''
};

interface INEONICKNAME {
  id: string;
  nickname: string;
}

export { INEOAPI, INEO, initialNEO, INEONICKNAME };
