export type UbigeoInfo = {
    code : string;
    name : string;
    parentCode : string;
    parentDescription: string;
} 
export type UbigeoDictionary = {
    [code:string] : UbigeoInfo
}