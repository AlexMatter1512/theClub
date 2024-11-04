<script lang="ts">
    import { onMount } from "svelte";
    import { Pencil } from "svelte-heros-v2";

    export let src;
    export let file: FileList | undefined;
    export let errors;
    export let name;

    const showPreview = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const files = target?.files;

        if (files && files.length > 0) {
            const src = URL.createObjectURL(files[0]);
            const preview = document.getElementById(
                "image-preview",
            ) as HTMLImageElement;
            preview.src = src;
        }
    };
</script>

<label for="image" class="label font-medium pb-1">
    <span class="label-text">Poster</span>
</label>
<label for={name} class="hover:cursor-pointer block w-full p-4">
    <div class="flex flex-col justify-end items-end bg-cover bg-center w-full aspect-[9/13] shadow-xl rounded-xl overflow-hidden p-4" style="background-image: url({src});">
        <!-- Pencil icon slightly overlapping the image -->
        <span
            class="btn btn-circle btn-sm btn-secondary"
        >
            <Pencil class="w-4 h-4" />
        </span>
    </div>
</label>

<!-- Hidden file input -->
<input
    type="file"
    id={name}
    {name}
    accept="image/*"
    hidden
    bind:files={file}
    on:change={(e) => showPreview(e)}
/>

<!-- Display validation errors if any -->
{#if errors}
    <div class="text-error text-sm mt-1">{errors}</div>
{/if}