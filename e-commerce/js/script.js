

// Função para enviar os dados para a API, incluindo a imagem
async function adicionarProduto(nome, autor, preco, capa) {
    const produto = {
      nome: nome,
      autor: autor,
      preco: preco,
      capa: capa // Aqui vamos enviar a URL da imagem (base64 ou URL temporária)
    };
  
    try {
      const resposta = await fetch("http://localhost:4000/produtos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(produto)
      });
  
      if (resposta.ok) {
        alert("Produto adicionado com sucesso!");
        carregarProdutos(); // Função para recarregar os produtos na tela
      } else {
        alert("Erro ao adicionar o produto");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao adicionar o produto");
    }
  }
  
  // Função para manipular o envio do formulário
  document.getElementById("form-adicionar-produto").addEventListener("submit", function (evento) {
    evento.preventDefault(); // Impede o comportamento padrão de envio do formulário
  
    const nome = document.getElementById("nome").value;
    const autor = document.getElementById("autor").value;
    const preco = document.getElementById("preco").value;
    const capaInput = document.getElementById("capa");
  
    if (nome && autor && preco && capaInput.files.length > 0) {
      const capa = URL.createObjectURL(capaInput.files[0]); // Cria um URL temporário para a imagem
      adicionarProduto(nome, autor, preco, capa);
    } else {
      alert("Por favor, preencha todos os campos e adicione uma capa.");
    }
  });
  
  // Função para carregar os produtos e exibir as capas
  async function carregarProdutos() {
    try {
      const resposta = await fetch("http://localhost:4000/produtos");
      const produtos = await resposta.json();
  
      const listaProdutos = document.getElementById("produtos-lista");
      listaProdutos.innerHTML = ""; // Limpa a lista antes de adicionar os novos produtos
  
      if (produtos.length > 0) {
        produtos.forEach(produto => {
          const produtoCard = document.createElement("div");
          produtoCard.classList.add("produto-card");
          produtoCard.innerHTML = `
            <h2>${produto.nome}</h2>
            <p>Autor: ${produto.autor}</p>
            <p>Preço: R$ ${produto.preco}</p>
            <img src="${produto.capa}" alt="Capa do Livro">
            <button onclick="excluirProduto(${produto.id})">Excluir</button>
          `;
          listaProdutos.appendChild(produtoCard);
        });
      } else {
        listaProdutos.innerHTML = "<p>Nenhum produto foi adicionado ainda.</p>";
      }
    } catch (error) {
      console.error("Erro ao carregar os produtos:", error);
    }
  }
  
  // Função para excluir um produto
  async function excluirProduto(id) {
    try {
      const resposta = await fetch(`http://localhost:5000/produtos/${id}`, {
        method: "DELETE"
      });
  
      if (resposta.ok) {
        alert("Produto excluído com sucesso!");
        carregarProdutos(); // Recarregar a lista de produtos
      } else {
        alert("Erro ao excluir o produto.");
      }
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
    }
  }
  
  // Carregar os produtos ao iniciar a página
  window.onload = function() {
    carregarProdutos();
  };
  