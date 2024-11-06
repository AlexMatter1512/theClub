<script lang="ts">
  import UserCard from "$lib/components/UserCard.svelte";
  import { writable } from "svelte/store";
  import { json } from "@sveltejs/kit";
  import { page } from "$app/stores";

  export let data;

  // Search input state
  let searchQuery = "";

  // Filter the users based on their status
  let owners = data.users.filter((u) => u.owner);
  let verified = data.users.filter((u) => u.verified && !u.owner);
  let unverified = data.users.filter((u) => !u.verified && !u.owner);

  // Function to filter users based on the search query
  $: filteredOwners = owners.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${user.name} ${user.surname}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  $: filteredVerified = verified.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${user.name} ${user.surname}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  $: filteredUnverified = unverified.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${user.name} ${user.surname}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Function to handle user actions
  const handleUserAction = async (userId: string, endpoint: string, method: string, body: object) => {
    try {
      // Call your backend API
      const response = await fetch(`${$page.url}/api/${endpoint}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      if (result.status === "success") {
        // reload the page to reflect the changes
        window.location.reload();
      } else {
        console.error(`${endpoint} action failed`, result);
      }
    } catch (error) {
      console.error(`Error during ${endpoint} action:`, error);
    }
  };

  const verifyUser = (userId: string, verify: boolean) => {
    handleUserAction(userId, "verify", "POST", { id: userId, verify: verify });
  };

  const deleteUser = (userId: string) => {
    handleUserAction(userId, "delete", "DELETE", { id: userId });
  };

  const makeOwner = (userId: string) => {
    handleUserAction(userId, "owner", "POST", { id: userId, ownerstatus: true });
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
      <h3 class="text-lg font-normal text-gray-500 mb-4">
        Possono modificare eventi e liste e verificare gli ingressi
      </h3>
      <div class="flex justify-around flex-wrap gap-4">
        {#each filteredOwners as user}
          <UserCard {user} />
        {/each}
      </div>
    </section>
  {/if}

  {#if filteredVerified.length > 0}
    <section class="mb-8">
      <h2 class="text-3xl font-bold mb-4">Verified Users (Staff)</h2>
      <h3 class="text-lg font-normal text-gray-500 mb-4">
        Possono solo verificare gli ingressi
      </h3>
      <div class="flex justify-around flex-wrap gap-4">
        {#each filteredVerified as user}
          <!-- <UserCard user={user} onButtonClick={() => verifyUser(user.id, false)} buttonTitle={"Sospendi Utente"} /> -->
          <UserCard
            {user}
            buttons={[
              {
                title: "Sospendi Utente",
                action: () => verifyUser(user.id, false),
              },
              {
                title: "Rendi Owner",
                action: () => makeOwner(user.id),
              },
            ]}
          />
        {/each}
      </div>
    </section>
  {/if}

  {#if filteredUnverified.length > 0}
    <section>
      <h2 class="text-3xl font-bold mb-4">Unverified Users</h2>
      <h3 class="text-lg font-normal text-gray-500 mb-4">
        Devono essere verificati per poter accedere ai permessi dello staff
      </h3>
      <div class="flex justify-around flex-wrap gap-4">
        {#each filteredUnverified as user}
          <!-- Pass the verifyUser function as a prop to unverified UserCards -->
          <!-- <UserCard user={user} onButtonClick={() => verifyUser(user.id, true)} buttonTitle={"Verifica Utente"} /> -->
          <UserCard
            {user}
            buttons={[
              {
                title: "Verifica Utente",
                action: () => verifyUser(user.id, true),
              },
              {
                title: "Elimina Utente",
                action: () => deleteUser(user.id),
              },
            ]}
          />
        {/each}
      </div>
    </section>
  {/if}
</div>
