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

    evento.inizio = formatDate(new Date(evento.inizio));
    evento.fine = formatDate(new Date(evento.fine));

</script>

<div class="card bg-base-100 image-full w-96 shadow-xl">
    <figure>
        <img
        src={evento.poster}
        alt="poster" />
    </figure>
    <div class="card-body">
        <h2 class="card-title text-5xl">{evento.nome}</h2>
        <div class="card-content mt-4 bg-opacity-50 bg-base-300 rounded-md p-4">
        <p><b>Start:</b> {evento.inizio}</p>
        <p><b>End:</b> {evento.fine}</p>
        <p><b>At:</b> {evento.luogo}</p>
        </div>
    </div>
</div>