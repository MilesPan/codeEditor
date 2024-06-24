function genUserTooltip(cursorElement: Element, username: string) {
  if (cursorElement.querySelector('.username-tag')) return;
  const usernameTag = document.createElement('div');
  usernameTag.className = 'username-tag';
  usernameTag.innerText = username;
  // 样式调整
  const editorRect = document.querySelector('.monaco-editor')!.getBoundingClientRect();
  const cursorRect = cursorElement.getBoundingClientRect();
  if (cursorRect.top - editorRect.top < 20) {
    usernameTag.style.bottom = 'auto';
    usernameTag.style.top = '100%';
  } else {
    usernameTag.style.bottom = '100%';
    usernameTag.style.top = 'auto';
  }
  usernameTag.style.position = 'absolute';
  usernameTag.style.zIndex = '100';
  usernameTag.style.left = '0';
  usernameTag.style.backgroundColor = '#fff';
  usernameTag.style.color = '#000';
  usernameTag.style.padding = '2px 4px';
  usernameTag.style.border = '1px solid #ccc';
  usernameTag.style.borderRadius = '3px';
  usernameTag.style.whiteSpace = 'nowrap';
  usernameTag.dataset.aos = 'fade-in';
  cursorElement.appendChild(usernameTag);
}
