// Funções utilitárias
function copyToClipboard(elementId) {
  var copyText = document.getElementById(elementId);
  if (copyText) {
    copyText.select();
    document.execCommand("copy");
    console.log("Copiado pelo botão: " + copyText.value);
  }
}

function copyOnClick(event) {
  var copyText = event.target;
  copyText.select();
  document.execCommand("copy");
  console.log("Copiado com clique: " + copyText.value);
}

function copyOnFocus(elementId) {
  var copyText = document.getElementById(elementId);
  if (copyText) {
    copyText.select();
    document.execCommand("copy");
    console.log("Copiado com foco: " + copyText.value);
  }
}

function populateDropdown() {
  var caminhoElement = document.getElementById('Caminho');
  if (caminhoElement) {
    var caminho = caminhoElement.value;
    var caminhoArray = caminho.split(',');
    var select = document.getElementById('navegacaoURA');

    if (select) {
      select.innerHTML = '';

      var defaultOption = document.createElement('option');
      defaultOption.value = "";
      defaultOption.text = "Navegação:";
      defaultOption.selected = true;
      defaultOption.disabled = true;
      defaultOption.style.color = "#000000";
      select.appendChild(defaultOption);

      caminhoArray.forEach(function (item) {
        var option = document.createElement('option');
        option.value = item.trim();
        option.text = item.trim();
        option.disabled = true;
        option.style.color = "#000000";
        select.appendChild(option);
      });
    }
  }
}

function confirmRecording() {
  document.getElementById("recordingModal").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

// Inicialização geral após o carregamento do DOM
window.addEventListener('load', function () {
  // Copiar ao clicar no input
  const inputs = document.querySelectorAll('input[type="text"]');
  inputs.forEach(input => {
    input.addEventListener('click', copyOnClick);
  });

  // Preenchimento de dropdown
  populateDropdown();

  // Funções que você mencionou mas não detalhou
  if (typeof populateNavigation === 'function') populateNavigation();
  if (typeof setupTransfers === 'function') setupTransfers();
  if (typeof showOriginSkill === 'function') showOriginSkill();
  if (typeof handleTransfer === 'function') handleTransfer();

  // Modal
  const modal = document.getElementById("recordingModal");
  const overlay = document.getElementById("overlay");
  if (modal && overlay) {
    modal.style.display = "block";
    overlay.style.display = "block";
  } else {
    console.warn("Modal ou overlay não encontrados.");
  }

  // Botão confirmação
  const openBtn = document.getElementById("openConfirmation");
  if (openBtn && typeof confirmTransfer === 'function') {
    openBtn.addEventListener("click", confirmTransfer);
  }

  // Botão finalizar
  const btnFinalizar = document.getElementById("btnFinalizar");
  if (btnFinalizar) {
    btnFinalizar.addEventListener("click", function () {
      this.value = "finalizar";
      console.log("Botão finalizar acionado");
    });
  }

  // Opções do select (se declaradas corretamente)
  if (typeof optionsToShow !== 'undefined' && Array.isArray(optionsToShow)) {
    const select = document.getElementById("seuSelectIdAqui"); // Substitua pelo ID real
    if (select) {
      optionsToShow.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option.value;
        opt.textContent = option.text;
        select.appendChild(opt);
      });
    }
  }
});
