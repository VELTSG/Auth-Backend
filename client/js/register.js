document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const res = await fetch('http://localhost:5000/api/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await res.json();
  const msg = document.getElementById('registerMessage');
  if (res.ok) {
    msg.style.color = '#43a047';
    msg.textContent = 'Registration successful! Redirecting...';
    setTimeout(() => window.location.href = '/home', 1000);
  } else {
    msg.style.color = '#e53935';
    msg.textContent = data.message || 'Registration failed.';
  }
});
