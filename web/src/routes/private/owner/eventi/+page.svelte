<script lang="ts">
  import EventCard from "$lib/components/EventCard.svelte";
  import Input from "$lib/components/Input.svelte";
  export let data;

  let eventi = data.eventi;
  let searchQuery = "";
  let searchDateGreater = "";
  let searchDateLess = "";

  // Filtered list based on search query and inizio date
  $: filteredEventi = eventi.filter(
    (evento) =>
      (evento.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evento.luogo.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (searchDateGreater === "" || new Date(evento.inizio) >= new Date(searchDateGreater)) &&
      (searchDateLess === "" || new Date(evento.inizio) <= new Date(searchDateLess + "T23:59:59"))
  );
</script>

<div class="hero relative">
  <div class="hero-content text-center">
    <div class="max-w-md mx-auto">
      <h1 class="text-5xl font-bold">Eventi</h1>
    </div>
  </div>

  <!-- Positioned button on the right side of the hero -->
  <a href="/private/owner/eventi/new" class="btn btn-primary absolute right-4 hidden md:flex">
      Nuovo Evento
  </a>
</div>

<div class="flex flex-col gap-4 items-center w-full my-4">
  <!-- Search input and date filters -->
   <div class="w-full max-w-md">
     <!-- Search by nome or luogo -->
     <Input
       type="text"
       id="search"
       label="Cerca"
       errors=""
       placeholder="Cerca per nome o luogo..."
       bind:value={searchQuery}
     />
     <div class="flex gap-4">
       <!-- Filter by inizio date greater than -->
       <Input
         type="date"
         id="date-greater"
         label="Dal:"
         errors=""
         bind:value={searchDateGreater}
       />
       <!-- Filter by inizio date less than -->
       <Input
         type="date"
         id="date-less"
         label="Al:"
         errors=""
         bind:value={searchDateLess}
       />
     </div>
   </div>
</div>

<!-- Filtered event results -->
<div class="flex flex-wrap justify-center gap-4">
  {#each filteredEventi as evento}
    <EventCard evento={evento} edit={data.user.owner} />
  {/each}
</div>

<!-- Floating button on mobile -->
<a href="/private/owner/eventi/new" class="btn btn-circle btn-primary fixed bottom-4 right-4 md:hidden">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
  </svg>
</a>