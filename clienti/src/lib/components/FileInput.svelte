<script lang="ts">
	export let file: FileList | undefined;
	export let id;
	export let label;
	export let disabled = false;
	export let required = false;
	export let errors;
</script>

<div class="form-control w-full max-w-lg mb-2">
	<label for={id} class="label font-medium pb-1">
		<span class="label-text">{label}</span>
	</label>
	<input
		class="file-input file-input-bordered w-full max-w-lg"
		type="file"
        placeholder="Scegli un file"
		{required}
		{disabled}
		{id}
		name={id}
		bind:files={file}
	/>
    {#if file && file.length > 0}
        <button type="button" class="btn btn-secondary mt-2" on:click={() => file = undefined}>
            Remove File
        </button>
    {/if}

	{#if errors}
		{#each errors as error}
			<label for="{id}" class="label">
				<span class="label-text-alt text-error">{error}</span>
			</label>
		{/each}
	{/if}
</div>