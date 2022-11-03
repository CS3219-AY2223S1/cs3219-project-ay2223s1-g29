import Queue from 'queue-fifo';
import axios from 'axios';

const baseUrl = "https://collab.schoolex.me/api/matches"; // change to collab service url

const createMatch = (userId1:string, userId2:string, difficulty:string) => {
    return axios.post(baseUrl, {userId1: userId1, userId2:userId2, difficulty:difficulty});
}

const CollabService = {
    createMatch,
};

export {CollabService as default};
