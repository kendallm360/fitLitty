const getData = (apiName) => {
  return fetch(`http://localhost:3001/api/v1/${apiName}`).then(
    (response) => response.json()
  );
};

export { getData };
