<script context="module">
  export async function preload(_, session) {
    if (!session.isAuth) {
      return this.redirect(302, '/');
    }

    return { user: session.user };
  }
</script>

<script>
  export let user;
</script>

<svelte:head>
  <title>Profile</title>
</svelte:head>

<h1>Hi {user.username}</h1>

<p>This is secret page</p>
