<script>
	import { stores, goto } from '@sapper/app'

	const { session } = stores()

	export let segment;

	async function logoin() {
		try {
			const options = {
				method: 'POST'
			}

			const response = await fetch('/api/login', options)
			const { token, user } = await response.json()

			session.set({ isAuth: true, user })
		} catch (error) {
			alert('not available, please run locally')
		}
	}

	function logout() {
		session.set({ isAuth: false, user: null })
		document.cookie = 'jwt-token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

		goto('/')
	}
</script>

<style lang="scss">
	@import '../styles/variables.scss';

	nav {
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding: 0 1em;
		display: flex;
    justify-content: space-between;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: $primary-color;
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}

	button {
		margin: 1em 0.5em;
		color: white;
		background-color: $primary-color;
		border: none;
		border-radius: 5%;
		padding: 0.5rem;
		font-size: 14px;
		cursor: pointer;
		transition: 0.3s;

		&:hover {
			opacity: 0.7;
		}
	}
</style>

<nav>
	<ul>
		<li><a aria-current="{segment === undefined ? 'page' : undefined}" href=".">home</a></li>
		<li><a aria-current="{segment === 'about' ? 'page' : undefined}" href="about">about</a></li>

		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
		<li><a rel=prefetch aria-current="{segment === 'blog' ? 'page' : undefined}" href="blog">blog</a></li>
	</ul>

	<ul>
    {#if $session.isAuth}
			<li><a aria-current="{segment === 'profile' ? 'page' : undefined}" href='profile'>profile</a></li>
			<li><button on:click|once={logout}>log out</button></li>
		{:else}
			<li><button on:click|once={logoin}>log in</button></li>
    {/if}
  </ul>
</nav>
