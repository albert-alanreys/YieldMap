const URL = "http://127.0.0.1:5000";

export async function getData() {
  try {
    const response = await fetch(`${URL}/data`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
