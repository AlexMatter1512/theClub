<script lang="ts">
  import { env } from "$env/dynamic/public";

  const orgName = env.PUBLIC_ORG_NAME || "Club";
</script>
<div class="hero">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">Welcome to {orgName} Admin</h1>
      <p class="py-6">Manage all your event organization activities in one place.</p>
      <a href="/auth/login" class="btn btn-primary">Login</a>
    </div>
  </div>
</div>