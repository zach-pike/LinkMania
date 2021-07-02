<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css">
</svelte:head>

<script lang="ts">
	import { Router, Route } from "svelte-navigator"
	import { 
		Navbar,
		NavbarBrand,
		NavItem,
		Container,
		NavLink
	} from "sveltestrap"
	import Login from "./login.svelte";
	import Homepage from "./homepage.svelte"

	import { auth } from './firebase';
    import { authState } from 'rxfire/auth';
    let user;

    const unsubscribe = authState(auth).subscribe(u => user = u);
</script>

<Navbar color="dark">
	<NavbarBrand>
		<span class="LinkManiaLogoLink">Link</span>Mainia
	</NavbarBrand>
	<NavItem class="d-flex justify-content-right">
		<NavLink href="/mylinks">My Links</NavLink>
	</NavItem>
</Navbar>

<Container>
	<Router>
		<Route path="/">
			{#if user}
				<Homepage {...user} />
				{:else}
				<Login />
			{/if}
		</Route>
		
		<Route path="/tree/:user" let:params>
			<p>data: {params.user}</p>
		</Route>

		<Route path="/mylinks">
			<p>Your links</p>
		</Route>
	</Router>
</Container>
<style>
	.LinkManiaLogoLink {
		text-decoration: underline;
		color: #0000EE;
	}
</style>