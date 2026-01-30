const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");
const imagemPrincipal = document.querySelector(".main-imagem");
const containerImagem = document.querySelector(".container-imagem");
const containerImagemNome = document.querySelector(".container-imagem-nome");
const nomeDaImagem = containerImagemNome.querySelector("p");
const imagemRemover = containerImagemNome.querySelector("img");
const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");
const containerTags = document.getElementById("container-tags");
const botaoPublicar = document.querySelector(".botao-publicar-button");
const botaoDescartar = document.querySelector(".botao-descartar");
const inputNome = document.getElementById("nome");
const inputDescricao = document.getElementById("descricao");
const formulario = document.querySelector("form");

const tagsDisponiveis = ["front-end", "frontend", "front end", "back-end", "backend", "back end", "full-stack", "fullstack", "full stack", "programacao", "programação", "desenvolvimento", "desenvolvimento web", "desenvolvimento mobile", "desenvolvimento de software", "desenvolvimento de sistemas", "tecnologia da informacao", "ti", "informatica", "computacao", "computação", "ciencia da computacao", "ciência da computação", "engenharia de software", "analise de sistemas", "análise de sistemas", "sistemas de informacao", "sistemas de informação", "data science", "ciencia de dados", "ciência de dados", "analise de dados", "análise de dados", "big data", "banco de dados", "base de dados", "sql", "mysql", "postgresql", "oracle", "nosql", "mongodb", "redis", "cassandra", "modelagem de dados", "arquitetura de dados", "data warehouse", "data lake", "etl", "bi", "business intelligence", "power bi", "tableau", "looker", "visualizacao de dados", "visualização de dados", "estatistica", "estatística", "machine learning", "aprendizado de maquina", "aprendizado de máquina", "deep learning", "inteligencia artificial", "inteligência artificial", "redes neurais", "processamento de linguagem natural", "nlp", "visao computacional", "visão computacional", "algoritmos", "logica de programacao", "lógica de programação", "estrutura de dados", "complexidade de algoritmos", "python", "java", "javascript", "typescript", "c", "c++", "csharp", "c#", "php", "ruby", "go", "golang", "rust", "swift", "kotlin", "dart", "scala", "r", "bash", "shell script", "powershell", "html", "css", "sass", "less", "bootstrap", "tailwind", "react", "reactjs", "vue", "vuejs", "angular", "svelte", "nextjs", "nuxt", "node", "nodejs", "deno", "bun", "express", "nestjs", "spring", "spring boot", "laravel", "symfony", "django", "flask", "fastapi", "rails", "asp.net", "api", "api rest", "restful", "graphql", "grpc", "json", "xml", "yaml", "microservicos", "microservices", "monolito", "monolitico", "arquitetura de software", "design patterns", "padroes de projeto", "mvc", "mvvm", "clean architecture", "hexagonal", "ddd", "testes automatizados", "testes unitarios", "testes de integracao", "testes de sistema", "testes de carga", "testes de performance", "tdd", "bdd", "qualidade de software", "qa", "controle de qualidade", "versionamento", "git", "github", "gitlab", "bitbucket", "commit", "branch", "merge", "pull request", "code review", "devops", "devsecops", "ci", "cd", "ci cd", "integracao continua", "entrega continua", "docker", "containers", "kubernetes", "k8s", "helm", "cloud", "computacao em nuvem", "computação em nuvem", "aws", "azure", "gcp", "google cloud", "infraestrutura", "infraestrutura como codigo", "terraform", "ansible", "puppet", "chef", "linux", "windows", "macos", "sistemas operacionais", "redes de computadores", "protocolos", "tcp ip", "http", "https", "ftp", "ssh", "dns", "firewall", "seguranca da informacao", "segurança da informação", "ciberseguranca", "cibersegurança", "criptografia", "autenticacao", "autenticação", "autorizacao", "autorização", "oauth", "jwt", "lgpd", "gdpr", "pentest", "teste de invasao", "teste de invasão", "ethical hacking", "hacking etico", "malware", "ransomware", "phishing", "backup", "alta disponibilidade", "escalabilidade", "observabilidade", "monitoramento", "logging", "metrics", "prometheus", "grafana", "elasticsearch", "kibana", "splunk", "sre", "site reliability engineering", "suporte tecnico", "suporte técnico", "help desk", "service desk", "itil", "gerenciamento de servicos", "gerenciamento de serviços", "erp", "crm", "sistemas corporativos", "automacao", "automação", "rpa", "internet das coisas", "iot", "edge computing", "computacao distribuida", "computação distribuída", "computacao paralela", "computação paralela", "realidade virtual", "realidade aumentada", "realidade mista", "blockchain", "web3", "contratos inteligentes", "smart contracts", "criptomoedas", "bitcoin", "ethereum", "nft", "token", "metaverso", "teste", "front", "back"];

