import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'http://httpstat.us/200',
  headers: {
    'Content-Type': 'application/json',
  },
});
