function loginUser() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const alertBox = document.getElementById('loginAlert');

  if (username === '' || password === '') {
    alertBox.innerHTML = '<div class="alert alert-danger">Please enter both username and password.</div>';
    return;
  }

  window.location.href = 'home.html';
}

function toggleFriendSelection() {
  const mode = document.getElementById('shareMode').value;
  const box = document.getElementById('friendSelection');

  if (mode === 'selected') {
    box.classList.remove('d-none');
  } else {
    box.classList.add('d-none');
  }
}

function shareNews() {
  const textBox = document.getElementById('newsText');
  const news = textBox.value.trim();

  if (news === '') {
    alert('Please write something before sharing.');
    return;
  }

  const newPost = document.createElement('div');
  newPost.className = 'card soft-card feed-card p-4 mb-3';
  newPost.innerHTML = `
    <div class="d-flex align-items-center gap-3">
      <div class="avatar avatar-plum">W</div>
      <div><h6 class="mb-0 fw-bold">Warda</h6><small class="text-secondary">Just now · Islamabad</small></div>
    </div>
    <p class="mt-3 mb-3">${news}</p>
    <div class="d-flex gap-2">
      <button class="btn btn-soft btn-sm" onclick="reactPost(this,'like')">Like <span>0</span></button>
      <button class="btn btn-soft btn-sm" onclick="reactPost(this,'dislike')">Dislike <span>0</span></button>
    </div>`;

  document.getElementById('feedContainer').prepend(newPost);
  textBox.value = '';
}

function reactPost(button, type) {
  const countSpan = button.querySelector('span');
  let count = parseInt(countSpan.textContent);
  count++;
  countSpan.textContent = count;

  if (type === 'like') {
    button.innerHTML = `Liked <span>${count}</span>`;
  } else {
    button.innerHTML = `Disliked <span>${count}</span>`;
  }
}

function sendInvite(button, personName, isIgnored) {
  if (isIgnored) {
    alert('Friend request cannot be sent because this person has placed you in the ignore list.');
    return;
  }

  button.textContent = 'Requested';
  button.disabled = true;
  alert('Friend request sent to ' + personName + '.');
}

function rateFriend(friendName, rating) {
  alert(friendName + ' rated as ' + rating + '.');
}

function selectContact(clickedContact, name, initials, colorName) {
  const allContacts = document.querySelectorAll('.contact');
  allContacts.forEach(function(contact) {
    contact.classList.remove('active');
  });

  clickedContact.classList.add('active');
  document.getElementById('chatTitle').textContent = name;

  const avatar = document.getElementById('chatAvatar');
  avatar.textContent = initials;
  avatar.className = 'avatar avatar-' + colorName;

  const chatBox = document.getElementById('chatBox');
  chatBox.innerHTML = '<div class="text-center text-secondary small mt-5">Conversation opened with ' + name + '.</div>';
}

function sendMessage() {
  const input = document.getElementById('messageInput');
  const text = input.value.trim();
  const alertBox = document.getElementById('messageAlert');

  if (text === '') {
    alertBox.innerHTML = '<div class="alert alert-warning py-2">Please type a message first.</div>';
    return;
  }

  alertBox.innerHTML = '';

  const bubble = document.createElement('div');
  bubble.className = 'bubble sent';
  bubble.textContent = text;

  const chatBox = document.getElementById('chatBox');
  chatBox.appendChild(bubble);
  chatBox.scrollTop = chatBox.scrollHeight;

  input.value = '';
  input.focus();
}

function sendOnEnter(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}
