document.addEventListener('DOMContentLoaded', function() {
    const newCommentHandler = async (event) => {
        event.preventDefault();

        const content = document.querySelector('#comment-text').value.trim();
        const post_id = event.target.getAttribute('data-id')

        if (content && post_id) {
        const response = await fetch(`/api/post/${post_id}`, {
            method: 'POST',
            body: JSON.stringify({ content }),
            headers: {
            'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace(`/post/${post_id}`);
        } else {
            alert('Failed to create comment');
        }
        }
    };

    document
        .querySelector('.new-comment-form')
        .addEventListener('submit', newCommentHandler);
})