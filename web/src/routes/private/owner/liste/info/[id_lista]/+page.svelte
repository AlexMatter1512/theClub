<script>
    export let data;

    const lista = data.lista;
</script>

<div class="hero">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Modifica Lista <br> {lista.nome}</h1>
        <p>{lista.descrizione}</p>
      </div>
    </div>
</div>
