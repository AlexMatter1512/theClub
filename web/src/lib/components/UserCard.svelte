<script lang="ts">
  import type { User } from "$lib/models";
  import { onMount } from "svelte";

  export let user: User = {
    id: "string",
    username: "string",
    email: "string",
    name: "string",
    surname: "string",
    password: "string",
    createdAt: "string",
    updatedAt: "string",
    avatar: "string",
    verified: false,
    owner: false
  };

  // Export button title and function
  export let buttonTitle: string | null = null; // If null, no button will appear
  export let onButtonClick: () => void = () => console.log(`${user.username} button clicked`);

  if (user.avatar === "") {
    user.avatar = "/avatar.png";
  }

  $: border = user.verified ? "border-green-500" : "border-red-500";

  // Format date for better readability
  const formatDate = (date: string) => new Date(date).toLocaleDateString("it-IT", {
    year: "numeric", 
    month: "long", 
    day: "numeric"
  });

  // Concatenate name and surname
  $: fullName = `${user.name} ${user.surname}`.trim() || 'N/A';
</script>

<div class={`bg-base-200 rounded-lg shadow-lg p-4 flex flex-col items-center ${border} border-2 w-full max-w-md`}>
  <div class="p-4 flex-shrink-0">
    <img class="h-64 w-64 rounded-2xl object-cover"
      src={user.avatar}
      alt="{user.username}'s avatar" />
  </div>

  <div class="flex flex-col justify-center p-4 flex-grow">
    <h2 class="text-2xl font-bold flex items-center gap-2 mb-4">
      {user.username}
      {#if !user.verified}
        <span class="text-sm px-2 py-1 bg-red-500 text-white rounded-md">Not Verified</span>
      {:else}
        <span class="text-sm px-2 py-1 bg-green-500 text-white rounded-md">Verified</span>
      {/if}
    </h2>

    <p class="text-base text-gray-700 mb-2">
      <b>Full Name:</b> {fullName}
    </p>

    <p class="text-base text-gray-700 mb-2">
      <b>Email:</b> {user.email}
    </p>

    <div class="text-base text-gray-700 space-y-2">
      <p><b>Account Created:</b> {formatDate(user.createdAt)}</p>
      <p><b>Last Updated:</b> {formatDate(user.updatedAt)}</p>
    </div>

    {#if user.owner}
      <div class="mt-4 inline-block text-sm px-2 py-1 bg-blue-500 text-white rounded-md max-w-min">Owner</div>
    {/if}

    <!-- Conditionally render the button only if buttonTitle is provided -->
    {#if buttonTitle}
      <button 
        class="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        on:click={onButtonClick}
      >
        {buttonTitle}
      </button>
    {/if}
  </div>
</div>