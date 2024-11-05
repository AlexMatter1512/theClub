<script lang="ts">
	export let value = '';
	export let placeholder = '';
	export let id;
	export let label;
	export let disabled = false;
	export let required = false;
	export let errors;
	export let constraints: any | undefined = undefined;
</script>

<div class="form-control w-full max-w-lg mb-2">
	<label for={id} class="label font-medium pb-1">
		<span class="label-text">{label}</span>
	</label>
	<textarea
		class="textarea textarea-bordered w-full max-w-lg"
		{placeholder}
		{required}
		{disabled}
		{id}
		name={id}
		bind:value={value}
		{...constraints}
	>
	</textarea>

	{#if errors}
		{#each errors as error}
			<label for="{id}" class="label">
				<span class="label-text-alt text-error">{error}</span>
			</label>
		{/each}
	{/if}
</div>