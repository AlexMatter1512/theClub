<script lang="ts">
    import LucidEventCard from '$lib/components/LucidEventCard.svelte';
    import QrCode from '$lib/components/QrCode.svelte';
    import Modal from '$lib/components/Modal.svelte';
    import type { Cliente, Evento, Iscrizione } from '$lib/models.js';

    export let data;
    export let form;

    const evento: Evento = data.evento;
    const liste: Iscrizione[] = data.listeEvento;
    const cliente: Cliente = data.cliente;

    // this is used if the user is already in a list and we dont want him to register again
    let prenotato = false
    // this is used to check if the user is already in a list but the user can still register to another list
    const isUserInLista = new Map<string, boolean>();
    // when one of the above is used the other is not used

    liste.forEach(lista => {
        const isInLista = lista.prenotati.some(prenotato => prenotato.includes(cliente.id));
        isUserInLista.set(lista.id, isInLista);
        if (isInLista) prenotato = true;
    });

</script>

{#if form?.status === 200}
    <Modal title="QR Code">
        <QrCode code={form.body.code}/>
    </Modal>
{/if}

<div class="hero">
    <div class="hero-content">
        <LucidEventCard {evento}/>
    </div>
</div>


{#if liste.length < 1}
    <div class="text-center my-4">
        <h2 class="text-2xl font-semibold">Non ci sono liste disponibili per questo evento</h2>
    </div>
{:else}
    {#if !prenotato}
        <!-- content here -->
        <div class="text-center my-4">
            <h2 class="text-2xl font-semibold">Seleziona la lista con cui entrerai all'evento</h2>
        </div>
    {:else}
        <div class="text-center my-4">
            <h2 class="text-2xl font-semibold">Sei già registrato con una lista, controlla sul tuo <a href="/me/eventi" class="text-primary">profilo</a></h2>
        </div>
    {/if}
{/if}

{#if !prenotato}
    {#each liste as lista}
    <div class="flex flex-col items-center px-4">
        <div class="collapse collapse-arrow my-2 max-w-md bg-base-300">
            <input type="radio" name="my-accordion-2"/>
            <div class="collapse-title text-xl font-medium">{lista.expand.lista.nome}</div>
            <div class="collapse-content">
                {#if isUserInLista.get(lista.id)}
                    <p class="mb-2">Sei già registrato con questa lista</p>
                {:else}
                    <form method="POST" action={`/eventi/${evento.id}/registrati/?/registrati`}>
                        <input type="hidden" name="id_lista" value="{lista.expand.lista.id}">
                        <p class="mb-2"><b>PR:</b> {lista.expand.lista.nome_pr}</p>
                        <button type="submit" class="btn btn-sm w-full btn-primary">
                            registrati
                        </button>
                    </form>
                {/if}
            </div>
        </div>
    </div>
    {/each}
{/if}