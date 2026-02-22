const BASE_URL = "https://v2.api.noroff.dev";

export async function fetchRainyDaysProducts() {
  const url = `${BASE_URL}/rainy-days`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();

  return json.data ?? json;
}

export async function fetchRainyDaysProductById(id) {
  const url = `${BASE_URL}/rainy-days/${id}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();
  return json.data ?? json;
}
