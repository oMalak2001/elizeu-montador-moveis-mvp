const servicos = [
  {
    id: 1,
    horario: "09:00",
    data: "20/11/2026",
    cliente: "Carlos Eduardo Silva",
    bairro: "Centro — São Bernardo do Campo",
    regiao: "Grande ABC",
    movel: "Guarda-roupa 6 portas",
    valor: "220,00",
    status: "Confirmado"
  },
  {
    id: 2,
    horario: "13:30",
    data: "20/11/2026",
    cliente: "Mariana Oliveira",
    bairro: "Campestre — Santo André",
    regiao: "Grande ABC",
    movel: "Cozinha modulada 5 peças",
    valor: "280,00",
    status: "Pendente"
  }
];

let regiaoSelecionada = "Todos";

function sanitizarTexto(texto) {
  const div = document.createElement("div");
  div.textContent = String(texto || "").trim();
  return div.innerHTML;
}

function mostrarTela(idTela) {
  document.querySelectorAll(".tela").forEach(t => t.classList.add("oculto"));
  document.getElementById(idTela).classList.remove("oculto");
}

function renderizarAgenda() {
  const container = document.getElementById("lista-servicos");
  const termo = document.getElementById("busca-bairro").value.toLowerCase();
  container.innerHTML = "";

  const filtrados = servicos
    .filter(s => regiaoSelecionada === "Todos" || s.regiao === regiaoSelecionada)
    .filter(s => s.bairro.toLowerCase().includes(termo) || s.cliente.toLowerCase().includes(termo))
    .sort((a, b) => a.horario.localeCompare(b.horario));

  filtrados.forEach(item => {
    const card = document.createElement("article");
    card.className = "card-servico";
    const iconeStatus = item.status === "Confirmado" ? "✔" : "⏳";

    card.innerHTML = `
      <strong>${sanitizarTexto(item.horario)} — ${sanitizarTexto(item.cliente)}</strong>
      <p>${sanitizarTexto(item.bairro)} (${sanitizarTexto(item.regiao)})</p>
      <p>Móvel: ${sanitizarTexto(item.movel)} | R$ ${sanitizarTexto(item.valor)}</p>
      <div class="badge-status status-${sanitizarTexto(item.status)}">${iconeStatus} ${sanitizarTexto(item.status)}</div>
      <button type="button" class="btn-secundario btn-full" data-id="${item.id}">
        Alternar Status (Pendente / Confirmado)
      </button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      item.status = item.status === "Pendente" ? "Confirmado" : "Pendente";
      renderizarAgenda();
    });

    container.appendChild(card);
  });
}

function verificarConflito(data, horario) {
  return servicos.find(s => s.data === data && s.horario === horario);
}

function salvarNovoServico() {
  servicos.push({
    id: Date.now(),
    horario: sanitizarTexto(document.getElementById("cad-horario").value),
    data: sanitizarTexto(document.getElementById("cad-data").value),
    cliente: sanitizarTexto(document.getElementById("cad-cliente").value),
    bairro: sanitizarTexto(document.getElementById("cad-bairro").value),
    regiao: sanitizarTexto(document.getElementById("cad-regiao").value),
    movel: sanitizarTexto(document.getElementById("cad-movel").value),
    valor: sanitizarTexto(document.getElementById("cad-valor").value),
    status: "Pendente"
  });
  document.getElementById("alerta-conflito").classList.add("oculto");
  document.getElementById("form-cadastro").reset();
  mostrarTela("tela-agenda");
  renderizarAgenda();
}

document.getElementById("form-login").addEventListener("submit", e => {
  e.preventDefault();
  mostrarTela("tela-agenda");
  renderizarAgenda();
});

document.getElementById("btn-toggle-senha").addEventListener("click", () => {
  const input = document.getElementById("login-senha");
  input.type = input.type === "password" ? "text" : "password";
});

document.querySelectorAll(".chip").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach(c => c.classList.remove("ativo"));
    btn.classList.add("ativo");
    regiaoSelecionada = btn.dataset.regiao;
    renderizarAgenda();
  });
});

document.getElementById("busca-bairro").addEventListener("input", renderizarAgenda);
document.getElementById("btn-ir-cadastro").addEventListener("click", () => mostrarTela("tela-cadastro"));
document.getElementById("btn-voltar-topo").addEventListener("click", () => mostrarTela("tela-agenda"));
document.getElementById("btn-voltar-base").addEventListener("click", () => mostrarTela("tela-agenda"));
document.getElementById("btn-sair").addEventListener("click", () => mostrarTela("tela-login"));

document.getElementById("form-cadastro").addEventListener("submit", e => {
  e.preventDefault();
  const data = document.getElementById("cad-data").value;
  const horario = document.getElementById("cad-horario").value;
  const conflito = verificarConflito(data, horario);

  if (conflito) {
    document.getElementById("alerta-conflito-texto").textContent =
      `Já existe um atendimento ${conflito.status} às ${conflito.horario} na data ${conflito.data} (${conflito.cliente} — ${conflito.bairro}).`;
    document.getElementById("alerta-conflito").classList.remove("oculto");
    return;
  }
  salvarNovoServico();
});

document.getElementById("btn-ajustar-horario").addEventListener("click", () => {
  document.getElementById("alerta-conflito").classList.add("oculto");
  document.getElementById("cad-horario").focus();
});

document.getElementById("btn-forcar-salvar").addEventListener("click", salvarNovoServico);