function pegarArquivo() {
  return inputUpload.files[0] || null;
}

function lerConteudoDoArquivo(arquivo) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onload = () => { resolve({ url: leitor.result, nome: arquivo.name }) }
    leitor.onerror = () => { reject(`Erro na leitura do arquivo ${arquivo.name}`) }
    leitor.readAsDataURL(arquivo);
  });
}

function imagemValida(valida, texto, url = "") {
  if (valida) {
    imagemPrincipal.src = url;
    nomeDaImagem.textContent = texto;
    nomeDaImagem.classList.remove("error");
    imagemRemover.style.display = "block";
    containerImagem.style.height = "200px";
  } else {
    nomeDaImagem.textContent = texto;
    nomeDaImagem.classList.add("error");
    imagemRemover.style.display = "none";
    imagemPrincipal.src = "./img/without-image.png";
    containerImagem.style.height = "368px";
  }
}

function validarCamposObrigatorios(form) {
  const camposObrigatorios = form.querySelectorAll('[required]');
  let camposComErro = 0;

  for (const campo of camposObrigatorios) {
    if (campo.value.trim() === '') {
      mostrarErroForm(campo, 'Campo obrigatório');
      camposComErro++;
    }
  }

  if (camposComErro >= 1) return false;

  return true;
}

async function verificaTagsDisponiveis(tagTexto) {
  return new Promise((resolve) => {
    resolve(tagsDisponiveis.includes(tagTexto.toLowerCase()))
  })
}

function limparErroTags() {
  const mensagemErro = document.querySelector(".error-tags");
  if (mensagemErro) {
    containerTags.removeChild(mensagemErro);
  }
}

function limparErrosForm() {
  const erros = document.querySelectorAll(".error-form");
  erros.forEach(erro => erro.remove());
}

function limparErroCampo(campo) {
  const erro = campo.parentElement.querySelector(".error-form");
  if (erro) {
    erro.remove();
  }
}

function mostrarErroForm(campo, textoErro) {
  const erroExistente = campo.parentElement.querySelector(".error-form");
  if (erroExistente) erroExistente.remove();

  const mensagemErro = document.createElement("p");
  mensagemErro.className = "error-form";
  mensagemErro.textContent = textoErro;
  campo.parentElement.appendChild(mensagemErro);
}

function mostrarErroTags(textoErro) {
  limparErroTags();
  const jaErro = document.querySelector(".error-tags");
  if (jaErro) {
    return;
  }
  const mensagemErro = document.createElement("p");
  mensagemErro.className = "error-tags";
  mensagemErro.style.margin = "5px 0 0 5px";
  mensagemErro.textContent = textoErro;
  containerTags.appendChild(mensagemErro);
}

async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsDoProjeto) {
  return new Promise((resolve, reject) => {
    console.log(!pegarArquivo());
    if (!pegarArquivo()) {
      containerImagemNome.style.display = "flex";
      imagemValida(false, "Imagem obrigatória.");
    }
    if (!validarCamposObrigatorios(formulario) || !pegarArquivo()) return;

    botaoPublicar.innerHTML = `
    <svg class="loader" viewBox="0 0 50 50">
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="currentColor"
        stroke-width="4"
      />
    </svg>
  `;

    // Simula demora da internet e etc...
    setTimeout(() => {
      // Simula sucesso/falha
      const sucesso = Math.random() > 0.5;

      if (sucesso) {
        resolve("Projeto publicado com sucess")
      } else {
        reject("Erro ao publicar projeto");
      }
      botaoPublicar.innerHTML = `
      <div class="botao-publicar-texto">Publicar</div>
    `;
    }, 1500);
  });
}

