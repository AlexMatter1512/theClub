<script lang="ts">
    import EventCard from "$lib/components/EventCard.svelte";
    export let data;

    let eventi = data.eventi;

</script>

<div class="hero">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold"> 
            <p>Eventi</p>
        </h1>
      </div>
    </div>
</div>

<div class="flex justify-around flex-wrap gap-4">
    {#each eventi as evento}
        <EventCard backgroud={"base-300"} evento={evento} edit={data.user.owner} />
    {/each}

</div>

