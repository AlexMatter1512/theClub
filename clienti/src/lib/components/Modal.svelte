<script lang="ts">
    export let title = "";
    let modal = "modal-open";
</script>

<div class="modal {modal}">
    <div class="modal-box">
        {#if title !== ""}
            <h3 class="font-bold text-lg">{title}</h3>
        {/if}
        <div class="w-full flex justify-center">
            <slot/>        
        </div>
        <div class="modal-action">
            <button class="btn" on:click={() => modal = ""}>Chiudi</button>
        </div>
    </div>
</div>