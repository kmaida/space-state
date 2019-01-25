import { Injectable } from '@angular/core';
import { INEO, INEOAPI, initialNEO } from './data.model';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  // Utility to get date to query the NASA API
  get getNEODate(): string {
    // const today = new Date();
    // return this.datePipe.transform(today, 'yyyy-MM-dd');
    return '2019-05-01';
  }

  // Map the near Earth object data into a simpler format
  // (This just does some data massaging)
  private mapNEObj(fullNeo: { [key: string]: any } ): INEO {
    const neo: INEO = initialNEO;
    Object.keys(fullNeo).forEach(key => {
      if (key === 'id') {
        neo.id = fullNeo[key];
      }
      if (key === 'name') {
        neo.name = fullNeo[key];
      }
      if (key === 'estimated_diameter') {
        const estD = (fullNeo[key].miles.estimated_diameter_min + fullNeo[key].miles.estimated_diameter_max) / 2;
        neo.estimated_diameter = estD;
      }
      if (key === 'is_potentially_hazardous_asteroid') {
        neo.is_potentially_hazardous_asteroid = fullNeo[key];
      }
      if (key === 'close_approach_data') {
        neo.relative_velocity = Math.round(1 * fullNeo[key][0].relative_velocity.miles_per_hour);
        neo.miss_distance = fullNeo[key][0].miss_distance.miles * 1;
      }
    });
    return {...neo};
  }

  // Take API data and produce an array of simplified NEOs
  mapNEOResponse(neoData: INEOAPI): INEO[] {
    const neoList = neoData.near_earth_objects[this.getNEODate];
    return neoList.map(neo => this.mapNEObj(neo));
  }

  trackByID(index, item) {
    return item.id;
  }

}
