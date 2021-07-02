<script lang="ts">
    import { auth, googleProvider } from "./firebase"
    import { Button } from "sveltestrap"
    function login() {
        auth.signInWithPopup(googleProvider);
    }
</script>

<div class="d-flex justify-content-center pt-4">
    <Button on:click="{login}" color="dark" outline>Sign in</Button>
</div>