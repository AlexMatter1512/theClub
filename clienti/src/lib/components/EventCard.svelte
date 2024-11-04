<script lang="ts">
  import type { Evento } from "$lib/models";
  import { formatDate } from '$lib/utils.js';
  import { onMount } from "svelte";

  export let register = false;
  export let checked = false;

  export let evento: Evento = {
      id: "0",
      nome: "Event Title",
      inizio: "Event Date",
      fine: "Event end Date",
      luogo: "Event Location",
      poster: "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",
      created: "Created Date",
      updated: "Updated Date",
      formatted_inizio: "event inizio",
      formatted_fine: "event fine"
  }

  $: evento.formatted_inizio = formatDate(new Date(evento.inizio))
  $: evento.formatted_fine = formatDate(new Date(evento.fine))

  export let base = 100; // Adjust this as needed for Tailwind colors
</script>

<div class=" bg-base-{base} min-w-80 max-w-xs shadow-lg rounded-xl p-4">
  <figure class="aspect-[9/13] rounded-xl border-2 border-neutral-content overflow-hidden">
    <img
      class="w-full h-full object-cover"
      src={evento.poster}
      alt="Event Poster"
    />
  </figure>
  <div class="collapse collapse-arrow bg-base-{base} border-2 border-neutral-content mt-2">
    <input type="checkbox" bind:checked={checked}/>
    <div class="collapse-title text-xl font-medium">{evento.nome}</div>
    <div class="collapse-content">
      <p class="mt-2">
        <span class="font-bold">Start:</span><br>{evento.formatted_inizio}
      </p>
      <p class="mt-1">
        <span class="font-bold">End:</span><br>{evento.formatted_fine}
      </p>
      <p class="mt-1">
        <span class="font-bold">Location:</span><br>{evento.luogo}
      </p>
    </div>
  </div>
  <div class="mt-2 flex justify-end">
    <!-- Uncomment and adjust the link as needed -->
    <!-- <a href="/eventi/{evento.id}" class="text-sm text-blue-500 hover:underline">Info</a> -->
    {#if register}  
      <a href="/eventi/{evento.id}/registrati" 
         class="btn btn-ghost btn-md text-xl font-medium flex-grow border-2 border-neutral-content rounded-xl">
        Liste
      </a>
    {/if}
  </div>
  <slot></slot>
</div>