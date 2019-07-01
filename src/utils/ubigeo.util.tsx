import { UbigeoDictionary } from '../types/index';

const departments={};
const provinces={};
const districts={};

export interface SingleLocationUbigeo {
    code:string;
    name:string;
}

export const setUbigeo = (array:Array<SingleLocationUbigeo>): Array<UbigeoDictionary> => {
    let ubigeoVars:UbigeoDictionary[] = [departments,provinces,districts];

    array.forEach((elementObj:SingleLocationUbigeo,index:number) => {
        if(elementObj){
            ubigeoVars[index][elementObj.code]={
                ...elementObj,
                parentCode : array[index-1] ? array[index-1].code : '',
                parentDescription : array[index-1] ? array[index-1].name : ''
            }
        }
    });
    return ubigeoVars;
}

export const objectsArraysFromTextLinesArray = (textLinesArray:Array<string>):Array<SingleLocationUbigeo[]> => {
    return textLinesArray
        .map((originalLine:string)=>{
            let itemsArray:Array<string> = originalLine.replace(/["']/g,"").split("/"); // Remove doubles quotes and split by '/'

            // Map itemsArray. Ex: ['01 Lima ',' ', ' ']
            // item examples: '01 Lima '
            // return objects array like: [{code: '01', name: 'Lima'},null,null]
            return itemsArray
                    .map((item:string)=>{
                        let clearString = item.trim();   // Remove unnecessary white spaces

                        let spaceIndex= clearString.indexOf(' '); // Find index of space between strings
                        
                        // If spaceIndex=1 then item contains info
                        // Then return object like {code: '01', name: 'Lima'}
                        // else return null
                        return spaceIndex!==-1?
                                {
                                    code:clearString.substring(0,spaceIndex),
                                    name:clearString.substring(spaceIndex+1,item.length)
                                } as SingleLocationUbigeo:
                                null;
                    })
            }
        );
}