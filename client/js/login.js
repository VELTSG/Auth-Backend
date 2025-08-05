document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const msg = document.getElementById('loginMessage');
  const spinner = document.getElementById('loginSpinner');

  msg.textContent = '';
  spinner.style.display = 'inline-block'; // Show spinner

  try {
    const res = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    spinner.style.display = 'none'; // Hide spinner

    if (res.ok) {
      msg.style.color = '#43a047';
      msg.textContent = 'Login successful! Redirecting...';
      setTimeout(() => window.location.href = '/dashboard.html', 1000);
    } else {
      msg.style.color = '#e53935';
      msg.textContent = data.message || 'Login failed.';
    }
  } catch (err) {
    spinner.style.display = 'none';
    msg.style.color = '#e53935';
    msg.textContent = 'Network error. Try again.';
  }
});
