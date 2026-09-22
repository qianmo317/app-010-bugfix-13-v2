import { router } from '../router';
import { createElement, clearElement } from '../utils/dom';
import { getAllFarmTips } from '../almanac/farm';


export function renderFarm(app: HTMLElement) {
  clearElement(app);
  app.className = 'page farm-page';

  // 头部
  const header = createElement('div', 'page-header');
  const backBtn = createElement('button', 'back-btn', '◀ 返回');
  backBtn.addEventListener('click', () => router.navigate('/'));
  const title = createElement('h1', 'page-title', '节气农事表');
  header.append(backBtn, title);

  // 节气列表
  const termList = createElement('div', 'term-list');
  const tips = getAllFarmTips();

  for (const tip of tips) {
    const card = createElement('div', 'term-card');
    const head = createElement('div', 'term-header');
    head.innerHTML = `<span class="term-name">${tip.term}</span>` +
      `<span class="term-hou">${tip.hou}</span>`;
    const taskRow = createElement('div', 'term-tasks');
    taskRow.innerHTML = tip.tasks.map(t => `<span class="task-tag">${t}</span>`).join('');
    card.append(head, taskRow);
    termList.appendChild(card);
  }

  // 月份索引
  const monthIndex = createElement('div', 'month-index');
  for (let m = 1; m <= 12; m++) {
    const monthBtn = createElement('button', 'month-btn', `${m}月`);
    monthBtn.dataset.month = String(m);
    monthBtn.addEventListener('click', () => {
      // 每月两个节气，m 月第一张卡的索引为 (m - 1) * 2
      const target = termList.children[(m - 1) * 2];
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
    monthIndex.appendChild(monthBtn);
  }

  app.append(header, monthIndex, termList);
}
