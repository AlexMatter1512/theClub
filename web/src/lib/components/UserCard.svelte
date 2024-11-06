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
    created: "string",
    updated: "string",
    avatar: "string",
    verified: false,
    owner: false
  };

  // Export button title and function
  // export let buttonTitle: string | null = null; // If null, no button will appear
  // export let onButtonClick: () => void = () => console.log(`${user.username} button clicked`);

  type button = {
    title: string;
    action: () => void;
  };

  export let buttons: button[] = [];

  if (user.avatar === "") {
    user.avatar = "/avatar.png";
  }
  $: buttonState = "";
  $: border = user.owner ? "border-yellow-500" : (user.verified ? "border-green-500" : "border-red-500");

  // Format date for better readability
  const formatDate = (date: string) => new Date(date).toLocaleDateString("it-IT", {
    year: "numeric", 
    month: "long", 
    day: "numeric"
  });

  // Concatenate name and surname
  $: fullName = `${user.name} ${user.surname}`.trim() || 'N/A';
</script>

<div class={`bg-base-200 rounded-xl shadow-lg p-4 flex flex-col items-center ${border} border-2 w-full max-w-md`}>
  <div class="p-4 flex-shrink-0">
    <img class="h-64 w-64 rounded-2xl object-cover"
      src={user.avatar}
      alt="{user.username}'s avatar" />
  </div>

  <div class="flex flex-col justify-center p-4 flex-grow">
    <h2 class="text-2xl font-bold flex items-center gap-2 mb-4">
      {fullName}
      {#if !user.verified}
        <span class="text-sm px-2 py-1 bg-red-500 text-white rounded-md">Not Verified</span>
      {:else}
        {#if user.owner}
          <span class="text-sm px-2 py-1 bg-yellow-500 text-white rounded-md">Owner</span>
        {:else}
          <span class="text-sm px-2 py-1 bg-green-500 text-white rounded-md">Staff</span>
        {/if}
      {/if}
    </h2>

    <p class="text-base mb-2">
      <b>Email:</b> {user.email}
    </p>

    <div class="text-base space-y-2">
      <p><b>Account Created:</b> {formatDate(user.created)}</p>
    </div>

    <!-- Conditionally render the buttons if buttonTitle provided -->
    {#if buttons.length > 0}
      <div class="flex justify-center gap-4 mt-4">
        {#each buttons as { title, action }}
          <button 
            class="btn btn-primary {buttonState} font-semibold rounded-md"
            on:click={() => {
              action();
              buttonState = "btn-disabled";
            }}
          >
            {title}
          </button>
        {/each}
      </div>
    {/if}
  </div>
</div>