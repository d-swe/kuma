function PostRequest<T>( url: string, data: T ) {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('POST Request Successful:', data);
    })
    .catch(error => {
        console.error('Request Failed:', error);
        throw error;
    });
}

export default PostRequest;