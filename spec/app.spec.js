/* eslint-disable spaced-comment */
/* eslint-disable no-undef */
/* eslint-disable global-require */
const Request = require('request');

describe('GET /api/get/allarticles', () => {
  const data = {};
  beforeAll((done) => {
    Request.get('http://localhost:3000/api/get/allarticles', (error, response, body) => {
      data.status = response.statusCode;
      data.body = JSON.parse(body);
      done();
    });
  });
  it('Status 201', () => {
    expect(data.status).toBe(201);
  });
  it('Body', () => {
    expect(data.body.message).toBe('articles served');
  });
});
describe('POST /api/post/article', () => {
  const data = {};
  beforeAll((done) => {
    Request.post('http://localhost:3000/api/post/article', (error, response, body) => {
      data.status = response.statusCode;
      data.body = JSON.parse(body);
      done();
    });
  });
  it('Status 201', () => {
    expect(data.status).toBe(201);
  });
  it('Body', () => {
    expect(data.body.message).toBe('articles posted');
  });
});
describe('PUT /api/put/articles', () => {
  const data = {};
  beforeAll((done) => {
    Request.put('http://localhost:3000/api/put/articles', (error, response, body) => {
      data.status = response.statusCode;
      data.body = JSON.parse(body);
      done();
    });
  });
  it('Status 201', () => {
    expect(data.status).toBe(201);
  });
  it('Body', () => {
    expect(data.body.message).toBe('articles updated');
  });
});
describe('DELETE /api/delete/articlecomment', () => {
  const data = {};
  beforeAll((done) => {
    Request.delete('http://localhost:3000/api/delete/articlecomment', (error, response, body) => {
      data.status = response.statusCode;
      data.body = JSON.parse(body);
      done();
    });
  });
  it('Status 201', () => {
    expect(data.status).toBe(201);
  });
  it('Body', () => {
    expect(data.body.message).toBe('comment deleted');
  });
});
describe('DELETE /api/delete/article', () => {
  const data = {};
  beforeAll((done) => {
    Request.delete('http://localhost:3000/api/delete/article', (error, response, body) => {
      data.status = response.statusCode;
      data.body = JSON.parse(body);
      done();
    });
  });
  it('Status 201', () => {
    expect(data.status).toBe(201);
  });
  it('Body', () => {
    expect(data.body.message).toBe('article deleted');
  });
});
describe('POST /api/post/comment', () => {
  const data = {};
  beforeAll((done) => {
    Request.post('http://localhost:3000/api/post/comment', (error, response, body) => {
      data.status = response.statusCode;
      data.body = JSON.parse(body);
      done();
    });
  });
  it('Status 201', () => {
    expect(data.status).toBe(201);
  });
  it('Body', () => {
    expect(data.body.message).toBe('comment posted');
  });
});
describe('DELETE /api/delete/onlycomment', () => {
  const data = {};
  beforeAll((done) => {
    Request.delete('http://localhost:3000/api/delete/onlycomment', (error, response, body) => {
      data.status = response.statusCode;
      data.body = JSON.parse(body);
      done();
    });
  });
  it('Status 201', () => {
    expect(data.status).toBe(201);
  });
  it('Body', () => {
    expect(data.body.message).toBe('only comment deleted');
  });
});
describe('GET /api/get/allgif', () => {
  const data = {};
  beforeAll((done) => {
    Request.get('http://localhost:3000/api/get/allgif', (error, response, body) => {
      data.status = response.statusCode;
      data.body = JSON.parse(body);
      done();
    });
  });
  it('Status 201', () => {
    expect(data.status).toBe(201);
  });
  it('Body', () => {
    expect(data.body.message).toBe('allgifs served');
  });
});
describe('POST /api/post/gifs', () => {
  const data = {};
  beforeAll((done) => {
    Request.post('http://localhost:3000/api/post/gifs', (error, response, body) => {
      data.status = response.statusCode;
      data.body = JSON.parse(body);
      done();
    });
  });
  it('Status 201', () => {
    expect(data.status).toBe(201);
  });
  it('Body', () => {
    expect(data.body.message).toBe('gif posted');
  });
});
describe('POST /api/post/users', () => {
  const data = {};
  beforeAll((done) => {
    Request.post('http://localhost:3000/api/post/users', (error, response, body) => {
      data.status = response.statusCode;
      data.body = JSON.parse(body);
      done();
    });
  });
  it('Status 201', () => {
    expect(data.status).toBe(201);
  });
  it('Body', () => {
    expect(data.body.message).toBe('User added successfully!');
  });
});
