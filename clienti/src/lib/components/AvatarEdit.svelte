<script lang="ts">
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
                "avatar-preview",
            ) as HTMLImageElement;
            preview.src = src;
        }
    };
</script>

<label for="avatar" class="label font-medium pb-1">
    <span class="label-text">Foto Profilo</span>
</label>
<label for="avatar" class="avatar w-32 rounded-full hover:cursor-pointer">
    <label
        for="avatar"
        class="absolute -bottom-0.5 -right-0.5 hover:cursor-pointer"
    >
        <span class="btn btn-circle btn-sm btn-secondary">
            <Pencil class="w-4 h-4" />
        </span>
    </label>
    <div class="w-32 rounded-full">
        <img {src} alt="avatar" id="avatar-preview" />
    </div>
</label>
<input
    type="file"
    id={name}
    {name}
    accept="image/*"
    hidden
    bind:files={file}
    on:change={(e) => {
        showPreview(e);
    }}
/>
{#if errors}
    <div class="text-error text-sm mt-1">{errors}</div>
{/if}
