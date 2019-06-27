export const readFile = fileName => {
    var headers = new Headers();
    headers.append("Content-Type", "text/plain");

    return fetch(fileName,{headers})
    .then(response=>response.text())
}