export const STORAGE_KEY = 'kawa-labs.education-platform.progress.v1';

export const lessons = [
  { id: 'fundamentos', title: 'Fundamentos de dados', duration: '12 minutos', done: true },
  { id: 'interfaces', title: 'Interfaces acessíveis', duration: '18 minutos', done: false },
  { id: 'revisao', title: 'Revisão prática', duration: '10 minutos', done: false },
];

function cloneLessons(items = lessons) {
  return items.map((lesson) => ({ ...lesson, done: Boolean(lesson.done) }));
}

function getBrowserStorage() {
  try {
    return typeof window === 'undefined' ? null : window.localStorage;
  } catch {
    return null;
  }
}

export function calculateProgress(items) {
  if (!items.length) return 0;
  return Math.round((items.filter((item) => item.done).length / items.length) * 100);
}

export function isCorrectAnswer(answer) {
  return answer === 'semantica';
}

export function toggleLesson(items, lessonId) {
  return items.map((lesson) => (lesson.id === lessonId ? { ...lesson, done: !lesson.done } : { ...lesson }));
}

export function markLessonDone(items, lessonId) {
  return items.map((lesson) => (lesson.id === lessonId ? { ...lesson, done: true } : { ...lesson }));
}

export function getNextLesson(items) {
  return items.find((lesson) => !lesson.done) ?? null;
}

export function loadProgress(storage, key = STORAGE_KEY) {
  const defaults = cloneLessons();
  if (!storage?.getItem) return defaults;

  try {
    const saved = JSON.parse(storage.getItem(key));
    if (!Array.isArray(saved)) return defaults;
    const savedById = new Map(saved.map((item) => [item?.id, Boolean(item?.done)]));
    return defaults.map((lesson) => ({ ...lesson, done: savedById.get(lesson.id) ?? lesson.done }));
  } catch {
    return defaults;
  }
}

export function saveProgress(storage, items, key = STORAGE_KEY) {
  if (!storage?.setItem) return false;
  try {
    const safePayload = items.map(({ id, done }) => ({ id, done: Boolean(done) }));
    storage.setItem(key, JSON.stringify(safePayload));
    return true;
  } catch {
    return false;
  }
}

export function clearProgress(storage, key = STORAGE_KEY) {
  if (!storage?.removeItem) return false;
  try {
    storage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export function mount(root) {
  const storage = getBrowserStorage();
  let state = loadProgress(storage);
  let feedback = '';

  const persist = () => saveProgress(storage, state);
  const render = () => {
    const progress = calculateProgress(state);
    const nextLesson = getNextLesson(state);
    const storageHint = storage ? 'Seu progresso fica salvo somente neste navegador.' : 'O navegador bloqueou o salvamento local nesta sessão.';

    root.innerHTML = `<section class="hero"><article class="hero-card"><p class="eyebrow">Painel do estudante</p><h1>Aprender com contexto, não com telas soltas.</h1><p class="lede">Uma trilha curta demonstra conclusão de aulas, progresso persistente no navegador e retorno imediato de conhecimento.</p><div class="progress" role="progressbar" aria-label="Progresso da trilha" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress}"><span style="width: ${progress}%"></span></div><p><b>${progress}%</b> concluído nesta trilha.</p><p class="muted small">${storageHint}</p></article><aside class="hero-card"><p class="eyebrow">Próximo passo</p><h2>${nextLesson ? nextLesson.title : 'Trilha concluída'}</h2><p class="muted">${nextLesson ? `${nextLesson.duration} · exercício guiado` : 'Você pode revisar as aulas ou reiniciar a demonstração.'}</p>${nextLesson ? `<button class="button" type="button" data-open="${nextLesson.id}">Concluir próxima aula</button>` : '<button class="button" type="button" data-reset>Reiniciar trilha</button>'}</aside></section><section class="grid two"><article class="card"><div class="card-heading"><div><p class="eyebrow">Trilha atual</p><h2>Aulas disponíveis</h2></div><button class="button secondary compact" type="button" data-reset>Reiniciar</button></div><div class="list">${state.map((lesson) => `<article class="item lesson-item ${lesson.done ? 'selected' : ''}"><div><b>${lesson.done ? '✓ ' : '○ '}${lesson.title}</b><br><span class="muted">${lesson.duration} · ${lesson.done ? 'Concluída' : 'Disponível para estudar'}</span></div><button class="button secondary compact" type="button" data-toggle="${lesson.id}" aria-pressed="${lesson.done}">${lesson.done ? 'Marcar pendente' : 'Marcar concluída'}</button></article>`).join('')}</div></article><article class="card"><p class="eyebrow">Checagem rápida</p><h2>Conhecimento aplicado</h2><p>Qual escolha ajuda leitores de tela a entenderem a estrutura de uma página?</p><div class="row"><button class="button secondary" type="button" data-answer="cor">Usar só cores</button><button class="button secondary" type="button" data-answer="semantica">Usar HTML semântico</button></div>${feedback ? `<p class="result ${feedback.type === 'error' ? 'error' : ''}" role="status">${feedback.message}</p>` : ''}</article></section>`;

    root.querySelectorAll('[data-toggle]').forEach((button) => button.addEventListener('click', () => {
      state = toggleLesson(state, button.dataset.toggle);
      const stored = persist();
      feedback = { type: stored ? 'success' : 'error', message: stored ? 'Progresso atualizado neste navegador.' : 'A aula foi atualizada nesta tela, mas o salvamento local não está disponível.' };
      render();
    }));

    root.querySelectorAll('[data-open]').forEach((button) => button.addEventListener('click', () => {
      state = markLessonDone(state, button.dataset.open);
      const stored = persist();
      feedback = { type: stored ? 'success' : 'error', message: stored ? 'Aula concluída e progresso salvo neste navegador.' : 'Aula concluída nesta tela, mas o salvamento local não está disponível.' };
      render();
    }));

    root.querySelectorAll('[data-reset]').forEach((button) => button.addEventListener('click', () => {
      clearProgress(storage);
      state = cloneLessons();
      feedback = { type: 'success', message: 'A demonstração foi reiniciada para o estado inicial.' };
      render();
    }));

    root.querySelectorAll('[data-answer]').forEach((button) => button.addEventListener('click', () => {
      feedback = isCorrectAnswer(button.dataset.answer)
        ? { type: 'success', message: 'Resposta correta: a semântica melhora a navegação assistiva.' }
        : { type: 'error', message: 'Revise: cor sozinha não explica a estrutura para tecnologias assistivas.' };
      render();
    }));
  };

  render();
}
