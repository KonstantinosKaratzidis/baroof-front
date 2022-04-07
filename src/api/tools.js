// TODO: move to config file
const API_URL = "http://localhost:4000/"

export function makeURL(endpoint, queryParams = {}){
	const urlStr = `/api${endpoint.startsWith("/") ? "" : "/"}${endpoint}`
	const url = new URL(urlStr, API_URL);
	for(const key of Object.keys(queryParams))
		url.searchParams.set(key, queryParams[key])
	return url
}

export async function fetchPost(endpoint, data){
	const url = makeURL(endpoint);
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify(data)
	})
	if(!response.ok){
		return {
			success: false,
			msg: "Unknown error"
		}
	}
	const respData = await response.json();
	return respData;
}
