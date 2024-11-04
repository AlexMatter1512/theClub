<script lang="ts">
    import { 
        Input,
        FileInput
    } from "$lib/components";

    import SuperDebug, {
        fileProxy,
        superForm,
        superValidate,
    } from "sveltekit-superforms";

    import { zodClient } from "sveltekit-superforms/adapters";
    import { eventSchema } from "$lib/schemas.js";
    import { slide } from "svelte/transition";
    import { goto } from "$app/navigation";
    import { env } from "$env/dynamic/public";

    export let data;

    const { form, errors, constraints, message, enhance } = superForm(
        data.form,
        {
            validators: zodClient(eventSchema),
        },
    );

    let file = fileProxy(form, "poster");

    $: if ($message?.status === "success") {
        setTimeout(() => {
            goto("/private/owner/eventi");
        }, 1500);
    }
</script>

{#if env.PUBLIC_DEBUG === "true"}
     <SuperDebug data={$form} />
{/if}

<div class="hero">
    <div class="hero-content text-center">
        <div class="max-w-md">
            <h1 class="text-5xl font-bold mb-4">Nuovo Evento</h1>
        </div>
    </div>
</div>

{#if $message?.status === "success"}
    <div class="alert alert-success" transition:slide>
        <p>{$message?.text}</p>
    </div>
{:else if $message?.status === "fail"}
    <div class="alert alert-error" transition:slide>
        <p>{$message?.text}</p>
    </div>
{/if}

<div class="max-w-md mx-auto mt-6 p-4 shadow rounded">
    <form method="post" action="?/nuovo" enctype="multipart/form-data" use:enhance>
        <Input
            id="nome"
            label="Nome"
            type="text"
            placeholder="Nome dell'evento"
            errors={$errors.nome}
            bind:value={$form.nome}
            required >
        </Input>
        <Input
            id="inizio"
            label="Inizio"
            type="datetime-local"
            errors={$errors.inizio}
            bind:value={$form.inizio}
            required >
        </Input>
        <Input
            id="fine"
            label="Fine"
            type="datetime-local"
            errors={$errors.fine}
            bind:value={$form.fine}
            required >
        </Input>
        <Input
            id="luogo"
            label="Luogo"
            type="text"
            placeholder="Luogo dell'evento"
            errors={$errors.luogo}
            bind:value={$form.luogo}
            required >
        </Input>
        <FileInput
            id="poster"
            label="Poster"
            accept="image/*"
            errors={$errors.poster}
            bind:file={$file}
            required >
        </FileInput>
        <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary w-full"
                >Aggiungi Evento</button
            >
        </div>
    </form>
</div>
