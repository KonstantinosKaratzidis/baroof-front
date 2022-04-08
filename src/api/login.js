import {fetchPost, fetchGet} from './tools.js';

export async function login({email, password}) {
	return fetchPost("/login", {email, password});
}

export async function getLoginStatus() {
	return fetchGet("/login")
}
