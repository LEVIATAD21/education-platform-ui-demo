# Plataforma Educacional

> **Demo de portfólio independente.** Não representa trabalho contratado, dados de cliente, integração produtiva ou resultado comercial.

Interface estática para acompanhar uma trilha curta de aprendizagem. A demonstração mantém o estado de conclusão somente no armazenamento local do navegador, sem conta, transmissão de dados ou integração externa.

## Funcionalidades demonstradas

- Trilhas com aulas, duração, próxima etapa e progresso calculado localmente
- Marcação e desmarcação de conclusão com persistência opcional em `localStorage`
- Recuperação segura quando o armazenamento está indisponível ou contém dados inválidos
- Reinicialização explícita do estado da demonstração
- Questão rápida com feedback acessível e imediato
- Design responsivo para dispositivos móveis

## Segurança

- Dados fictícios: nenhuma informação real de alunos ou cursos
- Sem armazenamento sensível: apenas progresso de demonstração
- Persistência local: dados ficam apenas no navegador do usuário
- Sem requisições externas: aplicação funciona offline
- Validação de dados: entrada verificada antes do processamento

## Tecnologias

- HTML5 semântico
- CSS3 com variáveis CSS
- JavaScript ES6+ (módulos nativos)
- Node.js para testes e revisão

## Estrutura do Projeto

```
education-platform-ui-demo/
├── index.html          # Página principal
├── styles.css          # Estilos da aplicação
├── app.mjs             # Lógica principal e trilhas
├── main.mjs            # Ponto de entrada
├── tests.mjs           # Testes unitários
├── review.mjs          # Revisão estática de código
├── package.json        # Configuração do projeto
├── .gitignore          # Arquivos ignorados pelo Git
├── LICENSE             # Licença MIT
└── README.md           # Este arquivo
```

## Executar e revisar

```bash
npm test
npm run review
```

## Testes

Os testes cobrem:
- Cálculo de progresso
- Marcação de conclusão
- Persistência em localStorage
- Recuperação de dados inválidos
- Reinicialização de estado

## Limites

- Conteúdo e dados são estritamente ilustrativos
- Sem backend, autenticação ou banco de dados
- Projeto destinado a demonstração técnica para portfólio

## Autor

**Kawã Silva dos Santos**
- GitHub: [@leviatad21](https://github.com/LEVIATAD21)
- Estudante de Segurança da Informação

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
