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

    // onMount(async () => {
    //     if (src) {
    //         const response = await fetch(src);
    //         const blob = await response.blob();
    //         const fileName = src.split('/').pop() || 'file';
    //         const fileObject = new File([blob], fileName, { type: blob.type });

    //         // Creating a DataTransfer object to simulate a FileList
    //         const dataTransfer = new DataTransfer();
    //         dataTransfer.items.add(fileObject);

    //         // Assign the created FileList to `file`
    //         file = dataTransfer.files;
    //     }
    // });
</script>

<label for="image" class="label font-medium pb-1">
    <span class="label-text">Poster</span>
</label>
<label for={name} class="relative hover:cursor-pointer block max-w-xs w-full">
    <!-- Rectangular image for preview with max width capped to `sm` -->
    <!-- svelte-ignore a11y_img_redundant_alt -->
    <img {src} alt="image preview" id="image-preview" class="w-full object-cover rounded-lg" />

    <!-- Pencil icon slightly overlapping the image -->
    <span
        class="absolute bottom-4 right-4 btn btn-circle btn-sm btn-secondary"
    >
        <Pencil class="w-4 h-4" />
    </span>
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