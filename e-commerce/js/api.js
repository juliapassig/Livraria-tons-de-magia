const apiUrl = 'http://localhost:3000/produtos';

export const getProdutos = async () => {
  const response = await fetch(apiUrl);
  return await response.json();
};

export const addProduto = async (produto) => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(produto)
  });
  return await response.json();
};

export const deleteProduto = async (id) => {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  });
  return await response.json();
};
