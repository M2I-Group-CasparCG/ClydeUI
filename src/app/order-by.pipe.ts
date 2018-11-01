import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(map: Map<Number, Object>, objectProperty?: any): Iterable<Object> {
    // console.log(JSON.stringify(map));
    console.log(objectProperty);
    const orderedMap = new Map();
    const order = new Array();
    const propertyToId = new Map();
    for ( let object in map.values()) {
      console.log('coucou');
    }
    order.sort();
    order.forEach(objectProperty_ => {
      const objectId = propertyToId[objectProperty_];
      orderedMap[objectId] = map[objectId];
    });
    return orderedMap.values();
  }

}
