import valuationsHtml from '../valuations-fragment.html?raw';
import { useEffect, useRef } from 'react';

function upgradeAiTool(root) {
  if (!root) return;
  const triggers = root.querySelectorAll('button.ai-btn[data-ai-tool="trigger"]');
  triggers.forEach((btn) => {
    if (btn.dataset.aiUpgraded === 'true') return;
    btn.dataset.aiUpgraded = 'true';

    btn.addEventListener('click', () => {
      const triggerImg = btn.getAttribute('data-ai-trigger-img');
      const inputImg = btn.getAttribute('data-ai-input-img');

      const wrap = document.createElement('div');
      wrap.className = 'ai-input';
      wrap.setAttribute('aria-label', 'AI prompt');

      const icon = document.createElement('img');
      icon.className = 'ai-input-icon';
      if (inputImg) icon.src = inputImg;
      icon.alt = '';
      icon.setAttribute('aria-hidden', 'true');

      const input = document.createElement('input');
      input.className = 'ai-input-text';
      input.placeholder = 'How can I help you?';

      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'ai-input-chip';
      chip.setAttribute('aria-label', 'Hint');
      const chipText = document.createElement('span');
      chipText.className = 'ai-input-chip-text';
      chipText.textContent = 'Hit Return';
      chip.appendChild(chipText);

      wrap.appendChild(icon);
      wrap.appendChild(input);
      wrap.appendChild(chip);

      btn.replaceWith(wrap);
      input.focus();
    });
  });
}

export function ValuationsPanel() {
  const rootRef = useRef(null);

  useEffect(() => {
    upgradeAiTool(rootRef.current);
  }, []);

  return (
    <div
      ref={rootRef}
      className="sec-panel"
      id="sec-panel-valuations"
      role="tabpanel"
      dangerouslySetInnerHTML={{ __html: valuationsHtml }}
    />
  );
}
