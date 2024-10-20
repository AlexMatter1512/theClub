<script lang="ts">
    import { listaSchema } from '$lib/schemas.js';
    import { superForm } from 'sveltekit-superforms';
    import { zodClient } from 'sveltekit-superforms/adapters';
    import { Input } from '$lib/components/index.js';
    import { goto } from '$app/navigation';
    import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

    export let data;

    const { form, errors, constraints, message, enhance } = superForm(
        data.form,
        {
            validators: zodClient(listaSchema)
        },
    );

    let showToast = false;

    $: if ($message) {
        showToast = true;
        if ($message.status !== 'success') {     
            setTimeout(() => {
                showToast = false;
            }, 3000);
        } else {
            setTimeout(() => {
                goto('/private/owner/liste');
            }, 3000);
        }
    }
</script>

<!-- <SuperDebug data={form} /> -->

<div class="hero relative">
    <div class="hero-content text-center">
        <div class="max-w-md mx-auto">
            <h1 class="text-5xl font-bold">Nuova Lista</h1>
        </div>
    </div>
</div>

{#if showToast}
<div class="toast">
    {#if $message.status === 'success'}
    <div class="alert alert-success">
        <div class="flex-1">
            <p>{$message.text}</p>
        </div>
        <button class="btn btn-ghost" on:click={() => showToast = false}>
            Chiudi
        </button>
    </div>
    {:else}
    <div class="alert alert-error">
        <div class="flex-1">
            <p>{$message.text}</p>
        </div>
        <button class="btn btn-ghost" on:click={() => showToast = false}>
            Chiudi
        </button>
    </div>
    {/if}
</div>
{/if}

<div class="flex flex-col gap-4 items-center w-full my-4">
    <div class="w-full max-w-md">
        <form action="?/new" method="post" use:enhance>
            <Input
                type="text"
                id="nome"
                label="Nome"
                placeholder="Nome univoco della lista"
                errors={$errors.nome}
                bind:value={$form.nome}
                {...constraints}
            />
            <Input
                type="text"
                id="nome_pr"
                label="Nome PR"
                errors={$errors.nome_pr}
                bind:value={$form.nome_pr}
                {...constraints}
            />
            <Input
                type="text"
                id="descrizione"
                label="Descrizione (opzionale)"
                errors={$errors.descrizione}
                bind:value={$form.descrizione}
                {...constraints}
            />
            <button type="submit" class="btn btn-primary w-full">
                Salva
            </button>
        </form>
    </div>
</div>

