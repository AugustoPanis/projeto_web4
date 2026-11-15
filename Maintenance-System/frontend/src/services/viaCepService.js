export const viaCepService = {


  async searchLocation(cep) {
    const data = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    return data.json();
  },
  
};