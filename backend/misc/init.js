require('isomorphic-fetch');

const sendRequest = (method, entity) =>
  fetch('http://localhost:48702/todos-webapi', {
    headers: {
      "content-type": "application/json"
    },
    method,
    body: JSON.stringify(entity)
  });

(async () => {
  try {
    await sendRequest('delete');
    await sendRequest('post', { text: 'Work', completed: true });
    await sendRequest('post', { text: 'Learn', completed: false });
    await sendRequest('post', { text: 'Drink beer', completed: false });
    for (let i = 0; i < 21; i++) {
      await sendRequest("post", { text: `Todo ${i}`, completed: i % 2 === 0 });
    }
  } catch (error) {
    console.error("There has been an error", error);
  }
})();
