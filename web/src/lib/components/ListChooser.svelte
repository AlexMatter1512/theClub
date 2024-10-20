<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { Input } from "$lib/components";
    import type { Lista } from "$lib/models";

    export let selectedLists: Lista[] = [];
    export let openChooser: undefined | boolean = undefined;

    console.log(selectedLists);

    let searchQuery = "";
    const dispatch = createEventDispatcher();

    // Asynchronous function to fetch lists
    async function fetchLists() {
        const response = await fetch("/private/owner/liste");
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
    {#await fetchLists()}
        <p>Caricamento liste...</p>
    {:then lists}
        <!-- List of filtered lists with scrollable container -->
        {#if lists.length > 0}
            <ul class="mt-4 space-y-2 border-primary border-2 rounded-xl p-4 max-h-64 overflow-y-auto">
                {#each lists.filter((list: Lista) => list.nome.toLowerCase().includes(searchQuery.toLowerCase())) as list (list.id)}
                    <li class="p-2 rounded-lg flex justify-between items-center">
                        <span>{list.nome}</span>
                        <button
                            class="btn btn-primary btn-sm"
                            on:click={() => selectList(list)}
                        >
                            {selectedLists.some((selectedList) => JSON.stringify(selectedList) === JSON.stringify(list)) ? "Deseleziona" : "Seleziona"}
                        </button>
                    </li>
                {/each}
            </ul>
        {:else}
            <p>Nessuna lista trovata.</p>
        {/if}
    {:catch error}
        <p class="text-error">Errore durante il caricamento delle liste: {error.message}</p>
    {/await}
</div>