<script lang="ts">
    import EventCard from '$lib/components/EventCard.svelte';
    import QrCode from '$lib/components/QrCode.svelte';
    import type { Iscrizione_expanded } from '$lib/models.js';
    export let data;

    const iscrizioni_passate: Iscrizione_expanded[] = data.iscrizioni.filter((iscrizione: Iscrizione_expanded) => iscrizione.entrato)
</script>

<div class="flex flex-wrap justify-around">
    
    {#if iscrizioni_passate.length}    
        <div>
            <h1 class="text-2xl font-bold mb-4 text-center">Eventi passati</h1>
            <div class="flex flex-wrap justify-center gap-4 m-4">
                {#each iscrizioni_passate as iscrizione}
                <div class="max-w-md">
                    <EventCard evento={iscrizione.expand.id_evento} base={300}> 
                        <div class="collapse bg-base-200 my-1">
                            <input class="min-h-0" type="checkbox" />
                            <div class="collapse-title my-1 text-center p-0 min-h-0 font-bold text-primary">Info</div>
                            <div class="collapse-content">
                                <p class="text-center"><b>Lista:</b> {iscrizione.expand.id_lista.nome}</p>
                            </div>
                        </div>
                    </EventCard>
                </div>
                {/each}
            </div>
        </div>
    {/if}
</div>