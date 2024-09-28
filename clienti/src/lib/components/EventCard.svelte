<script lang="ts">
    import type { Evento } from "$lib/models";
    import { formatDate } from '$lib/utils.js';
    import { onMount } from "svelte";

    export let register = false;

    export let evento: Evento = {
        id: "0",
        nome: "Event Title",
        inizio: "Event Date",
        fine: "Event end Date",
        luogo: "Event Location",
        poster: "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",
        created: "Created Date",
        updated: "Updated Date",
    }

    export let base = 100;

    onMount(() => {
        evento.inizio = formatDate(new Date(evento.inizio));
    });

</script>

<div class="card bg-base-{base} min-w-80 shadow-xl p-2">
    <figure>
      <img class="max-h-64 rounded-2xl"
        src={evento.poster}
        alt="eventImg" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{evento.nome}</h2>
      <p><b>Start:</b><br>{evento.inizio}</p>
      <p><b>Location:</b><br>{evento.luogo}</p>
      <div class="card-actions justify-end">
        <!-- <a href="/eventi/{evento.id}" class="btn btn-sm btn-primary btn-outline">Info</a> -->
        {#if register}  
          <a href="/eventi/{evento.id}/registrati" class="btn btn-sm btn-primary btn-outline">Registrati</a>
        {/if}
      </div>
    </div>
    <slot></slot>
  </div>