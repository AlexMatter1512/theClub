<script>
    import Input from "$lib/components/Input.svelte";
    import { userSchema } from "$lib/schemas"; // Ensure this imports your registration schema
    import { slide } from "svelte/transition";
    import SuperDebug, { superForm } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
	import { env } from "$env/dynamic/public";

    export let data;

    // Initialize the superForm with userSchema for validation
    const { form, errors, constraints, message, enhance } = superForm(
        data.form,
        {
            validators: zodClient(userSchema),
        },
    );

    let showToast = false;

    // State to toggle password visibility
    let showPasswords = false;

    // Reactive statement to handle toast visibility based on message
    $: if ($message) {
        showToast = true;
        setTimeout(() => {
            showToast = false;
        }, 3000);
    }
</script>

<!-- Toast Notification -->
{#if showToast}
    <div class="toast toast-top toast-center md:toast-bottom md:toast-end w-full md:max-w-md" transition:slide>
        <div class="alert { $message.status === 'success' ? 'alert-success' : 'alert-error' } flex items-center justify-between">
            <div class="flex-grow text-center text-sm font-medium">{$message.text}</div>
            <button
                class="btn btn-sm btn-circle btn-ghost text-neutral"
                on:click={() => showToast = false}
                aria-label="Close"
            >
                ✕
            </button>
        </div>
    </div>
{/if}

{#if env.PUBLIC_DEBUG === "true"}
	<SuperDebug data={$form} />
{/if}

<!-- Registration Form -->
<div class="flex flex-col items-center h-full w-full px-10">
    <h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
        Registrati
    </h2>
    <p class="text-center mt-1">
        O <a href="/auth/login" class="text-primary font-medium hover:cursor-pointer hover:underline">accedi</a> se hai già un account.
    </p>
    <form
        action="?/register"
        method="POST"
        class="flex flex-col items-center space-y-4 w-full max-w-md pt-4"
        use:enhance
    >
        <!-- Name Field -->
        <Input
            id="name"
            label="Nome"
            type="text"
            placeholder="Inserisci il tuo nome"
            errors={$errors.name}
            bind:value={$form.name}
        />

        <!-- Surname Field -->
        <Input
            id="surname"
            label="Cognome"
            type="text"
            placeholder="Inserisci il tuo cognome"
            errors={$errors.surname}
            bind:value={$form.surname}
        />

        <!-- Email Field -->
        <Input
            id="email"
            label="Email"
            type="email"
            placeholder="Inserisci la tua email"
            errors={$errors.email}
            bind:value={$form.email}
        />

        <!-- Password Field -->
        <Input
            id="password"
            label="Password"
            type={showPasswords ? "text" : "password"}
            placeholder="Inserisci la tua password"
            errors={$errors.password}
            bind:value={$form.password}
        />

        <!-- Confirm Password Field -->
        <Input
            id="passwordConfirm"
            label="Conferma Password"
            type={showPasswords ? "text" : "password"}
            placeholder="Conferma la tua password"
            errors={$errors.passwordConfirm}
            bind:value={$form.passwordConfirm}
        />

        <!-- Show Passwords Checkbox -->
        <div class="flex items-center w-full max-w-md">
            <input
                type="checkbox"
                id="showPasswords"
                bind:checked={showPasswords}
                class="mr-2 checkbox checkbox-primary"
            />
            <label for="showPasswords" class="text-sm font-medium text-base-content">
                Mostra Password
            </label>
        </div>

        <!-- Submit Button -->
        <div class="w-full">
            <button type="submit" class="btn btn-primary w-full">Registrati</button>
        </div>
    </form>
</div>