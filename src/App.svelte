<script lang="ts">
  import { jwt } from './lib/stores';
  import Login from './lib/Login.svelte';
  import Register from './lib/Register.svelte';
  import Profile from './lib/Profile.svelte';
  import Home from './lib/Home.svelte';

  let currentPath = window.location.hash || '#home';

  window.addEventListener('hashchange', () => {
    currentPath = window.location.hash;
  });

  function logout() {
    $jwt = null;
    currentPath = '#home';
    window.location.hash = '#home';
  }
</script>

<main class="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
  <div class="w-full max-w-md">
    {#if $jwt}
      {#if currentPath === '#profile'}
        <Profile />
      {:else if currentPath === '#home'}
        <Home />
      {:else}
        <Home />
      {/if}
    {:else}
      {#if currentPath === '#register'}
        <Register />
      {:else if currentPath === '#login'}
        <Login />
      {:else if currentPath === '#home'}
        <Home />
      {:else}
        <Home />
      {/if}
    {/if}
  </div>
    <nav class="navbar">
      <ul>
        <li>
          <button
            class="nav-btn {currentPath === '#home' ? 'active' : ''}"
            on:click={() => { window.location.hash = '#home'; }}
          >Home</button>
        </li>
        {#if $jwt}
          <li>
            <button
              class="nav-btn {currentPath === '#profile' ? 'active' : ''}"
              on:click={() => { window.location.hash = '#profile'; }}
            >Profile</button>
          </li>
          <li><button on:click={logout} class="nav-btn logout">Logout</button></li>
        {:else}
          <li>
            <button
              class="nav-btn {currentPath === '#login' || currentPath === '' ? 'active' : ''}"
              on:click={() => { window.location.hash = '#login'; }}
            >Login</button>
          </li>
          <li>
            <button
              class="nav-btn {currentPath === '#register' ? 'active' : ''}"
              on:click={() => { window.location.hash = '#register'; }}
            >Register</button>
          </li>
        {/if}
      </ul>
    </nav>
</main>

<style>
  .navbar {
    background: #1b1b1b;
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    margin-bottom: 2rem;
  }
  .navbar ul {
    display: flex;
    gap: 0.75rem;
    list-style: none;
    margin: 0;
    padding: 0;
    justify-content: center;
  }
  .navbar li {
    display: flex;
    align-items: center;
  }
  .nav-btn {
    color: #fff;
    background: none;
    border: none;
    font-weight: 500;
    padding: 0.6rem 1.2rem;
    border-radius: 4px;
    transition: background 0.2s, color 0.2s;
    font-size: 1.1rem;
    width: 125px;
    display: inline-flex;
    justify-content: center;
    cursor: pointer;
    text-decoration: none;
  }
  .nav-btn.active,
  .nav-btn:hover {
    background: #444;
    color: white;
  }
  .nav-btn.logout:hover {
    background-color: #c53030;
    color: white;
  }
  
  :global(.auth-form input) {
    display: block;
    padding: 0.75rem;
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
    width: 100%;
    padding: 0.75em;
    font-size: 0.9rem;
    box-sizing: border-box;
    border-radius: 8px;
    border: 1px solid #333;
    background: #2c2c2c;
    color: #eee;
    margin-bottom: 0.75rem;
  }
  :global(.auth-form input:focus) {
    border-color: #00bcd4;
    box-shadow: 0 0 0 2px rgba(0,188,212,0.2);
    background: #464646;
  }
  :global(.auth-form button) {
    display: block;
    padding: 0.75rem;
    margin-bottom: 0.5rem;
    width: 100%;
    background: rgb(22, 22, 22);
  }
</style>