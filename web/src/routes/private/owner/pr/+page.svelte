<script lang="ts">
    import UserCard from '$lib/components/UserCard.svelte';
    export let data;

</script>

<div class="hero">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Utenti</h1>
      </div>
    </div>
</div>
<div class="flex justify-around flex-wrap gap-1">
    {#each data.users as user}
        <UserCard user={user} />
    {/each}
</div>