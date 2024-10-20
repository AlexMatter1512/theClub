<script lang="ts">
    export let lista;
</script>

<div
    class="relative rounded-lg bg-base-300 shadow-lg p-6"
>
    <div class="flex justify-between items-center">
        <h2 class="text-2xl font-semibold">{lista.nome}</h2>
        <span class="text-sm italic">
            <strong>Created:</strong>
            {new Date(lista.created).toLocaleDateString("it-IT")}
        </span>
    </div>
    <p class="text-md mt-2"><strong>PR Name:</strong> {lista.nome_pr}</p>
    <p class="text-md mt-4">{lista.description}</p>

    <!-- Edit button positioned in the bottom-right corner -->
    <a href="./liste/edit/{lista.id}" class="btn btn-primary btn-sm absolute bottom-4 right-4"> Info </a>
</div>
