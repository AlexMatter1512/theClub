<script lang="ts">
    import EventCard from "$lib/components/EventCard.svelte";

    export let data;

    let eventi = data.eventi;
</script>

<!-- EVENTI -->
<div class="hero">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Prossimi 
          <a class="text-primary" href="/eventi">Eventi</a>
        </h1>
        {#if !data.cliente}
          <p class="text-xl">
            <a class="text-primary" href="/auth/login">Accedi</a> per registrarti agli eventi
          </p>
        {/if}
      </div>
    </div>
</div>

<div class="carousel carousel-center bg-base-300 space-x-4 p-4 w-screen">

  {#each eventi as evento}
    <div class="carousel-item">
      <EventCard evento={evento} register={data.cliente} />
    </div>
  {/each}
</div>