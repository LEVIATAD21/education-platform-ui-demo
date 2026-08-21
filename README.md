# Plataforma Educacional

> **Demo de portfólio independente.** Não representa trabalho contratado, dados de cliente, integração produtiva ou resultado comercial.

Interface estática para acompanhar uma trilha curta de aprendizagem. A demonstração mantém o estado de conclusão somente no armazenamento local do navegador, sem conta, transmissão de dados ou integração externa.

## Funcionalidades demonstradas

- Trilhas com aulas, duração, próxima etapa e progresso calculado localmente.
- Marcação e desmarcação de conclusão com persistência opcional em `localStorage`.
- Recuperação segura quando o armazenamento está indisponível ou contém dados inválidos.
- Reinicialização explícita do estado da demonstração.
- Questão rápida com feedback acessível e imediato.

## Executar e revisar

```bash
npm test
npm run review
```

Os testes cobrem cálculo de progresso, transição de aulas, seleção da próxima etapa, persistência, recuperação de dados inválidos e reinicialização. A revisão estática confere os arquivos obrigatórios, a identificação de demo, a ausência de arquivos de ambiente, a ausência de execução dinâmica e a ausência de chamadas externas.

## Limites

Dados, contatos e números apresentados pela interface são estritamente ilustrativos. Integrações, pagamento, hospedagem, banco de dados e dados de terceiros exigem escopo e autorização próprios.
