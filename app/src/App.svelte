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
		NavLink,
		Nav
	} from "sveltestrap"


	import Login from "./login.svelte";
	import Homepage from "./homepage.svelte"
	import EditableList from "./linktree/editable.svelte"
	import Linklist from "./linktree/linklist.svelte";

	import { auth } from './firebase';
    import { authState } from 'rxfire/auth';

    let user;

    const unsubscribe = authState(auth).subscribe(u => user = u);
</script>

<Navbar color="dark">
	<NavbarBrand>
		<span class="LinkManiaLogoLink">Link</span>Mainia
	</NavbarBrand>
	<Nav>
		<NavItem class="justify-content-right">
			<NavLink href="/mylinks">My Links</NavLink>
		</NavItem>
		{#if user}
			<NavItem>
				<NavLink href="#" on:click="{() => { auth.signOut(); location.replace("/") }}">Logout</NavLink>
			</NavItem>
		{/if}
	</Nav>
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
			<Linklist uidToFind="{params.user}" />
		</Route>

		<Route path="/mylinks">
			{#if user} 
				<EditableList uid={user.uid} />
				{:else}
				<!-- Send back to login page bcs no user -->
				<p>Please <a href="/">Login</a></p>
			{/if}
		</Route>
	</Router>
</Container>
<style>
	.LinkManiaLogoLink {
		text-decoration: underline;
		color: #0000EE;
	}
</style>