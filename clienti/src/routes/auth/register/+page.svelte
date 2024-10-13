<script lang="ts">
	import Input from "$lib/components/Input.svelte";
	export let form;
</script>

<div class="flex flex-col items-center h-full w-full px-10">
	<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
		Crea un nuovo account
	</h2>
	<p class="text-center mt-1">
		O <a href="/auth/login" class="text-primary font-medium hover:cursor-pointer hover:underline">
		accedi</a> se ne hai già uno.
	</p>

	<form action="?/register" method="POST" class="flex flex-col items-center space-y-2 w-full max-w-md pt-4">
		<Input
			type="text"
			id="name"
			label="Nome"
			value={form?.data?.name}
			errors={form?.errors?.name}
		/>
		<Input
			type="text"
			id="surname"
			label="Cognome"
			value={form?.data?.surname}
			errors={form?.errors?.surname}
		/>
		<Input
			type="date"
			id="birthdate"
			label="Data di Nascita"
			value={form?.data?.birthdate}
			errors={form?.errors?.birthdate}
		/>
		<Input
			type="email"
			id="email"
			label="Email"
			value={form?.data?.email}
			errors={form?.errors?.email}
		/>
		<Input
			type="tel"
			id="phone"
			label="Numero di Telefono"
			value={form?.data?.phone}
			errors={form?.errors?.phone}
		/>
		<Input
			type="password"
			id="password"
			label="Password"
			errors={form?.errors?.password}
		/>
		<Input
			type="password"
			id="passwordConfirm"
			label="Conferma Password"
			errors={form?.errors?.passwordConfirm}
		/>
		<div class="w-full max-w-md pt-2">
			<button type="submit" class="btn btn-primary w-full">Registrati</button>
		</div>
	</form>
</div>