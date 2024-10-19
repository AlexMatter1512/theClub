<script lang="ts">
	import { Pencil } from "svelte-heros-v2";
	import { Input } from "$lib/components/index";
	import AvatarEdit from "$lib/components/AvatarEdit.svelte";
	import SuperDebug, { superForm, fileProxy } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { updateProfileSchema } from "$lib/schemas";
    import { slide } from "svelte/transition";
    import { onMount } from "svelte";
	export let data;

	const { form, errors, constraints, message, enhance } = superForm(
		data.form,
		{
			validators: zodClient(updateProfileSchema),
			invalidateAll: "force",
		},
	);

	let originalForm = JSON.stringify($form);
	$: disabled = JSON.stringify($form) === originalForm ? "btn-disabled" : "";

	// Add fileProxy to handle the avatar file input
	const file = fileProxy(form, "avatar");

    let showMessage = false;
    // Reactive statement to automatically hide the message after a delay
	$: if ($message && data.form.valid) {
		showMessage = true;
		originalForm = JSON.stringify(data.form.data);
		setTimeout(() => {
			showMessage = false;
		}, 3000); // Adjust the time (3000ms = 3 seconds) as needed
		console.log("Message shown");
	}
</script>

<SuperDebug data={form} />
	{#if showMessage}
		<div transition:slide class="alert alert-success shadow-lg w-full max-w-md">
			<span>{$message}</span>
		</div>
	{/if}

	<form
		action="?/updateProfile"
		method="POST"
		class="flex flex-col space-y-4 w-full max-w-md"
		enctype="multipart/form-data"
		use:enhance
	>
		<!-- Avatar Section -->
		<div class="flex flex-col items-center form-control w-full max-w-lg">
		<AvatarEdit
			src={data.cliente?.avatar
				? data.cliente.avatar
				: `https://ui-avatars.com/api/?name=${data.cliente?.name}`}
			bind:file={$file}
			errors={$errors.avatar}
			name="avatar"
		/>
	  	</div>

		<!-- Input Fields -->
		<Input
			id="name"
			label="Nome"
			bind:value={$form.name}
			errors={$errors.name}
			{...$constraints.name}
		/>
		<Input
			id="surname"
			label="Cognome"
			bind:value={$form.surname}
			errors={$errors.surname}
			{...$constraints.surname}
		/>
		<Input
			id="birthdate"
			label="Data di Nascita"
			type="date"
			bind:value={$form.birthdate}
			errors={$errors.birthdate}
			{...$constraints.birthdate}
		/>

		<div class="w-full pt-4">
			<button type="submit" class="btn btn-primary w-full {disabled}">
				Salva
			</button>
		</div>
	</form>