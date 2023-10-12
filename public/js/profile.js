document.addEventListener('DOMContentLoaded', function() {
  const newFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#post-name').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    if (name && content) {
      const response = await fetch(`/api/post`, {
        method: 'POST',
        body: JSON.stringify({ name, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create project');
      }
    }
  };

  const newCommentHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#comment-text').value.trim();
    const post_id = event.target.getAttribute('data-id')

    if (content && post_id) {
      const response = await fetch(`/api/post/${post_id}`, {
        method: 'POST',
        body: JSON.stringify({ content, post_id }),
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

  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');

      const response = await fetch(`/api/post/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete post');
      }
    }
  };

  document
    .querySelector('.new-post-form')
    .addEventListener('submit', newFormHandler);
  document
    .querySelector('.post-list')
    .addEventListener('click', delButtonHandler);
  document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newCommentHandler);
})