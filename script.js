const expressionEl = document.getElementById('expression');
const resultEl = document.getElementById('result');
const datetimeEl = document.getElementById('datetime');
const keys = document.querySelector('.keys');

let expression = '0';
let justEvaluated = false;

const updateClock = () => {
  const now = new Date();
  const formatted = now.toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit'
  });
  datetimeEl.textContent = formatted;
};

const sanitizeExpression = (value) => value.replace(/×/g, '*').replace(/÷/g, '/');

const formatResult = (value) => {
  if (!Number.isFinite(value)) {
    return 'Error';
  }

  const rounded = Math.round((value + Number.EPSILON) * 1e12) / 1e12;
  return rounded.toString();
};

const evaluateExpression = () => {
  try {
    const sanitized = sanitizeExpression(expression);
    const computed = Function(`"use strict"; return (${sanitized});`)();
    return formatResult(Number(computed));
  } catch {
    return 'Error';
  }
};

const render = () => {
  expressionEl.textContent = expression;
  resultEl.textContent = evaluateExpression();
};

const appendValue = (value) => {
  if (justEvaluated && /\d|\./.test(value)) {
    expression = '0';
  }

  justEvaluated = false;

  if (expression === '0' && value !== '.') {
    expression = value;
    return;
  }

  const lastChunk = expression.split(/[+\-*/%]/).pop();
  if (value === '.' && lastChunk.includes('.')) {
    return;
  }

  expression += value;
};

const deleteLast = () => {
  if (justEvaluated) {
    expression = '0';
    justEvaluated = false;
    return;
  }

  expression = expression.length > 1 ? expression.slice(0, -1) : '0';
};

const toggleSign = () => {
  if (expression === '0') {
    return;
  }

  const parts = expression.match(/(.*?)(-?\d*\.?\d+)$/);
  if (!parts) {
    return;
  }

  const [, prefix, number] = parts;
  const toggled = number.startsWith('-') ? number.slice(1) : `-${number}`;
  expression = `${prefix}${toggled}`;
};

const onKeyClick = (event) => {
  const button = event.target.closest('button');
  if (!button) {
    return;
  }

  const { action, value } = button.dataset;

  switch (action) {
    case 'clear':
      expression = '0';
      justEvaluated = false;
      break;
    case 'delete':
      deleteLast();
      break;
    case 'sign':
      toggleSign();
      break;
    case 'equals': {
      const value = evaluateExpression();
      expression = value === 'Error' ? '0' : value;
      justEvaluated = true;
      break;
    }
    default:
      if (value) {
        appendValue(value);
      }
  }

  render();
};

keys.addEventListener('click', onKeyClick);
updateClock();
setInterval(updateClock, 1000);
render();
