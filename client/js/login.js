document.getElementById('loginForm').addEventListener('submit', async (e) => {
    // DOMMANUPULATION
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const res = await fetch('http://localhost:5000/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  const msg = document.getElementById('loginMessage');
  if (res.ok) {
    msg.style.color = '#43a047';
    msg.textContent = 'Login successful! Redirecting...';
    setTimeout(() => window.location.href = '/home', 1000);
  } else {
    msg.style.color = '#e53935';
    msg.textContent = data.message || 'Login failed.';
  }
});
