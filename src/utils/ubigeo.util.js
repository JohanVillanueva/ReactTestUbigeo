
const departaments={};
const provinces={};
const districts={};

export const setUbigeo = (array) => {
    let ubigeoVars = [departaments,provinces,districts];

    array.forEach((elementObj,index) => {
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

export const objectsArraysFromTextLinesArray = textLinesArray => {
    return textLinesArray
        .map(originalLine=>{
            let itemsArray = originalLine.replace(/["']/g,"").split("/"); // Remove doubles quotes and split by '/'

            // Map itemsArray. Ex: ['01 Lima ',' ', ' ']
            // item examples: '01 Lima '
            // return objects array like: [{code: '01', name: 'Lima'},null,null]
            return itemsArray
                    .map(item=>{
                        let clearString = item.trim();   // Remove unnecessary white spaces

                        let spaceIndex= clearString.indexOf(' '); // Find index of space between strings
                        
                        // If spaceIndex=1 then item contains info
                        // Then return object like {code: '01', name: 'Lima'}
                        // else return null
                        return spaceIndex!==-1?
                                {
                                    code:clearString.substring(0,spaceIndex),
                                    name:clearString.substring(spaceIndex+1,item.length)
                                }:
                                null;
                    })
            }
        );
}