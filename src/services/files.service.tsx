export const readFile = (fileName:string) => {
    var headers = new Headers();
    headers.append("Content-Type", "text/plain");

    return fetch(fileName,{headers})
    .then(response=>response.text())
}