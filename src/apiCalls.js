const getData = (apiName) => {
  return fetch(`http://localhost:3001/api/v1/${apiName}`).then(
    (response) => response.json()
  );
};

const postData = (apiName, formData) => {
  let url = `http://localhost:3001/api/v1/${apiName}`
  fetch(url, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
}

export { getData, postData };
