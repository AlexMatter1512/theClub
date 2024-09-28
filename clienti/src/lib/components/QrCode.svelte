<script lang="ts">

    import { BaseUrl, qrcodeBaseUrl } from "$lib/constants";
    export let code;
    export let title = true;
    export let subtitle = true;
    $: qrLoaded = false;
    let src = qrcodeBaseUrl + BaseUrl + code;

</script>

<!-- <div class="fixed top-0 left-0 z-10 w-screen h-screen flex flex-col items-center justify-center text-center bg-base-200"> -->
 <div class="flex flex-col items-center justify-center text-center max-w-xs">
    {#if title}
        <p class="text-lg font-semibold mb-3">Mostra questo QR code per accedere all'evento</p>
    {/if}
    {#if subtitle}
        <p class="text-sm text-gray-500 mb-4">Puoi trovare questo codice sul tuo <a class="text-primary" href="/me/eventi">profilo!</a></p>
    {/if}
    {#if !qrLoaded}
        si ma dammi il tempo...
    {/if}
    <img src="{src}" alt="qrcode" on:load={() => qrLoaded = true} class={qrLoaded ? '' : 'invisible'} />
</div>