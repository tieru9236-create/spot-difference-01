// Multi-scene Game Controller for Double Harbour
import { CONFIG } from './config.js';
import { renderScene } from './render.js';

class GameController {
  constructor() {
    this.cvsLeft = document.getElementById('cvs-left');
    this.cvsRight = document.getElementById('cvs-right');
    this.ctxLeft = this.cvsLeft.getContext('2d');
    this.ctxRight = this.cvsRight.getContext('2d');
    this.counterEl = document.getElementById('counter');
    this.timerEl = document.getElementById('timer');
    this.dotsContainer = document.getElementById('dots-container');
    this.hintBtn = document.getElementById('hint-btn');
    this.titleEl = document.querySelector('.title-group h1');
    this.subEl = document.querySelector('.title-group span');

    this.sceneIndex = 0;
    this.scene = CONFIG.scenes[this.sceneIndex];
    this.found = new Set();
    this.hintsLeft = 3;
    this.seconds = 42;

    this.init();
  }

  init() {
    this.resize();
    this.updateHeader();
    this.buildDots();
    this.bindEvents();
    this.render();
  }

  resize() {
    this.width = 580;
    this.height = 510;
    this.cvsLeft.width = this.width;
    this.cvsLeft.height = this.height;
    this.cvsRight.width = this.width;
    this.cvsRight.height = this.height;
  }

  updateHeader() {
    this.scene = CONFIG.scenes[this.sceneIndex];
    if (this.titleEl) this.titleEl.textContent = this.scene.title;
    if (this.subEl) this.subEl.textContent = this.scene.subtitle;
  }

  buildDots() {
    this.dotsContainer.innerHTML = '';
    for (let i = 0; i < this.scene.totalDifferences; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot' + (this.found.has(this.scene.differences[i]?.id) ? ' found' : '');
      this.dotsContainer.appendChild(dot);
    }
    const remaining = this.scene.totalDifferences - this.found.size;
    this.counterEl.textContent = remaining > 0 ? `${remaining} to find` : 'Scene Complete!';

    if (remaining === 0) {
      setTimeout(() => {
        if (this.sceneIndex < CONFIG.scenes.length - 1) {
          this.sceneIndex++;
          this.found.clear();
          this.updateHeader();
          this.buildDots();
          this.render();
        }
      }, 1200);
    }
  }

  bindEvents() {
    const handleClick = (e, isRight) => {
      const rect = e.target.getBoundingClientRect();
      const clickX = ((e.clientX - rect.left) / rect.width) * this.width;
      const clickY = ((e.clientY - rect.top) / rect.height) * this.height;

      for (const diff of this.scene.differences) {
        if (this.found.has(diff.id)) continue;
        const dist = Math.hypot(clickX - diff.x, clickY - diff.y);
        if (dist <= diff.r * 1.5) {
          this.found.add(diff.id);
          this.buildDots();
          this.render();
          break;
        }
      }
    };

    this.cvsLeft.addEventListener('click', (e) => handleClick(e, false));
    this.cvsRight.addEventListener('click', (e) => handleClick(e, true));

    if (this.hintBtn) {
      this.hintBtn.addEventListener('click', () => {
        if (this.hintsLeft <= 0) return;
        const unfound = this.scene.differences.find(d => !this.found.has(d.id));
        if (unfound) {
          this.found.add(unfound.id);
          this.hintsLeft--;
          this.hintBtn.textContent = `Hint (${this.hintsLeft})`;
          this.buildDots();
          this.render();
        }
      });
    }
  }

  render() {
    renderScene(this.ctxLeft, this.scene.id, this.width, this.height, false);
    renderScene(this.ctxRight, this.scene.id, this.width, this.height, true);

    for (const diff of this.scene.differences) {
      if (this.found.has(diff.id)) {
        this.drawMarker(this.ctxLeft, diff.x, diff.y, '#eab308');
        this.drawMarker(this.ctxRight, diff.x, diff.y, '#10b981');
      }
    }
  }

  drawMarker(ctx, x, y, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.stroke();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new GameController();
});
