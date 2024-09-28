<script lang="ts">
    import EventCard from '$lib/components/EventCard.svelte';
    import QrCode from '$lib/components/QrCode.svelte';
    import type { Evento, Iscrizione } from '$lib/models.js';
    export let data;

    const iscrizioni: Iscrizione[] = data.iscrizioni;
</script>

<h1 class="text-2xl font-bold mb-4 text-center">Eventi ai quali ti sei registrato</h1>
<div class="flex flex-wrap justify-center gap-4 m-4">
    {#each iscrizioni as iscrizione}
    <div class="max-w-md">
        <EventCard evento={iscrizione.expand.evento} base={300}> 
            <div class="collapse bg-base-200 my-1">
                <input class="min-h-0" type="checkbox" />
                <div class="collapse-title my-1 text-center p-0 min-h-0 font-bold text-primary">Info</div>
                <div class="collapse-content">
                    <p class="text-center"><b>Lista:</b> {iscrizione.expand.lista.nome}</p>
                    <QrCode subtitle={false} code={`${iscrizione.id}_${data.cliente.id}`} />
                    <form action="?/unsubscribe" method="POST">
                        <input type="hidden" name="id_iscrizione" value={iscrizione.id} />
                        <button type="submit" class="btn btn-sm btn-error w-full mt-4">Annulla iscrizione</button>
                    </form>
                </div>
            </div>
        </EventCard>
    </div>
    {/each}
</div>