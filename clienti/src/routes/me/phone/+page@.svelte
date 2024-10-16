<script lang="ts">
  import Input from "$lib/components/Input.svelte";
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { verifyPhoneSchema } from '$lib/schemas';
    import { goto } from "$app/navigation";
  export let data;

  const { form, errors, constraints, message, enhance } = superForm(data.form, {
    validators: zodClient(verifyPhoneSchema)
  });

  if (data.form.valid){
    setTimeout(() => {
      goto("/")
    }, 2000);
  }
</script>

{#if $message}
  {#if data.form.valid}
    <div class="alert alert-success">
      {$message}    
    </div>
  {:else}
    <div class="alert alert-danger">
      {$message}
    </div>
  {/if}
{/if}

<div class="hero">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">Ultimo Step</h1>
      <p class="py-6 text-left">
        Prima di poterti iscrivere agli eventi devi verificare il tuo account.<br>
        Per favore inserisci il codice che ti abbiamo inviato via SMS.
      </p>

      <form action="?/verify" method="POST" use:enhance>
        <Input
          label="Codice di Verifica"
          id="code"
          bind:value={$form.code}
          errors={$errors.code}
          {...$constraints.code}
        />
        <button type="submit" class="btn btn-primary w-full">Verifica</button>
      </form>
    </div>
  </div>
</div>