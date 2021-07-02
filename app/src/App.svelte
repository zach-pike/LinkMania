<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css">
</svelte:head>

<script lang="ts">
	import { Router, Route } from "svelte-navigator"
	import { 
		Navbar,
		NavbarBrand,
		NavItem
	} from "sveltestrap"
</script>

<Navbar color="dark">
	<NavbarBrand>
		<span class="LinkManiaLogoLink">Link</span>Mainia
	</NavbarBrand>
</Navbar>

<Router>
	<Route path="/">
		<p>Welcome to LinkMania</p>
	</Route>
	<Route path="/tree/:user" let:params>
		<p>data: {params.user}.</p>
	</Route>
</Router>

<style>
	.LinkManiaLogoLink {
		text-decoration: underline;
		color: #0000EE;
	}
</style>