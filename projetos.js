const containerProjetos = document.getElementById("container-projetos");
const tituloSeusProjetos = document.getElementById("seus-projetos");

function adicionarProjetoNaLista(projeto) {
  tituloSeusProjetos.style.display = "block";
  const card = document.createElement("div");
  card.className = "card-projeto";
  card.innerHTML = `
    <img src="${projeto.imagem}" alt="${projeto.nome}" />
    <div class="projeto-text">
      <h3>${projeto.nome}</h3>
      <p>${projeto.descricao}</p>
      <ul>${projeto.tags.map(tag => `<li>${tag}</li>`).join('')}</ul>
    </div>    
  `;
  containerProjetos.appendChild(card);
}
