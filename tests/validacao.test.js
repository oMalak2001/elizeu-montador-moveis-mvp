function testarDeteccaoConflito(agendaExistente, dataNova, horarioNovo) {
  return Boolean(agendaExistente.find(item => item.data === dataNova && item.horario === horarioNovo));
}

function testarSanitizacaoXSS(entrada) {
  return String(entrada).replace(/</g, "<").replace(/>/g, ">");
}

const agendaMock = [
  { data: "20/11/2026", horario: "09:00", cliente: "Carlos Eduardo Silva" }
];

console.assert(
  testarDeteccaoConflito(agendaMock, "20/11/2026", "09:00") === true,
  "Falha: deveria detectar conflito as 09:00 em 20/11/2026"
);

console.assert(
  testarDeteccaoConflito(agendaMock, "20/11/2026", "15:00") === false,
  "Falha: horario livre as 15:00 nao deveria gerar conflito"
);

console.assert(
  testarSanitizacaoXSS("<script>alert(1)</script>") === "<script>alert(1)</script>",
  "Falha: tags HTML devem ser neutralizadas conforme RNF02"
);

console.log("Todos os testes de conflito (RF03) e sanitizacao (RNF02) passaram.");
