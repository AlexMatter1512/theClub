<script lang="ts">
    import { page } from "$app/stores";

    $: profiloActive = $page.route.id === "/me/profile" ? "active" : "";
    $: eventiActive = $page.route.id?.includes("/me/eventi") ? "active" : "";

</script>
<div class="flex flex-col items-center">
    <ul class="menu menu-horizontal bg-base-300 rounded-box mb-4">
        <li><a class="{profiloActive}" href="/me/profile">Profilo</a></li>
        <li><a class="{eventiActive}" href="/me/eventi/inProgramma">Eventi</a></li>
    </ul>
</div>
<div>
    <slot/>
</div>