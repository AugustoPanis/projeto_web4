import {api} from './api.js';

export const clientService = {

  async clientCreate(clientData) {

    const data = await api.post('/client', clientData);
    return data;
  },
  
};