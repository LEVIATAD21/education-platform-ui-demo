import assert from 'node:assert/strict';
import {
  STORAGE_KEY,
  calculateProgress,
  clearProgress,
  getNextLesson,
  isCorrectAnswer,
  lessons,
  loadProgress,
  markLessonDone,
  saveProgress,
  toggleLesson,
} from './app.mjs';

const memoryStorage = {
  value: null,
  getItem() { return this.value; },
  setItem(_key, value) { this.value = value; },
  removeItem() { this.value = null; },
};

assert.equal(calculateProgress([{ done: true }, { done: false }]), 50);
assert.equal(calculateProgress([]), 0);
assert.equal(isCorrectAnswer('semantica'), true);
assert.equal(isCorrectAnswer('cor'), false);
assert.equal(getNextLesson(lessons).id, 'interfaces');
assert.equal(markLessonDone(lessons, 'interfaces').find((lesson) => lesson.id === 'interfaces').done, true);
assert.equal(toggleLesson(lessons, 'fundamentos').find((lesson) => lesson.id === 'fundamentos').done, false);
assert.equal(saveProgress(memoryStorage, markLessonDone(lessons, 'interfaces')), true);
assert.equal(loadProgress(memoryStorage).find((lesson) => lesson.id === 'interfaces').done, true);
memoryStorage.value = '{invalido';
assert.deepEqual(loadProgress(memoryStorage), lessons);
assert.equal(clearProgress(memoryStorage, STORAGE_KEY), true);

console.log('education-platform-ui-demo: testes aprovados');
