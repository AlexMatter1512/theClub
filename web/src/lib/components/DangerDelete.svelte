<script>
    export let delete_function;
    export let item_name;
    export let additional_text = "";
    export let easteregg = "Mbare, io ti ho avvertito!";
</script>
<div class="collapse text-black w-full max-w-md rounded-lg">
    <input type="checkbox" class="peer" />
    <div class="collapse-title px-4 text-center bg-error peer-checked:bg-warning">
      <b>Elimina {item_name}</b>
    </div>
    <div class="collapse-content bg-error peer-checked:bg-warning">
        <button class="btn btn-error w-full" on:click={delete_function}>
            ⚠️ Conferma ⚠️
        </button>
        <p><b>ATTENZIONE:</b> Questa azione è irreversibile. <br></p>
        <p>{additional_text}</p>
        <p class="text-xs text-gray-400">{easteregg}</p>
        
    </div>
</div>