document.addEventListener('DOMContentLoaded', function() {
    const newUpdateHandler = async (event) => {
        event.preventDefault();

        const name = document.querySelector('#update-name').value.trim();
        const content = document.querySelector('#update-content').value.trim();
        const id = event.target.getAttribute('data-id');
        console.log(name)
        console.log(content)
        console.log(id)

        if (name || content) {
            const requestData = {};

            if (name) {
                requestData.name = name
            }

            if (content) {
                requestData.content = content
            }

            const response = await fetch(`/api/post/${id}`, {
                method: 'PUT',
                body: JSON.stringify(requestData),
                headers: {
                'Content-Type': 'application/json',
                },
            });

        if (response.ok) {
            document.location.replace(`/post/${id}`);
        } else {
            alert('Failed to update post');
        }
        }
    };

    document
        .querySelector('.update-post-form')
        .addEventListener('submit', newUpdateHandler);
})