/**
 * @param {string} url
 * @param {Object} data
 */
export const post = async (url, data = {}) => (await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: JSON.stringify({code: localStorage.familyName, ...data}) // body data type must match "Content-Type" header
})).json();

// TODO: display notice on request error
/**
 * @type {Promise<Object<string, {desc: string, completed: boolean, addedBy: string}[]>>}
 */
export const FAMILY_MEMBERS = post('api/getFamily');
