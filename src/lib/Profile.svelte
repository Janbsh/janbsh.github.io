<script lang="ts">
  import { onMount } from 'svelte';
  import { jwt } from './stores';

  interface UserProfile {
    username: string;
    email: string;
    phone: string;
  }

  let userProfile: UserProfile | null = null;
  let errorMessage = '';
  let deleteMessage = '';
  let isDeleting = false;

  onMount(async () => {
    try {
      const response = await fetch('http://localhost:8080/api/profile', {
        headers: {
          'Authorization': `Bearer ${$jwt}`
        }
      });
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data || 'Failed to fetch profile.');
      }
      
      userProfile = data;

    } catch (err) {
      if (err instanceof Error) {
        errorMessage = err.message;
        if (err.message.includes('Invalid token')) {
            $jwt = null;
        }
      } else {
        errorMessage = String(err);
      }
      userProfile = null;
    }
  });

  async function handleDeleteAccount() {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    isDeleting = true;
    deleteMessage = '';

    try {
      const response = await fetch('http://localhost:8080/api/profile', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${$jwt}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data || 'Failed to delete account.');
      }

      deleteMessage = 'Account deleted successfully. You have been logged out.';
      $jwt = null; 
      userProfile = null;

    } catch (err) {
       if (err instanceof Error) {
        deleteMessage = `Error: ${err.message}`;
      } else {
        deleteMessage = 'An unknown error occurred.';
      }
    } finally {
      isDeleting = false;
    }
  }
</script>

<div class="account-card">
  <h2>Account</h2>
  {#if userProfile}
    <div class="info-row">
      <div class="info-label">Display name:</div>
      <div class="info-value">{userProfile.username}</div>
    </div>
    <div class="info-row">
      <div class="info-label">Email address:</div>
      <div class="info-value">{userProfile.email}</div>
    </div>
      {#if userProfile.phone}
        <div class="info-row">
          <div class="info-label">Phone number:</div>
          <div class="info-value">{userProfile.phone}</div>
        </div>
      {/if}
    <div class="info-row">
      <button on:click={handleDeleteAccount} disabled={isDeleting} class="delete-button">
        {isDeleting ? 'Deleting...' : 'Delete Account'}
      </button>
      {#if deleteMessage}
        <p class="feedback-message">{deleteMessage}</p>
      {/if}
    </div>

  {:else if errorMessage}
    <div class="error-card">
      <p class="error-title">Error loading profile:</p>
      <p>{errorMessage}</p>
    </div>
  {:else}
    <p class="loading-text">Loading profile...</p>
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
    text-align: left;
  }

  .delete-button {
    display: block;
    padding: 0.75rem;
    width: 100%;
    font-size: 1rem;
    box-sizing: border-box;
    border-radius: 8px;
    font-weight: 600;
    text-align: center;
    cursor: pointer;
    transition: background 0.2s;
    border: none;

    background: #e53e3e; 
    color: #fff;
  }

  .delete-button:hover {
    background: #c53030;
  }

  .delete-button:disabled {
    background: #555;
    cursor: not-allowed;
    opacity: 0.7;
  }

  .feedback-message {
    text-align: center;
    margin-top: 1rem;
    color: #a1a1aa;
  }
</style>