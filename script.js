// ✅ Import Supabase από CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// 🔧 Supabase config
const supabaseUrl = 'https://mzbmsogrmpoyxsbtwuta.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16Ym1zb2dybXBveXhzYnR3dXRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2OTU5NTksImV4cCI6MjA2NjI3MTk1OX0.I9ur4lxbxxYhzqZf0LvcdKpp2FaImOytzhR_xKxW9KM'; // βάλε το full key
const sb = createClient(supabaseUrl, supabaseKey);

// 🔐 Σύνδεση
async function login() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!email || !password) {
    alert('Συμπλήρωσε όλα τα πεδία!');
    return;
  }

  const { data, error } = await sb.auth.signInWithPassword({ email, password });

  if (error) {
    alert('❌ Σφάλμα σύνδεσης: ' + error.message);
    return;
  }
    alert('✅ Επιτυχής σύνδεση!');
  showStoryForUser(data.user);

}

// Εμφάνιση ιστορίας
function showStoryForUser(user) {
  document.getElementById('auth-container').style.display = 'none';
  document.getElementById('story-container').style.display = 'block';
  loadStory();
}

// Φόρτωση αρχείου ιστορίας
async function loadStory() {
  const res = await fetch('stories/story1.json');
  const storyData = await res.json();

  document.getElementById('story-title').textContent = storyData.title;
  showChapter(storyData, "1");
}

// Εναλλαγή κεφαλαίων
function showChapter(storyData, chapterKey) {
  const chapter = storyData.chapters[chapterKey];
  document.getElementById('story-text').textContent = chapter.text;

  const choicesDiv = document.getElementById('choices');
  choicesDiv.innerHTML = '';

  if (chapter.options) {
    Object.entries(chapter.options).forEach(([key, option]) => {
      const btn = document.createElement('button');
      btn.textContent = `${key}) ${option.text}`;
      btn.onclick = () => showChapter(storyData, option.next);
      choicesDiv.appendChild(btn);
    });
  } else {
    const endMsg = document.createElement('p');
    endMsg.textContent = 'Τέλος ιστορίας.';
    choicesDiv.appendChild(endMsg);
  }
}

// Logout
window.logout = function logout() {
  document.getElementById('auth-container').style.display = 'block';
  document.getElementById('story-container').style.display = 'none';
};

// 🔁 Event listener αφού φορτώσει το DOM
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('login-button').addEventListener('click', login);
});
