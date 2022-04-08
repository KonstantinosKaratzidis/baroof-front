import {fetchPost} from './tools.js';

export async function login({email, password}) {
	return fetchPost("/login", {email, password});
}
