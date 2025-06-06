// Funções de cópia
function copyToClipboard(elementId) {
  const copyText = document.getElementById(elementId);
  if (copyText) {
    copyText.select();
    document.execCommand("copy");
    console.log(`Copiado: ${copyText.value}`);
  }
}

function copyOnFocus(elementId) {
  copyToClipboard(elementId);
}

// Função auxiliar para criar opções
function createOption(value, text) {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = text;
  return option;
}

// Preencher dropdown de navegação
function populateNavigation() {
  const caminho = document.getElementById('Caminho').value.split(',');
  const select = document.getElementById('navegacaoURA');
  
  select.innerHTML = '';
  select.appendChild(createOption('', 'Navegação:')).disabled = true;

  caminho.forEach(item => {
    const option = createOption(item.trim(), item.trim());
    option.disabled = true;
    select.appendChild(option);
  });
}

// Configuração de skills
const skillConfig = {
  skills: {
    "20868796": "Adq Cabal Cadastro",
    "20868797": "Adq Cabal Atendente",
    "20868798": "Adq Cabal Credenciamento",
    "20868799": "Adq Cabal Portal",
    "20868801": "Adq Cabal Financeiro",
    "20868802": "Adq Cabal Retencao",
    "20868803": "Adq Cabal Suporte Tecnico"
  },
  
  transferOptions: {
    default: [
      {value: "20868796", text: "Adq Cabal Cadastro"},
      {value: "20868797", text: "Adq Cabal Atendente"},
      {value: "20868798", text: "Adq Cabal Credenciamento"},
      {value: "20868799", text: "Adq Cabal Portal"},
      {value: "20868801", text: "Adq Cabal Financeiro"},
      {value: "20868802", text: "Adq Cabal Retencao"},
      {value: "20868803", text: "Adq Cabal Suporte Tecnico"},
      {value: "PUC", text: "URA PUC"}
    ]
  }
};

// Gerenciar transferências
function setupTransfers() {
  const skillValue = document.getElementById("SkillT").value;
  const select = document.getElementById("ListaTransf");
  const options = skillConfig.transferOptions[skillValue] || skillConfig.transferOptions.default;

  select.innerHTML = '';
  select.appendChild(createOption('', 'Lista de Transferência:')).disabled = true;

  options.forEach(opt => {
    if (opt.value !== skillValue) {
      select.appendChild(createOption(opt.value, opt.text));
    }
  });
}

// Exibir skill de origem
function showOriginSkill() {
  const skillOrigem = document.getElementById('SkillOrigem').value;
  const origemElement = document.getElementById('Origem');
  
  if (origemElement) {
    const skillText = skillConfig.skills[skillOrigem] || '';
    origemElement.value = skillText ? `${skillOrigem} - ${skillText}` : '';
  }
}

// Controle de transferência
function handleTransfer() {
  const select = document.getElementById('ListaTransf');
  const button = document.getElementById('openConfirmation');
  
  button.disabled = !select.value;
  button.style.cursor = select.value ? "pointer" : "not-allowed";

  select.addEventListener('change', () => {
    button.disabled = !select.value;
    button.style.cursor = select.value ? "pointer" : "not-allowed";
  });
}

// Confirmar transferência
function confirmTransfer() {
  const opTransf = document.getElementById('ListaTransf').value;
  if (!opTransf) return alert("Nenhuma opção selecionada.");

  const skillName = skillConfig.skills[opTransf] || 
                   (opTransf === 'PUC' ? 'URA PUC' : 'Skill Desconhecida');
  
  if (confirm(`Realmente deseja transferir para ${skillName}?`)) {
    document.getElementById('openConfirmation').value = "transf";
    console.log('Transferência confirmada para:', skillName);
  }
}

// Inicialização
window.onload = function() {
  populateNavigation();
  setupTransfers();
  showOriginSkill();
  handleTransfer();

  document.getElementById('openConfirmation').addEventListener('click', confirmTransfer);
  document.getElementById("btnPesquisa").addEventListener("click", function() {
    this.value = "pesquisa";
    console.log('Botão pesquisa acionado');
  });
};
