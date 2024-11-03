<script lang="ts">
    import { page } from "$app/stores";

    $: InProgramma = $page.route.id === "/me/eventi/inProgramma" ? "active" : "";
    $: Archivio = $page.route.id === "/me/eventi/archivio" ? "active" : "";

</script>
<div class="flex flex-col items-center">
    <ul class="menu menu-horizontal bg-base-300 rounded-box mb-4">
        <li><a class="{InProgramma}" href="/me/eventi/inProgramma">In Programma</a></li>
        <li><a class="{Archivio}" href="/me/eventi/archivio">Archivio</a></li>
    </ul>
</div>
<div>
    <slot/>
</div>