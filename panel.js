/* ===== 面板/卡片展开收起 ===== */
function panelToggle(el){
  el.closest('.P-panel').classList.toggle('open');
}

function cardToggle(el){
  el.closest('.C-card').classList.toggle('expanded');
}

/* ===== 模式B 卡片一次性选择（盲盒 + 下一周期选择 共用） ===== */
function cardSelect(el){
  var panel = el.closest('.P-panel');
  if(panel.dataset.selected) return;
  panel.dataset.selected = 'true';
  el.classList.add('picked');
  var icon = el.querySelector('.S-icon');
  if(icon && icon.textContent === '?') icon.textContent = '\u2726';
  panel.querySelectorAll('.S-card').forEach(function(c){
    if(c !== el) c.classList.add('dimmed');
  });
  var prompt = el.dataset.prompt;
  if(prompt) sendPrompt(prompt);
}

/* ===== 书签切换（双按钮场景）===== */
function bookmarkToggle(e, btn){
  e.stopPropagation();
  var card = btn.closest('.C-card');
  var kp = card.dataset.kp;
  var name = card.dataset.name;
  if(btn.classList.contains('on')){
    btn.classList.remove('on');
    btn.querySelector('i').className = 'ti ti-bookmark';
    btn.querySelector('span').textContent = 'Save for later';
    sendPrompt('🔖❌ ' + kp);
  } else {
    btn.classList.add('on');
    btn.querySelector('i').className = 'ti ti-check';
    btn.querySelector('span').textContent = 'Bookmarked';
    sendPrompt('🔖 ' + kp + ' ' + name);
  }
}

/* ===== Learn more 一次性 ===== */
function learnClick(e, btn){
  e.stopPropagation();
  if(btn.classList.contains('off')) return;
  btn.classList.add('off');
  btn.querySelector('i').className = 'ti ti-check';
  btn.querySelector('span').textContent = 'Already explored';
  var card = btn.closest('.C-card');
  var prompt = card.dataset.prompt || ('I want to learn more about ' + card.dataset.kp + ' ' + card.dataset.name + ' — tell me a bit about it!');
  sendPrompt(prompt);
}
