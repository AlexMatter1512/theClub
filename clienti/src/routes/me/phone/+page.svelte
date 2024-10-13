<script lang="ts">
  import Input from "$lib/components/Input.svelte";
  export let form;
</script>

{#if form?.status}
  <div class="alert alert-danger">
    {form.status}
  </div>
{/if}

<div class="hero">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Ultimo Step</h1>
        <p class="py-6 text-left">
          Prima di poterti iscrivere agli eventi devi verificare il tuo account. <br>
          Per favore inserisci il codice che ti abbiamo inviato via sms.
        </p>

        <form action="?/verify" method="POST">
          <Input label="Codice di Verifica" id="code" errors={form?.errors?.code}/>
          <button type="submit" class="btn btn-primary w-full">Verifica</button>
        </form>

      </div>
    </div>
</div>