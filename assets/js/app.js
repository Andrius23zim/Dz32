
      const searchBtn = document.getElementById('search-btn');
      const postIdInput = document.getElementById('post-id');
      const resultDiv = document.getElementById('result');

      searchBtn.addEventListener('click', () => {
        const postId = postIdInput.value;
        if (!postId) {
          return;
        }

        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })

          .then(post => {
            const postDiv = document.createElement('div');
            postDiv.innerHTML = `
              <h2>${post.title}</h2>
              <p>${post.body}</p>
              <button id="comments-btn">Получить комментарии</button>
              <div id="comments"></div>
            `;
            resultDiv.innerHTML = '';
            resultDiv.appendChild(postDiv);

            const commentsBtn = document.getElementById('comments-btn');
            const commentsDiv = document.getElementById('comments');

            commentsBtn.addEventListener('click', () => {
              fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
                .then(response => {
                  if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                  }
                  return response.json();
                })
                
                .then(comments => {
                  const commentsList = document.createElement('ul');
                  comments.forEach(comment => {
                    const commentItem = document.createElement('li');
                    commentItem.innerText = comment.body;
                    commentsList.appendChild(commentItem);
                  });

                  commentsDiv.innerHTML = '';
                  commentsDiv.appendChild(commentsList);
                })

                .catch(error => {
                  commentsDiv.innerHTML = `<p>Ошибка: ${error.message}</p>`;
                });
            });
          })

          .catch(error => {
            resultDiv.innerHTML = `<p>Ошибка: ${error.message}</p>`;
          });
      });