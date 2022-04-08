import {fetchPost} from './tools.js';

export async function logout() {
	return fetchPost("/logout");
}
