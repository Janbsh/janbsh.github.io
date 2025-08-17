<script lang="ts">
  import { jwt } from './stores';

  let email = '';
  let password = '';
  let message = '';
  let isError = false;

  async function handleLogin() {
    isError = false;
    message = 'Logging in...';
    
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP Error: ${response.status}`);
      }

      $jwt = data.token;
      message = 'Login successful!';

    } catch (err) {
      isError = true;
      message = typeof err === 'object' && err !== null && 'message' in err ? (err as { message: string }).message : String(err);
      $jwt = null;
    }
  }
</script>

<div class="account-card">
  <h2>Login</h2>
  <form on:submit|preventDefault={handleLogin}>
    <div class="info-row">
      <div class="info-label">Email address</div>
      <input type="email" bind:value={email} required class="info-value" />
    </div>
    <div class="info-row">
      <div class="info-label">Password</div>
      <input type="password" bind:value={password} required class="info-value" />
    </div>
    <button type="submit" class="w-full info-value" style="margin-top:1rem;">Login</button>
  </form>
  {#if message}
    <div class="info-row">
      <p class="info-label" class:text-red-400={isError} class:text-green-400={!isError}>{message}</p>
    </div>
  {/if}
</div>

<style>
  .account-card {
    max-width: 420px;
    margin: 1rem auto;
    background: #1b1b1b;
    border-radius: 14px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.18);
    padding: 0.5rem 2rem 1.5rem 2rem;
    color: #fff;
  }
  .account-card h2 {
    font-size: 1.35rem;
    margin-bottom: 1.7rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    border-bottom: 2px solid #232326;
    padding-bottom: 0.7rem;
    color: #ffffff;
  }
  .info-row {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.3rem;
  }
  .info-label {
    font-size: 1rem;
    color: #a1a1aa;
    margin-bottom: 0.35rem;
    text-align: left;
    font-weight: 500;
  }
  .info-value {
    display: block;
    padding: 0.75rem;
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
    width: 100%;
    font-size: 1rem;
    box-sizing: border-box;
    border-radius: 8px;
    border: 1px solid #333;
    background: #2c2c2c;
    color: #eee;
    margin-bottom: 0.35rem;
  }
  .info-value[type="submit"], button.info-value {
    background: #9963f1;
    color: #fff;
    font-weight: 600;
    text-align: center;
    cursor: pointer;
    transition: background 0.2s;
    border: none;
  }
  .info-value[type="submit"]:hover, button.info-value:hover {
    background: #9046e5;
  }
  .text-red-400 {
    color: #f87171;
    text-align: center;
  }
  .text-green-400 {
    color: #34d399;
    text-align: center;
  }
</style>