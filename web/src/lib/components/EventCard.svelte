<script lang="ts">
  import type { Evento } from "../../../../common/script/models";
    import { formatDate } from "$lib/utils";

  export let edit = false;
  export let evento: Evento = {
    id: "0",
    nome: "Event Title",
    inizio: "Event Date",
    fine: "Event end Date",
    luogo: "Event Location",
    poster:
      "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",
    created: "Created Date",
    updated: "Updated Date",
    formatted_inizio: "Event Date",
    formatted_fine: "Event end Date",
  };

  $: evento.formatted_inizio = formatDate(new Date(evento.inizio));
  $: evento.formatted_fine = formatDate(new Date(evento.fine));
</script>

<div
  class="shadow-xl rounded-lg aspect-square w-screen md:max-w-sm bg-cover overflow-hidden"
  style="background-image: url({evento.poster})"
>
  <div class="flex flex-col justify-between bg-black/40 h-full w-full p-4">
    <div class="flex flex-col bg-black/50 text-white p-4 rounded-lg gap-4">
      <h2 class="text-3xl font-bold text-center">
        {evento.nome}
      </h2>
      <p><b>Start:</b><br />{evento.formatted_inizio}</p>
      <p><b>End:</b><br />{evento.formatted_fine}</p>
      <p><b>Location:</b><br />{evento.luogo}</p>
    </div>
    {#if edit}
      <div class="flex">
        <a
          href="/private/owner/eventi/edit/{evento.id}"
          class="btn btn-neutral text-lg w-full">Edit</a
        >
      </div>
    {/if}
  </div>
</div>