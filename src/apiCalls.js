const getData = (apiName) => {
  return fetch(`https://fitlit-api.herokuapp.com/api/v1/${apiName}`).then(
    (response) => response.json()
  );
};

export { getData };
