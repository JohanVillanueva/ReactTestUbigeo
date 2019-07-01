import { map, last } from 'rxjs/operators';
import { setUbigeo, objectsArraysFromTextLinesArray, SingleLocationUbigeo } from '../utils';
import { from, Observable } from 'rxjs';
import { UbigeoDictionary } from '../types/index';

export const convertDataInStructures = (originalDataPlot:string): Observable<Array<UbigeoDictionary>> => {
    let splitedData:string[] = originalDataPlot.split('\n');

    return from(objectsArraysFromTextLinesArray(splitedData))
    .pipe(
        map((objectsArray: Array<SingleLocationUbigeo>) => setUbigeo(objectsArray)), // Map objectsArray. Ex: [{code: '01', name: 'Lima'},null, null] and push data in structures
        last()
    );
}