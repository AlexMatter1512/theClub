<script>
	import '../app.css';
	import { env } from '$env/dynamic/public';
	export let data;

	$: innerWidth = 0
	$:ring_class = data.user?.owner ? 'ring-2 ring-red-500' : 'ring-2 ring-primary'

	const orgName = env.PUBLIC_ORG_NAME || 'Club';
	
</script>
<svelte:window bind:innerWidth />

<div class="min-h-full">
	<nav class="navbar">
		<div class="flex-1">
			<a href="/" class="btn btn-ghost normal-case text-xl">{orgName} Admin</a>
		</div>
		<div class="flex-none">
			{#if !data.user}
				<div>
					<a href="/auth/login" class="btn btn-sm btn-outline">Login</a>
					<a href="/auth/register" class="btn btn-sm btn-outline">Register</a>
				</div>
			{:else if data.user.owner}
				{#if innerWidth > 640}
					<div>
						<a href="/private/owner/eventi" class="btn btn-outline btn-sm">Eventi</a>
						<a href="/private/owner/liste" class="btn btn-outline btn-sm">Liste</a>
						<a href="/private/owner/staff" class="btn btn-outline btn-sm">Staff</a>
					</div>
				{:else}
					<div class="dropdown dropdown-end dropdown-hover">
						<div tabindex="0" role="button" class="btn m-1">Menu</div>
						<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
						<ul tabindex="0" class="dropdown-content menu bg-base-300 rounded-box z-[1] w-52 p-2 shadow">
							<li>
								<a href="/private/owner/eventi">Eventi</a>
							</li>
							<li>
								<a href="/private/owner/liste">Liste</a>
							</li>
							<li>
								<a href="/private/owner/staff">Staff</a>
							</li>
						</ul>
					</div>
				{/if}
			{/if}
			{#if data.user}
				<div class="ml-1 dropdown dropdown-hover dropdown-end">
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label tabindex="0" class="btn btn-ghost btn-circle avatar">
						<div class="w-10 {ring_class} rounded-full">
							<img src={data.user.avatar || `https://ui-avatars.com/api/?name=${data.user?.name}`} alt="User avatar" />
						</div>
					</label>
					
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<ul tabindex="0" class="dropdown-content menu bg-base-300 rounded-box z-[1] w-52 p-2 shadow">
						<li>
							<a href="/private/profile">Profilo</a>
						</li>
						<li>
							<button class="btn btn-sm btn-outline btn-error justify-normal" on:click={() => {fetch('/logout', {method: 'POST'}).then(() => location.reload())}}>Logout</button>
						</li>
					</ul>
				</div>
			{/if}
		</div>
	</nav>
	
	<div class=" p-4">
		<slot />
	</div>
</div>