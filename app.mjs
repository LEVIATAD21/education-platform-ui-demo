export const lessons = [
{ id: 'fundamentos', title: 'Fundamentos de dados', done: true },
{ id: 'interfaces', title: 'Interfaces acessíveis', done: false },
{ id: 'revisao', title: 'Revisão prática', done: false },
];
export function calculateProgress(items) { return Math.round((items.filter((item) => item.done).length / items.length) * 100); }
export function isCorrectAnswer(answer) { return answer === 'semantica'; }
export function mount(root) {
let state = structuredClone(lessons);
const render = (feedback = '') => {
const progress = calculateProgress(state);
root.innerHTML = `<section class="hero"><article class="hero-card"><p class="eyebrow">Painel do estudante</p><h1>Aprender com contexto, não com telas soltas.</h1><p class="lede">Uma trilha curta demonstra navegação, estados de aula e acompanhamento de progresso.</p><div class="progress"><span style="width: ${progress}%"></span></div><p><b>${progress}%</b> concluído nesta trilha.</p></article><aside class="hero-card"><p class="eyebrow">Próximo passo</p><h2>Interfaces acessíveis</h2><p class="muted">18 minutos · exercício guiado</p><button class="button" data-open="interfaces">Abrir aula</button></aside></section><section class="grid two"><article class="card"><h2>Trilha atual</h2><div class="list">${state.map((lesson) => `<button class="item ${lesson.done ? 'selected' : ''}" data-lesson="${lesson.id}"><b>${lesson.done ? '✓ ' : '○ '}${lesson.title}</b><br><span class="muted">${lesson.done ? 'Concluída' : 'Disponível para estudar'}</span></button>`).join('')}</div></article><article class="card"><h2>Checagem rápida</h2><p>Qual escolha ajuda leitores de tela a entenderem a estrutura de uma página?</p><div class="row"><button class="button secondary" data-answer="cor">Usar só cores</button><button class="button secondary" data-answer="semantica">Usar HTML semântico</button></div>${feedback ? `<p class="result ${feedback.includes('correta') ? '' : 'error'}">${feedback}</p>` : ''}</article></section>`;
root.querySelectorAll('[data-lesson]').forEach((button) => button.addEventListener('click', () => { state = state.map((lesson) => lesson.id === button.dataset.lesson ? { ...lesson, done: true } : lesson); render('Aula marcada como concluída.'); }));
root.querySelectorAll('[data-open]').forEach((button) => button.addEventListener('click', () => { state = state.map((lesson) => lesson.id === button.dataset.open ? { ...lesson, done: true } : lesson); render('Aula aberta e progresso atualizado.'); }));
root.querySelectorAll('[data-answer]').forEach((button) => button.addEventListener('click', () => render(isCorrectAnswer(button.dataset.answer) ? 'Resposta correta: a semântica melhora a navegação assistiva.' : 'Revise: cor sozinha não explica a estrutura para tecnologias assistivas.')));
}; render();
}