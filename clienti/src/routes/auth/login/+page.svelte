<script>
    import Input from '$lib/components/Input.svelte';

	export let form;
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
	<form action="?/login" method="POST" class="flex flex-col items-center space-y-2 w-full max-w-md pt-4">
		<Input
			label="Email"
			id="email"
			type="email"
			placeholder="Inserisci la tua email"
			value={form?.data?.email}
			errors={form?.errors?.email}
		/>
		<Input
			label="Password"
			id="password"
			type="password"
			placeholder="Inserisci la tua password"
			value={form?.data?.password}
			errors={form?.errors?.password}
		/>
		<div class="w-full max-w-md">
			<a href="/reset-password" class="font-medium text-primary hover:cursor-pointer hover:underline">
				Password Dimenticata?
			</a>
		</div>

		<div class="w-full max-w-md pt-2">
			<button type="submit" class="btn btn-primary w-full">Login</button>
		</div>
		
		{#if form?.error}
			<div class="alert alert-error shadow-lg w-full max-w-md">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="stroke-current flex-shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<span>{form.message}</span>
				</div>
			</div>
		{/if}
	</form>
</div>