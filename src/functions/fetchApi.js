export async function fetchApi(url) {
  let response = await fetch(url);
  response = await response.json();
  return response;
}
