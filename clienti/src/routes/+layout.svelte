<script lang="ts">
    import { page } from '$app/stores';
	import '../app.css';
	export let data;
	$: dashboard_link_name = $page.route.id === '/' ? 'The Club' : 'Eventi';
</script>

<div class="flex flex-col min-h-screen">
	<nav class="navbar z-20">
		<div class="flex-1">
			<a href="/" class="btn normal-case text-xl">{dashboard_link_name}</a>
		</div>
		<div class="flex-none">
			{#if !data.cliente}
				<div>
					<a href="/auth/login" class="btn btn-sm btn-outline">Login</a>
					<a href="/auth/register" class="btn btn-sm btn-outline">Registrati</a>
				</div>
			{:else}
				<div class="ml-1 dropdown dropdown-hover dropdown-end">
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label tabindex="0" class="btn btn-ghost btn-circle avatar">
						<div class="w-10 rounded-full">
							<img src={data.cliente.avatar || `https://ui-avatars.com/api/?name=${data.cliente?.name}`} alt="Avatar" />
						</div>
					</label>
					
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<ul tabindex="0" class="dropdown-content menu bg-base-300 rounded-box z-[1] w-52 p-2 shadow">
						<li>
							<a href="/me/profile">Profilo</a>
						</li>
						<li>
							<a href="/me/eventi">I miei eventi</a>
						</li>
						<li>
							<button class="btn btn-sm btn-outline btn-error justify-normal" on:click={() => {fetch('/logout', {method: 'POST'}).then((response) => window.location.href = response.url)}}>Logout</button>
						</li>
					</ul>
				</div>
			{/if}
		</div>
	</nav>
	
	<div class="flex-grow">
		<slot />
	</div>

	<footer class="footer bg-base-300 text-neutral-content items-center p-4 z-20">
		<aside class="grid-flow-col items-center">
		  <p>Copyright TheClub © {new Date().getFullYear()} - All right reserved</p>
		<a href="/privacy-policy" class="link link-hover">Privacy Policy</a>
		</aside>
		<nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
		  <a href="https://www.instagram.com/theclub095/" target="_blank" rel="noopener" aria-label="Instagram">
			<svg class="fill-base-content" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px">    <path d="M 8 3 C 5.243 3 3 5.243 3 8 L 3 16 C 3 18.757 5.243 21 8 21 L 16 21 C 18.757 21 21 18.757 21 16 L 21 8 C 21 5.243 18.757 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.654 5 19 6.346 19 8 L 19 16 C 19 17.654 17.654 19 16 19 L 8 19 C 6.346 19 5 17.654 5 16 L 5 8 C 5 6.346 6.346 5 8 5 z M 17 6 A 1 1 0 0 0 16 7 A 1 1 0 0 0 17 8 A 1 1 0 0 0 18 7 A 1 1 0 0 0 17 6 z M 12 7 C 9.243 7 7 9.243 7 12 C 7 14.757 9.243 17 12 17 C 14.757 17 17 14.757 17 12 C 17 9.243 14.757 7 12 7 z M 12 9 C 13.654 9 15 10.346 15 12 C 15 13.654 13.654 15 12 15 C 10.346 15 9 13.654 9 12 C 9 10.346 10.346 9 12 9 z"/></svg>
		  </a>	
		  <a href="https://t.me/theclubcatania" target="_blank" rel="noopener" aria-label="Instagram">
			<svg class="fill-base-content" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px">    <path d="M 20.572266 3.0117188 C 20.239891 2.9764687 19.878625 3.028375 19.515625 3.171875 C 19.065625 3.348875 12.014406 6.3150313 5.4414062 9.0820312 L 3.2695312 9.9960938 C 2.4285313 10.337094 2.0039062 10.891672 2.0039062 11.638672 C 2.0039062 12.161672 2.22525 12.871063 3.28125 13.289062 L 6.9472656 14.757812 C 7.2642656 15.708813 8.0005469 17.916906 8.1855469 18.503906 C 8.2955469 18.851906 8.5733906 19.728594 9.2753906 19.933594 C 9.4193906 19.982594 9.5696563 20.007813 9.7226562 20.007812 C 10.165656 20.007812 10.484625 19.801641 10.640625 19.681641 L 12.970703 17.710938 L 15.800781 20.328125 C 15.909781 20.439125 16.486719 21 17.261719 21 C 18.228719 21 18.962234 20.195016 19.115234 19.416016 C 19.198234 18.989016 21.927734 5.2870625 21.927734 5.2890625 C 22.172734 4.1900625 21.732219 3.6199531 21.449219 3.3769531 C 21.206719 3.1694531 20.904641 3.0469688 20.572266 3.0117188 z M 19.910156 5.171875 C 19.533156 7.061875 17.478016 17.378234 17.166016 18.865234 L 13.029297 15.039062 L 10.222656 17.416016 L 11 14.375 C 11 14.375 16.362547 8.9468594 16.685547 8.6308594 C 16.945547 8.3778594 17 8.2891719 17 8.2011719 C 17 8.0841719 16.939781 8 16.800781 8 C 16.675781 8 16.506016 8.1197812 16.416016 8.1757812 C 15.272669 8.8885973 10.404094 11.662239 8.0078125 13.025391 L 4.53125 11.636719 L 6.21875 10.927734 C 10.51775 9.1177344 18.174156 5.893875 19.910156 5.171875 z"/></svg>
		  </a>	
		  <a href="https://www.tiktok.com/@theclub095?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener" aria-label="Instagram">
			<svg class="fill-base-content" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path d="M 6 3 C 4.3550302 3 3 4.3550302 3 6 L 3 18 C 3 19.64497 4.3550302 21 6 21 L 18 21 C 19.64497 21 21 19.64497 21 18 L 21 6 C 21 4.3550302 19.64497 3 18 3 L 6 3 z M 6 5 L 18 5 C 18.56503 5 19 5.4349698 19 6 L 19 18 C 19 18.56503 18.56503 19 18 19 L 6 19 C 5.4349698 19 5 18.56503 5 18 L 5 6 C 5 5.4349698 5.4349698 5 6 5 z M 12 7 L 12 14 C 12 14.56503 11.56503 15 11 15 C 10.43497 15 10 14.56503 10 14 C 10 13.43497 10.43497 13 11 13 L 11 11 C 9.3550302 11 8 12.35503 8 14 C 8 15.64497 9.3550302 17 11 17 C 12.64497 17 14 15.64497 14 14 L 14 10.232422 C 14.616148 10.671342 15.259118 11 16 11 L 16 9 C 15.952667 9 15.262674 8.7809373 14.78125 8.3613281 C 14.299826 7.941719 14 7.4149911 14 7 L 12 7 z"/></svg>
		  </a>		  
		</nav>
	  </footer>
</div>