var baseURL = "http://127.0.0.1:5000";

export async function getData() {
  var response = await fetch(`${baseURL}/data`);
  var result = await response.json();
  return result;
}
