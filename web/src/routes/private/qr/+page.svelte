<script lang="ts">
    import { formatDate } from '$lib/utils';
    
    export let data;
    export let form;
    
    const { status, message, iscrizione } = data;
    const alertTypes: {[key: number]: string} = {
        200: 'success',
        401: 'warning',
        403: 'warning',
        409: 'error',
        404: 'error',
    };

    const alertType: string = alertTypes[status];
    const nome_evento = iscrizione?.nome_evento;
    const inizio_evento = formatDate(new Date(iscrizione?.inizio_evento || ''));
    const fine_evento = formatDate(new Date(iscrizione?.fine_evento || ''));
    const nome_lista = iscrizione?.nome_lista;
    const nome_cliente = iscrizione?.nome_cliente;
    const cognome_cliente = iscrizione?.cognome_cliente;
    const data_iscrizione = formatDate(new Date(iscrizione?.data_iscrizione || ''));


</script>

{#if form}
    <div class="alert alert-info">
        <div>
            {form.message}
        </div>
    </div>
{:else}
    <div class="flex flex-col items-center">
        {#if status !== 404}
            <div class="alert alert-{alertType} max-w-md text-start">
                <div>
                    {#if status === 200}
                        <h1 class="font-bold text-2xl">Cliente Autorizzato!</h1>
                    {:else}
                        <h1 class="font-bold text-2xl">Attenzione!</h1>
                        <p>{message}</p>
                    {/if}
                    <br>
                    <h2 class="font-bold text-xl">Lista:</h2>
                    <p><b>Nome Lista:</b> {nome_lista}</p>
                    <br>
                    <h2 class="font-bold text-xl">Evento:</h2>
                    <p><b>Nome Evento:</b> {nome_evento}</p>
                    <p><b>Start:</b> {inizio_evento}</p>
                    <p><b>End:</b> {fine_evento}</p>
                    <br>
                    <h2 class="font-bold text-xl">Cliente:</h2>
                    <p><b>Nome:</b> {nome_cliente}</p>
                    <p><b>Cognome:</b> {cognome_cliente}</p>
                    <p><b>Data di iscrizione in lista:</b> {data_iscrizione}</p>
                    {#if iscrizione?.entrato}
                        <p><b>Data di ingresso:</b> {formatDate(new Date(iscrizione?.data_ingresso || ''))}</p>
                    {/if}
                </div>
            </div>
            {#if alertType !== 'error'}    
                <form action="?/conferma_ingresso" method="POST" class="mt-4">
                    <input type="hidden" name="id_iscrizione" value="{iscrizione?.id}"/>
                    <button type="submit" class="btn btn-primary">⚠️ Conferma Ingresso ⚠️</button>
                </form>
            {/if}

            
        {:else}
            <div class="alert alert-{alertType}">
                <div>
                    <h1 class="font-bold text-2xl">Utente non trovato!</h1>
                    <span>{message}</span>
                </div>
            </div>
        {/if}
    </div>
{/if}
