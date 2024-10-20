<script lang="ts">
  import { ListaItem } from "$lib/components";
  export let data;

  let searchQuery = "";

  // Filtered list based on search query
  $: filteredListe = data.liste.filter(
    (lista) =>
      lista.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lista.nome_pr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lista.descrizione?.toLowerCase().includes(searchQuery.toLowerCase()),
  );
</script>

<div class="hero">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">
        <p>Liste</p>
      </h1>
    </div>
  </div>
</div>

<div class="flex justify-center w-full">
  <div class="flex flex-col gap-4 items-center w-full max-w-md">
    <!-- "Nuova Lista" button -->
    <div class="w-full justify-end hidden md:flex">
      <a href="./liste/new" class="btn btn-primary">Nuova Lista</a>
    </div>

    <!-- Search input -->
    <input
      type="text"
      placeholder="Cerca..."
      bind:value={searchQuery}
      class="input input-bordered w-full max-w-md"
    />

    <!-- Filtered results -->
    {#each filteredListe as lista}
      <div class="w-full max-w-md">
        <ListaItem {lista} />
      </div>
    {/each}
  </div>
</div>

<!-- Floating button for mobile -->
<a
  href="./liste/new"
  class="md:hidden btn btn-primary btn-circle fixed bottom-4 right-4 shadow-lg"
  aria-label="Create new list"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    class="w-6 h-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M12 4v16m8-8H4"
    />
  </svg>
</a>
