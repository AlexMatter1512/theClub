<script lang="ts">
    import Input from "$lib/components/Input.svelte";
    import ListeEvento from "$lib/components/ListeEvento.svelte";
    import { createFileListFromSrc } from "$lib/utils";
    import { onMount } from "svelte";
    import SuperDebug, {
        fileProxy,
        superForm,
    } from "sveltekit-superforms";
    import PosterInput from "$lib/components/PosterInput.svelte";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { eventSchema } from "$lib/schemas.js";
    import { goto } from "$app/navigation";

    export let data;
    const { evento, listeEvento, iscrizioni_expanded } = data;
    const { form, errors, constraints, message, enhance } = superForm(
        data.form,
        {
            validators: zodClient(eventSchema),
            invalidateAll: "force",
            onUpdated: init_page
        },
    );
    // evento.inizio = getDateString(evento.inizio);
    let originalForm = JSON.stringify($form);
    let originalPoster = { 
        name: $form.poster?.name,
        type: $form.poster?.type,
        size: $form.poster?.size,
        lastModified: $form.poster?.lastModified,
     };
    $: enableButton = 
        (JSON.stringify($form) !== originalForm) || 
        (JSON.stringify({
            name: $form.poster?.name,
            type: $form.poster?.type,
            size: $form.poster?.size,
            lastModified: $form.poster?.lastModified,
        }) !== JSON.stringify(originalPoster));

    let file = fileProxy(form, "poster");

    listeEvento.forEach((lista) => {
        lista.expand = {
            lista: lista.expand?.lista,
            iscrizioni: iscrizioni_expanded.filter(
                (iscrizione) => iscrizione.id_lista === lista.expand?.lista.id,
            ),
            entrati: iscrizioni_expanded.filter(
                (iscrizione) =>
                    iscrizione.id_lista === lista.expand?.lista.id &&
                    iscrizione.entrato,
            ),
        };
    });

    async function init_page() {
        // Initialize the page
        if (evento.poster) {
            console.log("evento.poster", evento.poster);
            $file = await createFileListFromSrc(evento.poster);
            console.log("file", $file);
            originalForm = JSON.stringify($form);
            originalPoster = { 
                name: $form.poster?.name,
                type: $form.poster?.type,
                size: $form.poster?.size,
                lastModified: $form.poster?.lastModified,
            };
        }
    }

    async function delete_evento() {
        await fetch(`/private/owner/eventi/edit/${evento.id}`, {
            method: "DELETE",
        }).then((res) => res.json())
        .then((res) => {
            if (res.status === "success") {
                goto("/private/owner/eventi");
            }
        });
        
    }

    onMount(async () => {
        await init_page();
    });
</script>

<!-- <SuperDebug data={form} /> -->

<div class="hero">
    <div class="hero-content text-center">
        <div class="max-w-md">
            <h1 class="text-5xl font-bold">Evento {evento.nome}</h1>
        </div>
    </div>
</div>

<div class="flex flex-col items-center lg:flex-row justify-around">
    <div class="flex flex-col gap-1 w-full">
        <form enctype="multipart/form-data" action="?/edit" class="w-full max-w-md" method="POST" use:enhance>
            <PosterInput
                src={evento.poster}
                bind:file={$file}
                errors={$errors.poster}
                name="poster"
            />
    
            <Input
                id="nome"
                label="Nome"
                bind:value={$form.nome}
                errors={$errors.nome}
                {...$constraints.nome}
            />
    
            <Input
                id="luogo"
                label="Luogo"
                bind:value={$form.luogo}
                errors={$errors.luogo}
                {...$constraints.luogo}
            />
    
            <Input
                id="inizio"
                label="Inizio"
                type="datetime-local"
                bind:value={$form.inizio}
                errors={$errors.inizio}
                {...$constraints.inizio}
            />
    
            <Input
                id="fine"
                label="Fine"
                type="datetime-local"
                bind:value={$form.fine}
                errors={$errors.fine}
                {...$constraints.fine}
            />
    
            <div class="form-control mt-6">
                <button class="btn btn-primary" type="submit" disabled={!enableButton}>Salva</button>
            </div>
        </form>
        <div class="collapse text-black w-full max-w-md rounded-lg">
            <input type="checkbox" class="peer" />
            <div class="collapse-title px-4 text-center bg-error peer-checked:bg-warning">
              <b>Elimina Evento</b>
            </div>
            <div class="collapse-content bg-error peer-checked:bg-warning">
                <button class="btn btn-error w-full" on:click={delete_evento}>
                    ⚠️ Conferma ⚠️
                </button>
                <p><b>ATTENZIONE:</b> Questa azione è irreversibile. <br></p>
                <p class="text-xs text-gray-400">Mbare, io ti ho avvertito!</p>
                
            </div>
          </div>
    </div>

    <ListeEvento {listeEvento} {evento} />
</div>