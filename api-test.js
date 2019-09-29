const request = require('request');

const BASE_URL = 'http://localhost:3000';

const PostTransact = ({ data }) => {
  request(
    `${BASE_URL}/api/mine`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data })
    },
    (error, response, body) => {
      console.log('PostTransact', JSON.parse(body));
      return JSON.parse(body);
    }
  );
};

const getMine = () => {
  setTimeout(() => {
    request(`${BASE_URL}/api/blocks`, (error, response, body) => {
      console.log('getMine', JSON.parse(body));
      return JSON.parse(body);
    });
  }, 500);
};

PostTransact({}).then(postTransactResponse => {
  console.log(
    'postTransactResponse (create Transaction)',
    postTransactResponse
  );

  return getMine();
});
