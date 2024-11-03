<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { Input } from "$lib/components";
    import type { Lista } from "$lib/models";

    export let selectedLists: Lista[] = [];
    export let eventoId: string | undefined = undefined;
    export let openChooser: undefined | boolean = undefined;

    console.log(selectedLists);

    let searchQuery = "";
    const dispatch = createEventDispatcher();

    // Asynchronous function to fetch lists
    async function fetchAddableLists() {
        const response = await fetch(`/private/owner/liste/left?id_evento=${eventoId}`);
        if (!response.ok) throw new Error("Failed to fetch lists");
        return await response.json();
    }

    function selectList(list: Lista) {
        if (!selectedLists.includes(list)) {
            selectedLists = [...selectedLists, list];
        } else {
            selectedLists = selectedLists.filter((l) => l !== list);
        }
        dispatch("update", selectedLists);
    }
    
</script>

<div class="p-4 w-full max-w-md mx-auto bg-base-300 rounded-lg">
    <div class="flex flex-row justify-between">
        <h2 class="text-3xl font-bold">Seleziona le liste</h2>
        {#if openChooser}
            <button
                class="btn btn-secondary"
                on:click={() => (openChooser = !openChooser)}
            >
                {openChooser ? "Chiudi" : "Apri"}
            </button>
        {/if}
    </div>

    <!-- Search bar -->
    <Input
        id="search"
        type="text"
        label="Cerca Lista"
        placeholder="Cerca per nome..."
        bind:value={searchQuery}
    />

    <!-- #await block for async data fetching -->
    {#await fetchAddableLists()}
        <p>Caricamento liste...</p>
    {:then lists}
        <!-- List of filtered lists with scrollable container -->
        {#if lists.length > 0}
            <ul class="mt-4 space-y-2 border-primary border-2 rounded-xl p-4 max-h-64 overflow-y-auto">
                {#each lists.filter((list: Lista) => list.nome.toLowerCase().includes(searchQuery.toLowerCase())) as list (list.id)}
                    <li class="p-2 rounded-lg flex justify-between items-center {selectedLists.some((selectedList) => JSON.stringify(selectedList) === JSON.stringify(list)) ? 'bg-primary-content' : ''}">
                        <span>{list.nome}</span>
                        <button
                            class="btn btn-sm {selectedLists.some((selectedList) => JSON.stringify(selectedList) === JSON.stringify(list)) ? 'btn-error' : 'btn-primary'}"
                            on:click={() => selectList(list)}
                        >
                            {selectedLists.some((selectedList) => JSON.stringify(selectedList) === JSON.stringify(list)) ? "Deseleziona" : "Seleziona"}
                        </button>
                    </li>
                {/each}
            </ul>
            <button class="btn btn-success mt-4 w-full" on:click={() => dispatch("save", selectedLists)}>
                Salva Selezione
            </button>
        {:else}
            <p>Nessuna lista trovata.</p>
        {/if}
    {:catch error}
        <p class="text-error">Errore durante il caricamento delle liste: {error.message}</p>
    {/await}
</div>