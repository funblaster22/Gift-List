/**
 * @param {string} url
 * @param {Object} data
 */
export const post = async (url, data) => (await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: JSON.stringify(data) // body data type must match "Content-Type" header
})).json();

// TODO: display notice on request error
export const FAMILY_MEMBERS = post('api/getFamily', {code: localStorage.currentUser});
