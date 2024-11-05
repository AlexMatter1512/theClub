<script lang="ts">
    import Input from "$lib/components/Input.svelte";
    import ListeEvento from "$lib/components/ListeEvento.svelte";
    import { createFileListFromSrc } from "$lib/utils";
    import { onMount } from "svelte";
    import SuperDebug, { fileProxy, superForm } from "sveltekit-superforms";
    import PosterInput from "$lib/components/PosterInput.svelte";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { eventSchema } from "$lib/schemas.js";
    import { goto, invalidate } from "$app/navigation";
    import { DangerDelete, ListChooser } from "$lib/components";
    import type { Lista } from "$lib/models.js";
    import { redirect } from "@sveltejs/kit";
    import { page } from "$app/stores";
    import { env } from "$env/dynamic/public";
    import { slide } from "svelte/transition";
    import TextArea from "$lib/components/TextArea.svelte";

    export let data;
    const { evento, listeEvento, iscrizioni_expanded } = data;
    const { form, errors, constraints, message, enhance } = superForm(
        data.form,
        {
            validators: zodClient(eventSchema),
            invalidateAll: "force",
            onUpdated: init_page,
        },
    );
    let openChooser = false;
    let selectedLists: Lista[] = [];
    let originalForm = JSON.stringify($form);
    let originalPoster = {
        name: $form.poster?.name,
        type: $form.poster?.type,
        size: $form.poster?.size,
        lastModified: $form.poster?.lastModified,
    };
    $: enableButton =
        JSON.stringify($form) !== originalForm ||
        JSON.stringify({
            name: $form.poster?.name,
            type: $form.poster?.type,
            size: $form.poster?.size,
            lastModified: $form.poster?.lastModified,
        }) !== JSON.stringify(originalPoster);

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

    async function addListe() {
        let toAdd = selectedLists.map((list) => list.id);
        await fetch(`/private/owner/eventi/edit/${evento.id}/lists`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ liste: toAdd }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.status === "success") {
                    window.location.reload();
                } else {
                    console.log(res);
                }
            });
    }

    async function delete_lista(event: CustomEvent) {
        let id_lista_evento = event.detail;
        console.log("Deleting lista", id_lista_evento);
        await fetch(`/private/owner/eventi/edit/${evento.id}/lists`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id_lista_evento }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.status === "success") {
                    window.location.reload();
                } else {
                    console.log(res);
                }
            });
    }

    async function delete_evento() {
        await fetch(`/private/owner/eventi/edit/${evento.id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.status === "success") {
                    goto("/private/owner/eventi");
                }
            });
    }

    onMount(async () => {
        await init_page();
    });

    $: console.log(selectedLists);

    let showToast = false;
    $: if ($message) {
        showToast = true;
        setTimeout(() => {
            showToast = false;
        }, 3000);
    }
</script>

{#if env.PUBLIC_DEBUG === "true"}
    <SuperDebug data={form} />
{/if}

{#if showToast}
<div class="toast z-50 toast-top toast-center md:toast-bottom md:toast-end w-full md:max-w-md" transition:slide>
    <div class="alert { $message.status === 'success' ? 'alert-success' : 'alert-error' } flex items-center justify-between">
      <div class="flex-grow text-center text-sm font-medium">{$message.text}</div>
      <button class="btn btn-sm btn-circle btn-ghost text-neutral" on:click={() => showToast = false} aria-label="Close">
        ✕
      </button>
    </div>
</div>
{/if}

<div class="hero">
    <div class="hero-content text-center">
        <div class="max-w-md">
            <h1 class="text-4xl font-bold">Evento {evento.nome}</h1>
        </div>
    </div>
</div>

<div class="flex flex-col lg:flex-row justify-around">
    <div class="flex flex-col gap-1 w-full max-w-md">
        <form
            enctype="multipart/form-data"
            action="?/edit"
            class="w-full max-w-md"
            method="POST"
            use:enhance
        >
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

            <TextArea
                id="descrizione"
                label="Descrizione"
                bind:value={$form.descrizione}
                errors={$errors.descrizione}
                {...$constraints.descrizione}
            />

            <div class="form-control mt-6">
                <button
                    class="btn btn-primary"
                    type="submit"
                    disabled={!enableButton}>Salva</button
                >
            </div>
        </form>
        <DangerDelete delete_function={delete_evento} item_name="evento" />
    </div>

    {#if openChooser}
        <div class="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div
                class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 w-full rounded-lg"
            >
                <ListChooser
                    eventoId={evento.id}
                    bind:openChooser
                    bind:selectedLists
                    on:save={addListe}
                />
            </div>
        </div>
    {/if}

    <ListeEvento
        {listeEvento}
        {evento}
        bind:open={openChooser}
        on:delete_lista={delete_lista}
    />
</div>
