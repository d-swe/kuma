function PutRequest<T>( url: string, data: T ) {
    return fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('PUT Request Successful:', data);
    })
    .catch(error => {
        console.error('Request Failed:', error);
        throw error;
    });
}

export default PutRequest;