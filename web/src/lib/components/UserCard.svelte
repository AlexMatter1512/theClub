<script lang="ts">
    import type { User } from "$lib/models";
    import { onMount } from "svelte";

    export let user: User = {
      id: "string",
      username: "string",
      email: "string",
      name: "string",
      password: "string",
      createdAt: "string",
      updatedAt: "string",
      avatar: "string",
      verified: false,
      owner: false
    };

    let border = user.verified ? "border-green-500" : "border-red-500";
</script>

<div class="card bg-base-300 min-w-80 lg:card-side shadow-xl p-2">
    <figure>
      <img class="max-h-64 rounded-2xl"
        src={user.avatar}
        alt="eventImg" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{user.username}
        {#if !user.verified}
          <div class="badge badge-secondary">Not verified</div>
        {/if}
      </h2>
      <p><b>email: </b><br>{user.email}</p>
    </div>
  </div>