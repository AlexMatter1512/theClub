<script lang="ts">
    import { page } from "$app/stores";
    import { createEventDispatcher } from "svelte";
    import type { Evento, Iscrizione_expanded, Lista_evento } from "$lib/models";
    import DangerDelete from "./DangerDelete.svelte";
    import Input from "./Input.svelte";
    import { correctDateString } from "$lib/utils";
    export let listeEvento: Lista_evento[];
    export let evento: Evento;
    export let open: boolean = false;
    type OrariChiusura = { [key: string]: string };

    let dispatch = createEventDispatcher();

    $: orari_chiusura = listeEvento.reduce((acc: OrariChiusura, l) => {
        acc[l.id] = l.chiusura ? correctDateString(l.chiusura) : "";
        return acc;
    }, {} as OrariChiusura);

    $: console.log(orari_chiusura);

    function handleClose(id_listaEvento: string, chiusura: string) {
        console.log("Chiudi", id_listaEvento, chiusura);
        fetch(`/private/owner/liste/close/${id_listaEvento}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ chiusura }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                console.log("Success:", data);
            } else {
                console.error("Error:", data);
            }
            // Optionally, update the UI or state here
            window.location.reload();
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }

    function chiudi_ora(id_listaEvento: string) {
        handleClose(id_listaEvento, new Date().toISOString());
    }

    function chiudi_at(id_listaEvento: string, chiusura: string) {
        handleClose(id_listaEvento, new Date(chiusura).toISOString());
    }

    function downloadCSV(id_listaEvento: string) {
        console.log("Downloading CSV for iscrizione", id_listaEvento);

        const lista = listeEvento.find((l) => l.id === id_listaEvento);
        if (!lista) {
            console.error("Lista not found");
            return;
        }

        // Table for Prenotati (only Nome, Cognome)
        const prenotatiHeaders = "Prenotati\nNome,Cognome,Data Iscrizione\n";
        const prenotati =
            lista.expand?.iscrizioni
                .map(
                    (p: Iscrizione_expanded) =>
                        `${p.nome_cliente},${p.cognome_cliente},${p.data_iscrizione}`,
                )
                .join("\n") || "No prenotati";

        // Table for Entrati (Nome, Cognome, Data_ingresso)
        const entratiHeaders = "\n\nEntrati\nNome,Cognome,Data Ingresso\n";
        const entrati =
            lista.expand?.entrati
                .map(
                    (e: Iscrizione_expanded) =>
                        `${e.nome_cliente},${e.cognome_cliente},${e.data_ingresso || "N/A"}`,
                )
                .join("\n") || "No entrati";

        // Combine the tables into the CSV content
        const csvContent = [
            prenotatiHeaders,
            prenotati,
            entratiHeaders,
            entrati,
        ].join("");

        // Create the CSV and initiate the download
        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute(
            "download",
            `lista_${lista.expand?.lista.nome}-evento_${evento.nome.replace(" ", "_")}.csv`,
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
</script>

<div class="w-full max-w-md mt-8">
    <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-4">Liste Evento</h2>
        <button class="btn btn-circle btn-primary" on:click={() => (open = !open)}>
            {#if open}
                ✕
            {:else}
                +
            {/if}
        </button>
    </div>

    {#each listeEvento as listaEvento}
    <!-- LISTA -->
        <div class="collapse collapse-arrow bg-base-300 my-1">
            <input type="checkbox" />
            <div class="collapse-title text-xl font-medium">
                {listaEvento.expand?.lista.nome}
            </div>
            <div class="collapse-content">
                <!-- Prenotati -->
                <div class="collapse bg-base-200 my-1">
                    <input class="min-h-0" type="checkbox" />
                    <div
                        class="collapse-title font-medium my-1 text-center p-0 min-h-0"
                    >
                        <p>
                            <b>Prenotati:</b>
                            {listaEvento.expand?.iscrizioni.length}
                        </p>
                    </div>
                    <div class="collapse-content">
                        {#each listaEvento.expand?.iscrizioni as iscrizione}
                            <p>
                                {iscrizione.nome_cliente}
                                {iscrizione.cognome_cliente}
                            </p>
                        {/each}
                    </div>
                </div>

                <!-- Entrati -->
                <div class="collapse bg-base-200 my-1">
                    <input class="min-h-0" type="checkbox" />
                    <div
                        class="collapse-title text-center font-medium my-1 p-0 min-h-0"
                    >
                        <p>
                            <b>Entrati:</b>
                            {listaEvento.expand?.entrati.length}
                        </p>
                    </div>
                    <div class="collapse-content">
                        {#each listaEvento.expand?.entrati as entrato}
                            <p>
                                {entrato.nome_cliente}
                                {entrato.cognome_cliente}
                            </p>
                        {/each}
                    </div>
                </div>
                <div class="flex justify-end mt-4">
                    <button
                        class="btn btn-sm btn-primary"
                        on:click={() => downloadCSV(listaEvento.id)}
                        >Download CSV</button
                    >
                </div>

                <!-- Chiusura -->
                <div class="form-control mt-4">
                    <Input
                        type="datetime-local"
                        label="Data Chiusura"
                        id="chiusura"
                        errors=""
                        bind:value={orari_chiusura[listaEvento.id]}
                    />
                    <div class="flex justify-center gap-1 w-full my-4">
                        <!-- Chiudi ora -->
                        <button on:click={() => chiudi_ora(listaEvento.id)}
                            class="btn btn-sm flex-grow btn-outline btn-secondary mt-2"
                            >Chiudi Ora</button
                        >
                        <button on:click={() => chiudi_at(listaEvento.id, orari_chiusura[listaEvento.id])}
                            class="btn btn-sm flex-grow btn-secondary mt-2"
                            >Salva</button
                        >
                    </div>
                    <DangerDelete
                        delete_function={() => {dispatch("delete_lista", listaEvento.id)}}
                        item_name="lista"
                        additional_text="Eliminando la lista verranno eliminati anche tutti i dati relativi alle iscrizioni e agli ingressi."
                    />
                </div>
            </div>
        </div>
    {/each}
</div>