function resetAll() {
  formulario.reset();
  imagemPrincipal.src = "./img/without-image.png";
  imagemRemover.style.display = "none";
  nomeDaImagem.textContent = "";
  listaTags.innerHTML = "";
  limparErroCampo(inputNome);
  limparErroCampo(inputDescricao);
  limparErroTags();
}

uploadBtn.addEventListener("click", () => {
  inputUpload.click();
});

inputUpload.addEventListener("change", async (e) => {
  const arquivo = pegarArquivo();

  if (!arquivo) {
    return;
  }

  const isValid = arquivo.type && arquivo.type.startsWith("image/");
  const isSizeValid = arquivo.size <= 5 * 1024 * 1024; // 5MB
  containerImagemNome.style.display = "flex";

  if (!isValid) {
    imagemValida(false, "Formato de arquivo inválido.");
    e.target.value = "";
    return;
  }

  if (!isSizeValid) {
    imagemValida(false, "Tamanho do arquivo muito grande.")
    e.target.value = "";
    return;
  }

  try {
    const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
    imagemValida(true, conteudoDoArquivo.nome, conteudoDoArquivo.url);
  } catch (error) {
    console.error("Erro na leitura do arquivo:", error);
    imagemValida(false, "Erro ao ler o arquivo");
  }
});

listaTags.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-tag")) {
    const tagExcluir = e.target.parentElement;
    listaTags.removeChild(tagExcluir);
    const quantidadeTags = document.querySelectorAll('.remove-tag').length;
    if (quantidadeTags < 5) {
      limparErroTags();
    }
  }
});

containerImagemNome.addEventListener("click", (e) => {
  if (e.target.id === "remover-imagem") {
    inputUpload.value = "";
    imagemValida(false, "");
    containerImagemNome.style.display = "none";
  }
});

inputTags.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const tagTexto = inputTags.value.trim();
    if (tagTexto !== "") {
      const quantidadeTags = document.querySelectorAll('.remove-tag').length;
      if (quantidadeTags >= 5) {
        mostrarErroTags("Número máximo de tags é 5");
        return;
      }
      try {
        const tagValida = await verificaTagsDisponiveis(tagTexto);
        if (!tagValida) {
          mostrarErroTags("Tag não encontrada na listagem.");
          return;
        }

        const tagsExistentes = Array.from(listaTags.querySelectorAll("li p"));
        const tagJaExiste = tagsExistentes.some(p => p.textContent.trim().toLowerCase() === tagTexto.toLowerCase());

        if (tagJaExiste) {
          mostrarErroTags("Tag já adicionada.");
          return;
        }

        limparErroTags();

        const tagNova = document.createElement("li");
        tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`;
        listaTags.appendChild(tagNova);
        inputTags.value = "";
      } catch (error) {
        console.error("Erro ao adicionar Tag:", error)
      }
    }
  }
});

botaoPublicar.addEventListener("click", async (e) => {
  e.preventDefault();

  const nomeDoProjeto = document.getElementById("nome").value;
  const descricaoDoProjeto = document.getElementById("descricao").value;
  const tagsDoProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);

  try {
    const resultado = await publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsDoProjeto);

    // criar objeto do projeto
    const arquivo = pegarArquivo();
    const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);

    const novoProjeto = {
      nome: nomeDoProjeto,
      descricao: descricaoDoProjeto,
      tags: tagsDoProjeto,
      imagem: conteudoDoArquivo.url
    };

    adicionarProjetoNaLista(novoProjeto); // função do outro arquivo
    alert("Projeto publicado!");
    resetAll();
  } catch (error) {
    console.error("Erro:", error);
    alert("Deu errado!");
  }
});

botaoDescartar.addEventListener("click", async (e) => {
  e.preventDefault();
  containerImagem.style.height = "368px";

  resetAll();
});