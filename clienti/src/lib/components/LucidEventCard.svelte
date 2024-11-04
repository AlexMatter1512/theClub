<script lang="ts">
    import type { Evento } from "$lib/models";
    import { formatDate } from "$lib/utils";

    export let evento: Evento = {
        id: "0",
        nome: "Event Title",
        inizio: "Event Date",
        fine: "Event end Date",
        luogo: "Event Location",
        poster: "",
        created: "Created Date",
        updated: "Updated Date",
    }

    $: evento.formatted_inizio = formatDate(new Date(evento.inizio))
    $: evento.formatted_fine = formatDate(new Date(evento.fine))
</script>

<div class="bg-cover bg-center w-screen aspect-[9/13] shadow-xl rounded-xl overflow-hidden max-w-sm" style="background-image: url({evento.poster});">
    <div class="p-4 flex flex-col justify-end h-full">
        <div class="mt-4 bg-base-200 bg-opacity-90 rounded-lg p-4 border-2 border-neutral-content">
            <h2 class="text-3xl font-bold mb-2">{evento.nome}</h2>
            <p><span class="font-bold">Start:</span> {evento.formatted_inizio}</p>
            <p><span class="font-bold">End:</span> {evento.formatted_fine}</p>
            <p><span class="font-bold">At:</span> {evento.luogo}</p>
        </div>
    </div>
</div>