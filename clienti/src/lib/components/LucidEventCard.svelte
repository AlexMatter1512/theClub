<script lang="ts">
    import type { Evento } from "$lib/models";

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

</script>

<div class="card bg-base-100 image-full w-96 shadow-xl">
    <figure>
        <img
        src={evento.poster}
        alt="poster" />
    </figure>
    <div class="card-body">
        <h2 class="card-title text-5xl">{evento.nome}</h2>
        <div class="card-content">
        <p><b>Start:</b><br>{evento.inizio}</p>
        <p><b>At:</b><br>{evento.luogo}</p>
        </div>
    </div>
</div>