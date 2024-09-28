<script lang="ts">
    export let data;

    const evento = data.evento;
    const listeEvento = data.listeEvento;

    let chiusura: string;
    $: console.log(chiusura)

    const originalDate = new Date(evento.inizio);

    // Format date components
    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(originalDate.getDate()).padStart(2, '0');

    // Format time components
    const hours = String(originalDate.getHours()).padStart(2, '0');
    const minutes = String(originalDate.getMinutes()).padStart(2, '0');

    // Combine into the desired format
    let formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;


    $: console.log(formattedDate)
</script>

<div class="hero">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Modifica Evento {evento.nome}</h1>
      </div>
    </div>
</div>

<div class="flex flex-col items-center px-4 lg:flex-row justify-around">

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
            <input type="datetime-local" class="input input-bordered" bind:value={formattedDate} />
        </div>

        <div class="form-control mt-6">
            <button class="btn btn-primary" type="submit">Salva</button>
        </div>

        
    </form>

    <div class="w-full max-w-md mt-8">
        <h2 class="text-3xl font-bold mb-4">Liste Evento</h2>
        {#each listeEvento as lista}
        <div class="collapse collapse-arrow bg-base-300 my-1">
            <input type="checkbox"/>
            <div class="collapse-title text-xl font-medium">{lista.expand?.lista.nome}</div>
                <div class="collapse-content">

                    <div class="collapse bg-base-200 my-1">
                        <input class="min-h-0" type="checkbox" />
                        <div class="collapse-title font-medium my-1 text-center p-0 min-h-0">Prenotati</div>
                        <div class="collapse-content">
                            {#each lista.expand?.prenotati as prenotato}
                                <p>{prenotato.nome} {prenotato.cognome}</p>
                            {/each}
                        </div>
                    </div>

                    <div class="collapse bg-base-200 my-1">
                        <input class="min-h-0" type="checkbox" />
                        <div class="collapse-title font-medium my-1 text-center p-0 min-h-0">Entrati</div>
                        <div class="collapse-content">
                            {#each lista.expand?.entrati as presente}
                                <p>{presente.nome} {presente.cognome}</p>
                            {/each}
                        </div>
                    </div>

                    <div class="form-control mt-4">
                        <!-- svelte-ignore a11y_label_has_associated_control -->
                        <label class="label">
                            <span class="label-text">Data Chiusura</span>
                        </label>
                        <input type="datetime-local" class="input input-bordered" bind:value={chiusura} />
                        <button class="btn btn-secondary mt-2">Chiudi Ora</button>
                    </div>
            </div>
        </div>
        {/each}
    </div>
</div>