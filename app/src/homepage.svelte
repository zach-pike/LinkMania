<script lang="ts">
    export let displayName: string;
    export let photoURL: string;
    export let uid: string;

    //firebase stuff
    import { db } from './firebase';

    //add initial firebase data
    import { onMount } from 'svelte';
    onMount(() => {
        let maybe = db.collection("users").doc(uid)

        //get doc and see if it exists
        maybe.get().then(async (doc) => {
            if (!doc.exists) {
                await db.collection("users").doc(uid).set({ uid, displayName, photoURL })

                //add sub collection
                db.collection("users").doc(uid).collection("links").add({ linkText: "MyFirstLink", linkHref: "https://www.google.com", created: Date.now() })
            }
        })
    })
</script>

<div class="jumbotron welcome-banner">
    <h1 class="display-4">Hello, <b>{displayName}!</b></h1>
    <h5 class="lead">Welcome to <span class="LogoTextLink">Link</span><span class="LogoTextMania">Mania</span>. Go to 'My link page' to setup your links</h5>
</div>

<style>
    .LogoTextLink {
        text-decoration: underline;
        color: #0034e8;
    }

    .LogoTextMania {
        color: #0070e7
    }

    .welcome-banner {
        background-color: lightgray;
        border-radius: 5px;
        padding: 8px;
        margin-top: 13px;
    }
</style>