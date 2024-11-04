<script>
	import Input from "$lib/components/Input.svelte";
	import { loginSchema } from "$lib/schemas";
    import { slide } from "svelte/transition";
	import { superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";

	export let data;

	const { form, errors, constraints, message, enhance } = superForm(
		data.form,
		{
			validators: zodClient(loginSchema),
		},
	);

	let showToast = false;
	$: if ($message) {
		showToast = true;
		setTimeout(() => {
			showToast = false;
		}, 3000);
	}
</script>

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

<div class="flex flex-col items-center h-full w-full px-10">
	<h2
		class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content"
	>
		Accedi al tuo account
	</h2>
	<p class="text-center mt-1">
		O <a
			href="/auth/register"
			class="text-primary font-medium hover:cursor-pointer hover:underline"
			>registrati</a
		> se non l'hai ancora fatto.
	</p>
	<form
		action="?/login"
		method="POST"
		class="flex flex-col items-center space-y-2 w-full max-w-md pt-4"
		use:enhance
	>
		<Input
			id="email"
			label="Email"
			type="email"
			errors={$errors.email}
			bind:value={$form.email}
		></Input>
		<Input
			id="password"
			label="Password"
			type="password"
			errors={$errors.password}
			bind:value={$form.password}
		></Input>
		<div class="w-full max-w-md">
			<a
				href="/reset-password"
				class="font-medium text-primary hover:cursor-pointer hover:underline"
			>
				Password dimenticata?</a
			>
		</div>

		<div class="w-full max-w-md pt-2">
			<button type="submit" class="btn btn-primary w-full">Login</button>
		</div>
	</form>
</div>
