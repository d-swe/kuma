function DeleteRequest( url: string ) {
    return fetch(url, {
        method: "DELETE",
    })
    .then(response => response.json())
    .then(data => {
        console.log('DELETE Request Successful:', data);
    })
    .catch(error => {
        console.error('Request Failed:', error);
        throw error;
    });
}

export default DeleteRequest;