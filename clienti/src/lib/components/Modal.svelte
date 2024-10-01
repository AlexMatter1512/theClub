<script lang="ts">
    export let title = "";
    export let modal = "open";
</script>

<div class="modal modal-{modal} h-full w-full">
    <div class="mockup-phone">
        <div class="camera"></div>
        <div class="display bg-base-100 flex flex-col justify-center items-center w-full h-full p-4">
                {#if title !== ""}
                    <h3 class="font-bold text-lg">{title}</h3>
                {/if}
                <div class="w-full flex justify-center">
                    <slot/>        
                </div>
                <div class="modal-action w-full flex justify-end">
                    <button class="btn" on:click={() => modal = ""}>Chiudi</button>
                </div>
            
        </div>
    </div>
</div>

<style>
    .mockup-phone {
        aspect-ratio: 9/17;
    }
</style>