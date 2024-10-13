<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Pencil } from 'svelte-heros-v2';
	import { Input } from '$lib/components/index';
    import type { ActionResult } from '@sveltejs/kit';

	export let data;
	let loading: boolean;

	$: loading = false;
	const showPreview = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const files = target?.files;

		if (files && files.length > 0) {
			const src = URL.createObjectURL(files[0]);
			const preview = document.getElementById('avatar-preview') as HTMLImageElement;
			preview.src = src;
		}
	};

	const submitUpdateProfile = () => {
		loading = true;
		return async ({ result }: {result: ActionResult }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					break;
				case 'error':
					break;
				default:
					await applyAction(result);
			}
			loading = false;
		};
	};
</script>

<div class="flex flex-col w-full h-full items-center">
	<form
		action="?/updateProfile"
		method="POST"
		class="flex flex-col space-y-2 w-full max-w-md"
		enctype="multipart/form-data"
		use:enhance={submitUpdateProfile}
	>
		<h3 class="text-2xl font-medium text-center">Modifica il tuo Profilo</h3>
		<div class="flex flex-col items-center form-control w-full max-w-lg">
			<label for="avatar" class="label font-medium pb-1">
				<span class="label-text">Foto Profilo</span>
			</label>
			<label for="avatar" class="avatar w-32 rounded-full hover:cursor-pointer">
				<label for="avatar" class="absolute -bottom-0.5 -right-0.5 hover:cursor-pointer">
					<span class="btn btn-circle btn-sm btn-secondary">
						<Pencil class="w-4 h-4" />
					</span>
				</label>
				<div class="w-32 rounded-full">
					<img
						src={data.cliente?.avatar ? data.cliente.avatar : `https://ui-avatars.com/api/?name=${data.cliente?.nome}`}
						alt="user avatar"
						id="avatar-preview"
					/>
				</div>
			</label>
			<input
				type="file"
				name="avatar"
				id="avatar"
				value=""
				accept="image/*"
				hidden
				on:change={showPreview}
				disabled={loading}
			/>
		</div>
		<Input id="nome" label="Nome" value={data?.cliente?.nome} disabled={loading} />
		<Input id="cognome" label="Cognome" value={data?.cliente?.cognome} disabled={loading} />
		<div class="w-full max-w-lg pt-3">
			<button class="btn btn-primary w-full max-w-lg" type="submit" disabled={loading}>
				Salva
			</button>
		</div>
	</form>
</div>