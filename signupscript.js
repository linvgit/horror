const supabaseUrl = 'https://mzbmsogrmpoyxsbtwuta.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16Ym1zb2dybXBveXhzYnR3dXRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2OTU5NTksImV4cCI6MjA2NjI3MTk1OX0.I9ur4lxbxxYhzqZf0LvcdKpp2FaImOytzhR_xKxW9KM'; // (κόψε το αν το δείχνεις δημόσια)
const sb = supabase.createClient(supabaseUrl, supabaseKey);



document.getElementById('signup-button').addEventListener('click', async () => {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!email || !password) {
    alert('Συμπλήρωσε όλα τα πεδία!');
    return;
  }

  const { data, error } = await sb.auth.signUp({ email, password });

  if (error) {
    alert('❌ Σφάλμα εγγραφής: ' + error.message);
    return;
  }

  alert('✅ Εγγραφή επιτυχής! Έλεγξε το email σου για επιβεβαίωση.');
  window.location.href = 'index.html';
});
