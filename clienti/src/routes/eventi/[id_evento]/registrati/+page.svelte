<script lang="ts">
    import LucidEventCard from "$lib/components/LucidEventCard.svelte";
    import QrCode from "$lib/components/QrCode.svelte";
    import Modal from "$lib/components/Modal.svelte";
    import type { Cliente, Evento, Iscrizione } from "$lib/models.js";

    export let data;
    export let form;

    const cliente: Cliente = data.cliente;
    const evento: Evento | undefined = data.evento;
    const listeEvento = data.listeEvento;
    const iscritto: boolean = data.iscritto;
</script>

{#if form?.status === 200}
    <Modal>
        <QrCode code={form.body.code} />
    </Modal>
{/if}

<div class="hero">
    <div class="hero-content">
        <LucidEventCard {evento} />
    </div>
</div>

{#if listeEvento?.length < 1}
    <div class="text-center my-4">
        <h2 class="text-2xl font-semibold">
            Non ci sono liste disponibili per questo evento
        </h2>
    </div>
{:else if !iscritto}
    <!-- content here -->
    <div class="text-center my-4">
        <h2 class="text-2xl font-semibold">
            Seleziona la lista con cui entrerai all'evento
        </h2>
    </div>
{:else}
    <div class="text-center my-4">
        <h2 class="text-2xl font-semibold">
            Sei già registrato con una lista, controlla sul tuo <a
                href="/me/eventi"
                class="text-primary">profilo</a
            >
        </h2>
    </div>
{/if}

{#if !iscritto}
    {#each listeEvento as listaEvento}
        {#if new Date(listaEvento.chiusura) >= new Date()}
            <!-- content here -->
            <div class="flex flex-col items-center px-4">
            <div class="collapse collapse-arrow my-2 max-w-md bg-base-300">
                <input type="radio" name="my-accordion-2" />
                <div class="collapse-title text-xl font-medium">
                {listaEvento.expand.lista.nome}
                </div>
                <div class="collapse-content">
                <form
                    method="POST"
                    action={`/eventi/${evento?.id}/registrati/?/registrati`}
                >
                    <input
                    type="hidden"
                    name="id_listaEvento"
                    value={listaEvento.id}
                    />
                    <p class="mb-2">
                    <b>PR:</b>
                    {listaEvento.expand.lista.nome_pr}
                    </p>
                    <button
                    type="submit"
                    class="btn btn-sm w-full btn-primary"
                    >
                    registrati
                    </button>
                </form>
                </div>
            </div>
            </div>
        {:else}
            <div class="flex flex-col items-center px-4">
                <div class="text-xl font-medium bg-base-200 p-2 rounded-xl w-full max-w-md">
                    {listaEvento.expand.lista.nome}
                    <span class="text-error">Lista chiusa!</span>
                </div>
            </div>
        {/if}
    {/each}
{/if}