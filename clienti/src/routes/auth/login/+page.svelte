<script>
    import Input from '$lib/components/Input.svelte';
    import { loginUserSchema } from '$lib/schemas';
	import { superForm } from 'sveltekit-superforms';
    import { zodClient } from 'sveltekit-superforms/adapters';
	export let data;
	const { form, errors, constraints, message, enhance } = superForm(data.form, { validators: zodClient(loginUserSchema)});
</script>

<div class="flex flex-col items-center h-full w-full px-10">
	<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
		Accedi al tuo account
	</h2>
	<p class="text-center mt-1">
		O <a href="/auth/register" class="text-primary font-medium hover:cursor-pointer hover:underline"
			>registrati</a
		> se non l'hai ancora fatto.
	</p>
	{#if $message}
		<div class="alert alert-error shadow-lg w-full max-w-md">
			<span>{$message}</span>
		</div>
	{/if}
	<form action="?/login" method="POST" use:enhance class="flex flex-col items-center space-y-2 w-full max-w-md pt-4">
		<Input
			label="Email"
			id="email"
			type="email"
			placeholder="Inserisci la tua email"
			bind:value={$form.email}
			errors={$errors.email}
			{...$constraints.email}
		/>
		<Input
			label="Password"
			id="password"
			type="password"
			placeholder="Inserisci la tua password"
			bind:value={$form.password}
			errors={$errors.password}
			{...$constraints.password}
		/>
		<div class="w-full max-w-md">
			<a href="/reset-password" class="font-medium text-primary hover:cursor-pointer hover:underline">
				Password Dimenticata?
			</a>
		</div>

		<div class="w-full max-w-md pt-2">
			<button type="submit" class="btn btn-primary w-full">Login</button>
		</div>
	</form>
</div>