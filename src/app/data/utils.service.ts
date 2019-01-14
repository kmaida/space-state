import { Injectable } from '@angular/core';
import { INEO, INEOAPI } from './data.interface';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private datePipe: DatePipe) { }

  freezeArray(array: any[]) {
    // Iterate through array and freeze all objects.
    // Note: this is not a deep freeze, as our state data
    // currently does not require it.
    array.forEach(obj => {
      Object.freeze(obj);
      Object.seal(obj);
    });
    return Object.freeze(array);
  }

  get getNEODate(): string {
    const today = new Date();
    return this.datePipe.transform(today, 'yyyy-MM-dd');
  }

  private mapNEObj(neo: { [key: string]: any } ): INEO {
    const neoQuick: INEO = {
      id: null,
      name: null,
      estimated_diameter: null,
      is_potentially_hazardous_asteroid: null,
      relative_velocity: null,
      miss_distance: null,
      fav: false
    };
    Object.keys(neo).forEach(key => {
      if (key === 'id') {
        neoQuick.id = neo[key];
      }
      if (key === 'name') {
        neoQuick.name = neo[key];
      }
      if (key === 'estimated_diameter') {
        const estD = (neo[key].miles.estimated_diameter_min + neo[key].miles.estimated_diameter_max) / 2;
        neoQuick.estimated_diameter = estD.toString();
      }
      if (key === 'is_potentially_hazardous_asteroid') {
        neoQuick.is_potentially_hazardous_asteroid = neo[key];
      }
      if (key === 'close_approach_data') {
        neoQuick.relative_velocity = neo[key][0].relative_velocity.miles_per_hour;
        neoQuick.miss_distance = neo[key][0].miss_distance.miles;
      }
    });
    return Object.assign({}, neoQuick);
  }

  mapNEOResponse(res: INEOAPI): INEO[] {
    const neoList = res.near_earth_objects[this.getNEODate];
    return neoList.map(neo => this.mapNEObj(neo));
  }

}
