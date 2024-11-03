<script lang="ts">
  import UserCard from '$lib/components/UserCard.svelte';
  import { writable } from 'svelte/store';
  import { json } from '@sveltejs/kit';
  import { page } from '$app/stores';

  export let data;

  // Search input state
  let searchQuery = '';

  // Filter the users based on their status
  let owners = data.users.filter((u) => u.owner);
  let verified = data.users.filter((u) => u.verified && !u.owner);
  let unverified = data.users.filter((u) => !u.verified && !u.owner);

  // Function to filter users based on the search query
  $: filteredOwners = owners.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    `${user.name} ${user.surname}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  $: filteredVerified = verified.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    `${user.name} ${user.surname}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  $: filteredUnverified = unverified.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    `${user.name} ${user.surname}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to verify a user
  const verifyUser = async (userId: string, verify: boolean) => {
    try {
      // Call your backend API to verify the user
      const response = await fetch(`${$page.url}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id: userId, 
          verify: verify
        }),
      });

      const result = await response.json();
      if (result.status === 'success') {
        // reload the page to reflect the changes
        window.location.reload();
      } else {
        console.error('Verification failed', result);
      }
    } catch (error) {
      console.error('Error verifying user:', error);
    }
  };
</script>

<div class="hero">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">Utenti</h1>
    </div>
  </div>
</div>

<!-- Search Box -->
<div class="flex justify-center my-4">
  <input 
    type="text" 
    placeholder="Search by username, full name, or email" 
    bind:value={searchQuery}
    class="input input-bordered input-lg w-full max-w-md"
  />
</div>

<div class="container mx-auto p-4">
  {#if filteredOwners.length > 0}
    <section class="mb-8">
      <h2 class="text-3xl font-bold mb-4">Owners</h2>
      <h3 class="text-lg font-normal text-gray-500 mb-4">Possono modificare eventi e liste e verificare gli ingressi</h3>
      <div class="flex justify-around flex-wrap gap-4">
        {#each filteredOwners as user}
          <UserCard user={user} />
        {/each}
      </div>
    </section>
  {/if}

  {#if filteredVerified.length > 0}
    <section class="mb-8">
      <h2 class="text-3xl font-bold mb-4">Verified Users (Staff)</h2>
      <h3 class="text-lg font-normal text-gray-500 mb-4">Possono solo verificare gli ingressi</h3>
      <div class="flex justify-around flex-wrap gap-4">
        {#each filteredVerified as user}
          <UserCard user={user} onButtonClick={() => verifyUser(user.id, false)} buttonTitle={"Sospendi Utente"} />
        {/each}
      </div>
    </section>
  {/if}

  {#if filteredUnverified.length > 0}
    <section>
      <h2 class="text-3xl font-bold mb-4">Unverified Users</h2>
      <h3 class="text-lg font-normal text-gray-500 mb-4">Devono essere verificati per poter accedere ai permessi dello staff</h3>
      <div class="flex justify-around flex-wrap gap-4">
        {#each filteredUnverified as user}
          <!-- Pass the verifyUser function as a prop to unverified UserCards -->
          <UserCard user={user} onButtonClick={() => verifyUser(user.id, true)} buttonTitle={"Verifica Utente"} />
        {/each}
      </div>
    </section>
  {/if}
</div>