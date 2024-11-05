<script lang="ts">
	import FileInput from "$lib/components/FileInput.svelte";
	import Input from "$lib/components/Input.svelte";
	import { registerUserSchema } from "$lib/schemas";
    import { slide } from "svelte/transition";
	import { superForm, fileProxy } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	export let data;

	$: submitButton = {
		text: "Registrati",
		class: "btn-primary",
	};
	const { form, errors, constraints, message, enhance } = superForm(
		data.form,
		{
			validators: zodClient(registerUserSchema),
			resetForm: false,
			onSubmit() {
				submitButton = {
					text: "Quasi fatto...",
					class: "btn-disabled",
				};
			},
		},
	);

	// Add fileProxy to handle the avatar file input
	const file = fileProxy(form, "avatar");

	let showToast = false;
	$: if ($message) {
		showToast = true;
		submitButton = {
			text: "Registrati",
			class: "btn-primary",
		};
		setTimeout(() => {
			showToast = false;
		}, 3000);
	}
</script>

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
<div class="flex flex-col items-center h-full w-full px-10">
	<h2
		class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content"
	>
		Crea un nuovo account
	</h2>
	<p class="text-center mt-1">
		O
		<a
			href="/auth/login"
			class="text-primary font-medium hover:cursor-pointer hover:underline"
		>
			accedi
		</a>
		se ne hai già uno.
	</p>

	<form
		action="?/register"
		method="POST"
		use:enhance
		enctype="multipart/form-data"
		class="flex flex-col items-center space-y-4 w-full max-w-md py-4"
	>
		<!-- Login Section -->
		<div class="w-full">
			<h3 class="text-xl font-semibold mb-2">Dati di Accesso</h3>
			<div class="space-y-2">
				<Input
					type="email"
					id="email"
					label="Email"
					bind:value={$form.email}
					errors={$errors.email}
					{...$constraints.email}
				/>
				<Input
					type="password"
					id="password"
					label="Password"
					bind:value={$form.password}
					errors={$errors.password}
					{...$constraints.password}
				/>
				<Input
					type="password"
					id="passwordConfirm"
					label="Conferma Password"
					bind:value={$form.passwordConfirm}
					errors={$errors.passwordConfirm}
					{...$constraints.passwordConfirm}
				/>
			</div>
		</div>

		<!-- Other Info Section -->
		<div class="w-full mt-4">
			<h3 class="text-xl font-semibold mb-2">Altre Informazioni</h3>
			<div class="space-y-2">
				<Input
					type="text"
					id="name"
					label="Nome"
					bind:value={$form.name}
					errors={$errors.name}
					{...$constraints.name}
				/>
				<Input
					type="text"
					id="surname"
					label="Cognome"
					bind:value={$form.surname}
					errors={$errors.surname}
					{...$constraints.surname}
				/>
				<Input
					type="date"
					id="birthdate"
					label="Data di Nascita"
					bind:value={$form.birthdate}
					errors={$errors.birthdate}
					{...$constraints.birthdate}
				/>
				<Input
					type="tel"
					id="phone"
					label="Numero di Telefono"
					bind:value={$form.phone}
					errors={$errors.phone}
					{...$constraints.phone}
				/>
				<FileInput
					id="avatar"
					label="Avatar (opzionale)"
					bind:file={$file}
					errors={$errors.avatar}
				/>
			</div>
		</div>

		<div class="w-full pt-4">
			<button type="submit" class="btn {submitButton.class} w-full"
				>{submitButton.text}</button
			>
		</div>
		<div class="text-center text-sm mt-4">
			Cliccando Registrati accetti la
			<a
				href="/privacy-policy"
				class="text-primary font-medium hover:cursor-pointer hover:underline"
			>
				Privacy Policy
			</a>.
		</div>
	</form>
</div>
