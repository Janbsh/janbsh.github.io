import { writable } from 'svelte/store';

const initialToken = localStorage.getItem('jwt_token');
export const jwt = writable<string | null>(initialToken);

jwt.subscribe(token => {
  if (token) {
    localStorage.setItem('jwt_token', token);
  } else {
    localStorage.removeItem('jwt_token');
  }
});
