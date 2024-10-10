function DeleteRequest({ url }) {
    fetch(url, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Check if the response has a body
    })
    .then(data => {
        console.log('Successfully Deleted:', data);
    })
    .catch(error => {
        console.error('Error deleting:', error);
    });
}

export default DeleteRequest;