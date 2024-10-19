<script lang="ts">
    import EventCard from "$lib/components/EventCard.svelte";

    export let data;

    let eventi = data.eventi;
    let liste = data.liste;
</script>

<!-- HERO -->
<div class="hero">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Dashboard</h1>
      </div>
    </div>
</div>

<!-- EVENTI -->
<div class="mt-10 mb-5 text-center">
  <h1 class="text-4xl font-bold">
    Prossimi <a class="text-primary" href="/private/owner/eventi">Eventi</a>
  </h1>
</div>

<div class="carousel carousel-center bg-base-300 space-x-4 -mx-4 p-4 w-screen">

  {#each eventi as evento}
    <div class="carousel-item max-w-sm md:max-w-full">
      <EventCard evento={evento} edit={data.user.owner} />
    </div>
  {/each}
</div>

<!-- LISTE -->
<div class="mt-10 mb-5 text-center">
  <h1 class="text-4xl font-bold">
  Ultime <a class="text-primary" href="/private/owner/liste">Liste</a>
  </h1>
</div>

<div class="flex flex-col items-center space-y-4 m-4">

  {#each liste as lista}
    <div class="collapse collapse-arrow bg-base-300 max-w-md">
      <input type="checkbox" />
      <div class="collapse-title text-xl font-medium">{lista.nome}</div>
      <div class="flex justify-between collapse-content">
        <p>{lista.descrizione}</p>
        {#if data.user.owner}
           <a href="/private/owner/liste/edit/{lista.id}" class="btn btn-sm btn-primary btn-outline">Edit</a>
        {/if}
      </div>
    </div>
  {/each}
</div>

