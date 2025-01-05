import { getProdutos, addProduto, deleteProduto } from './api.js';

// Função para renderizar os produtos
const renderProdutos = async () => {
  const produtos = await getProdutos();
  const listaProdutos = document.getElementById('produtos-lista');
  listaProdutos.innerHTML = ''; // Limpa a lista de produtos

  if (produtos.length === 0) {
    listaProdutos.innerHTML = '<p>Nenhum produto foi adicionado.</p>';
  } else {
    produtos.forEach(produto => {
      const card = document.createElement('div');
      card.classList.add('produto-card');
      card.dataset.id = produto.id;

      card.innerHTML = `
        <h3>${produto.nome}</h3>
        <p>Autor: ${produto.autor}</p>
        <p>Preço: R$ ${produto.preco}</p>
        <button class="delete-btn">Excluir</button>
      `;
      
      // Adiciona o evento de exclusão
      card.querySelector('.delete-btn').addEventListener('click', async () => {
        await deleteProduto(produto.id);
        renderProdutos(); // Recarrega os produtos
      });

      listaProdutos.appendChild(card);
    });
  }
};

// Captura o evento do formulário para adicionar um novo produto
document.getElementById('form-produto').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const nome = document.getElementById('nome').value;
  const autor = document.getElementById('autor').value;
  const preco = parseFloat(document.getElementById('preco').value);

  const novoProduto = { nome, autor, preco };

  await addProduto(novoProduto);
  renderProdutos(); // Recarrega os produtos
});

// Carrega os produtos inicialmente
renderProdutos();
