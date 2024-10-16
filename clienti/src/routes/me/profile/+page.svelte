<script lang="ts">
	import ProfileForm from '$lib/components/Forms/ProfileForm.svelte';
	export let data;

</script>

<!-- <SuperDebug data={form} /> -->

<div class="flex flex-col w-full h-full items-center p-4">
	<h3 class="text-2xl font-medium text-center">Modifica il tuo Profilo</h3>

	<ProfileForm {data} />

</div>
