function PostRequest({ url, formData }) {
    
    fetch(url,  {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Succesfully added:', data);
    })
    .catch(error => {
        console.error('Error adding movies:', error);
    })
}

export default PostRequest
