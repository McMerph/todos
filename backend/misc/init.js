require('isomorphic-fetch');

const sendRequest = (method, entity) => {
  return fetch('http://localhost:48702/todos-webapi', {
    headers: {
      "content-type": "application/json"
    },
    method,
    body: JSON.stringify(entity)
  })
};

const sendChainedCreateRequests = (quantity) => {
  const next = (i = 0) =>
    sendRequest("post", { text: `Todo ${i}`, completed: (i++) % 2 === 0 })
      .then(() => (i < quantity) && next(i));

  next();
};

sendRequest('delete')
  .then(() => sendRequest('post', { text: 'Work', completed: true }))
  .then(() => sendRequest('post', { text: 'Learn', completed: false }))
  .then(() => sendRequest('post', { text: 'Drink beer', completed: false }))
  .then(() => sendChainedCreateRequests(21));
