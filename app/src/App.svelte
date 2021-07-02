<script lang="ts">
	import { Router, Route } from "svelte-navigator"
</script>

<Router>
	<Route path="/">
		<p>Welcome to LinkMania</p>
	</Route>
	<Route path="/tree/:user" let:params>
		<p>data: uid {params.user}</p>
	</Route>
</Router>