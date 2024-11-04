<script lang="ts">
  import { listaSchema } from '$lib/schemas.js';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { DangerDelete, Input } from '$lib/components/index.js';
  import { goto } from '$app/navigation';
  import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
  import { slide } from 'svelte/transition';
  import { env } from '$env/dynamic/public';

  export let data;
  const lista = data.lista;

  const { form, errors, constraints, message, enhance } = superForm(
    data.form,
    {
      validators: zodClient(listaSchema),
      invalidateAll: "force",
      onUpdated: () => {
        originalForm = JSON.stringify($form);
      },
    },
  );
  let originalForm = JSON.stringify($form);
  $: enableButton = JSON.stringify($form) !== originalForm;
  
  let showToast = false;
  $: if ($message) {
    showToast = true;
    setTimeout(() => {
      showToast = false;
    }, 3000);
  }

  async function delete_lista() {
    await fetch(`./${lista.id}`, {
      method: 'DELETE',
    }).then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          goto('../');
        } else {
          $message = {
            status: 'fail',
            text: res.message,
          };
        }
      });
  }
</script>

{#if env.PUBLIC_DEBUG === "true"}
    <SuperDebug data={$form} />
{/if}
<div class="hero">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">{lista.nome}</h1>
        <p>{lista.descrizione}</p>
      </div>
    </div>
</div>

{#if showToast}
<div class="toast toast-top toast-center md:toast-bottom md:toast-end w-full md:max-w-md" transition:slide>
    <div class="alert { $message.status === 'success' ? 'alert-success' : 'alert-error' } flex items-center justify-between">
      <div class="flex-grow text-center text-sm font-medium">{$message.text}</div>
      <button class="btn btn-sm btn-circle btn-ghost text-neutral" on:click={() => showToast = false} aria-label="Close">
        ✕
      </button>
    </div>
</div>
{/if}

<div class="flex flex-col gap-2 items-center w-full my-4">
  <div class="w-full max-w-md">
      <form action="?/edit" method="post" use:enhance>
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
          <button type="submit" class="btn btn-primary w-full" disabled={!enableButton}>
              Salva
          </button>
      </form>
    </div>
    <DangerDelete delete_function={delete_lista} item_name={"lista"} additional_text={"Tutte le iscrizioni per ogni evento andranno perse"} />
</div>

