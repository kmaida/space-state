import { Injectable } from '@angular/core';
import { INEO, INEOAPI } from './data.interface';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private datePipe: DatePipe) { }

  freezeArray(array: any[]) {
    // Iterate through array and freeze + seal all objects.
    // Note: this is not a deep freeze, as our state data
    // currently does not require it.
    array.forEach(obj => {
      Object.freeze(obj);
      Object.seal(obj);
    });
    return Object.freeze(array);
  }

  // Utility to get today's date to query the NASA API
  get getNEODate(): string {
    // const today = new Date();
    // return this.datePipe.transform(today, 'yyyy-MM-dd');
    return '2019-05-01';
  }

  // Map the near Earth object data into a simpler format
  // (This function just does some data massaging)
  private mapNEObj(neo: { [key: string]: any } ): INEO {
    const neoSimple: INEO = {
      id: null,
      name: null,
      estimated_diameter: null,
      is_potentially_hazardous_asteroid: null,
      relative_velocity: null,
      miss_distance: null,
      nickname: ''
    };
    Object.keys(neo).forEach(key => {
      if (key === 'id') {
        neoSimple.id = neo[key];
      }
      if (key === 'name') {
        neoSimple.name = neo[key];
      }
      if (key === 'estimated_diameter') {
        const estD = (neo[key].miles.estimated_diameter_min + neo[key].miles.estimated_diameter_max) / 2;
        neoSimple.estimated_diameter = estD.toString();
      }
      if (key === 'is_potentially_hazardous_asteroid') {
        neoSimple.is_potentially_hazardous_asteroid = neo[key];
      }
      if (key === 'close_approach_data') {
        neoSimple.relative_velocity = Math.round(1 * neo[key][0].relative_velocity.miles_per_hour).toString();
        neoSimple.miss_distance = neo[key][0].miss_distance.miles;
      }
    });
    return Object.assign({}, neoSimple);
  }

  // Take API data and produce an array of simplified NEOs
  mapNEOResponse(res: INEOAPI): INEO[] {
    const neoList = res.near_earth_objects[this.getNEODate];
    return neoList.map(neo => this.mapNEObj(neo));
  }

}
