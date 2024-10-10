function ApiRequest({ url, formData, requestType }) {
    return fetch(url,  {
        method: requestType,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Request Successful:', data);
    })
    .catch(error => {
        console.error('Request Failed:', error);
        throw error; // Rethrow the error to be caught by the caller
    });
}

export default ApiRequest;
