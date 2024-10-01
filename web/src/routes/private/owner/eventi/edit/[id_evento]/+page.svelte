<script lang="ts">
    import type { Evento, Cliente, Iscrizione_expanded } from '$lib/models';
    import { getDateString } from '$lib/utils';
    import { onMount } from 'svelte';
    
    export let data;
    const { evento, listeEvento, iscrizioni_expanded } = data;
    evento.inizio = getDateString(evento.inizio);

    listeEvento.forEach(lista => {
        lista.expand = {
            lista: lista.expand?.lista,
            iscrizioni: iscrizioni_expanded.filter(iscrizione => iscrizione.id_lista === lista.expand?.lista.id),
            entrati: iscrizioni_expanded.filter(iscrizione => iscrizione.id_lista === lista.expand?.lista.id && iscrizione.entrato),
        };
    });

    function downloadCSV(id_listaEvento: string) {
        console.log("Downloading CSV for iscrizione", id_listaEvento);

        const lista = listeEvento.find(l => l.id === id_listaEvento);
        if (!lista) {
            console.error("Lista not found");
            return;
        }

        // Table for Prenotati (only Nome, Cognome)
        const prenotatiHeaders = "Prenotati\nNome,Cognome\n";
        const prenotati = lista.expand?.iscrizioni.map((p: Iscrizione_expanded) => `${p.nome_cliente},${p.cognome_cliente}`).join("\n") || "No prenotati";

        // Table for Entrati (Nome, Cognome, Data_ingresso)
        const entratiHeaders = "\n\nEntrati\nNome,Cognome,Data Ingresso\n";
        const entrati = lista.expand?.entrati.map((e: Iscrizione_expanded) => `${e.nome_cliente},${e.cognome_cliente},${e.data_ingresso || 'N/A'}`).join("\n") || "No entrati";

        // Combine the tables into the CSV content
        const csvContent = [prenotatiHeaders, prenotati, entratiHeaders, entrati].join("");

        // Create the CSV and initiate the download
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `lista_${lista.expand?.lista.nome}-evento_${evento.nome.replace(" ","_")}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    onMount(() => {
        console.log(listeEvento);
    });
    
</script>

<div class="hero">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Modifica Evento {evento.nome}</h1>
      </div>
    </div>
</div>

<div class="flex flex-col items-center lg:flex-row justify-around">

    <form action="" class="w-full max-w-md">
        <div class="form-control">
            <!-- svelte-ignore a11y_label_has_associated_control -->
            <label class="label">
                <span class="label-text">Poster</span>
            </label>
            <img src={evento.poster} alt="poster" class="rounded-lg w-64 h-64 object-cover" />
            <!-- <input type="file" class="" accept="image/*"/> -->
        </div>

        <div class="form-control">
            <!-- svelte-ignore a11y_label_has_associated_control -->
            <label class="label">
                <span class="label-text">Nome</span>
            </label>
            <input type="text" placeholder="Nome" class="input input-bordered" bind:value={evento.nome} />
        </div>

        <div class="form-control">
            <!-- svelte-ignore a11y_label_has_associated_control -->
            <label class="label">
                <span class="label-text">Località</span>
            </label>
            <input type="text" placeholder="Nome" class="input input-bordered" bind:value={evento.luogo} />
        </div>

        <div class="form-control">
            <!-- svelte-ignore a11y_label_has_associated_control -->
            <label class="label">
                <span class="label-text">Data</span>
            </label>
            <input type="datetime-local" class="input input-bordered w-full" bind:value={evento.inizio} />
        </div>

        <div class="form-control mt-6">
            <button class="btn btn-primary" type="submit">Salva</button>
        </div>

        
    </form>

    <div class="w-full max-w-md mt-8">
        <h2 class="text-3xl font-bold mb-4">Liste Evento</h2>

        {#each listeEvento as listaEvento}
            <div class="collapse collapse-arrow bg-base-300 my-1">
                <input type="checkbox"/>
                <div class="collapse-title text-xl font-medium">{listaEvento.expand?.lista.nome}</div>
                    <div class="collapse-content">

                        <div class="collapse bg-base-200 my-1">
                            <input class="min-h-0" type="checkbox" />
                            <div class="collapse-title font-medium my-1 text-center p-0 min-h-0">
                                <p><b>Prenotati:</b> {listaEvento.expand?.iscrizioni.length}</p>
                            </div>
                            <div class="collapse-content">
                                {#each listaEvento.expand?.iscrizioni as iscrizione}
                                    <p>{iscrizione.nome_cliente} {iscrizione.cognome_cliente}</p>
                                {/each}
                            </div>
                        </div>

                        <div class="collapse bg-base-200 my-1">
                            <input class="min-h-0" type="checkbox" />
                            <div class="collapse-title text-center font-medium my-1 p-0 min-h-0">
                                <p><b>Entrati:</b> {listaEvento.expand?.entrati.length}</p>
                            </div>
                            <div class="collapse-content">
                                {#each listaEvento.expand?.entrati as entrato}
                                    <p>{entrato.nome_cliente} {entrato.cognome_cliente}</p>
                                {/each}
                            </div>
                        </div>
                        <div class="flex justify-end mt-4">
                            <button class="btn btn-sm btn-primary" on:click={() => downloadCSV(listaEvento.id)}>Download CSV</button>
                        </div>

                        <div class="form-control mt-4">
                            <!-- svelte-ignore a11y_label_has_associated_control -->
                            <label class="label">
                                <span class="label-text">Data Chiusura</span>
                            </label>
                            <input type="datetime-local" class="input input-bordered w-full" />
                            <div class="flex justify-center gap-1 w-full mt-4">
                                <button class="btn btn-sm flex-grow btn-outline btn-secondary mt-2">Chiudi Ora</button>
                                <button class="btn btn-sm flex-grow btn-secondary mt-2">Salva</button>
                            </div>
                        </div>
                        
                </div>
            </div>
        {/each}

    </div>
</div>