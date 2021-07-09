<script lang="ts">
    import ListItem from "./listitem.svelte"
    export let uidToFind: string;

    import { collectionData, docData } from 'rxfire/firestore';
    import { startWith } from 'rxjs/operators';
    import { db } from "../firebase";
    import { onMount } from "svelte";
    import type { Observable } from "rxjs";

    let query = db.collection("users").doc(uidToFind).collection("links")

    let documents = collectionData(query).pipe(startWith([])) as Observable<{
        created: number;
        linkText: string;
        linkHref: string;
        id: string;
    }[]>

</script>

<div class="d-flex mt-4 justify-content-center">
    <div class="d-flex flex-column">
        {#await db.collection("users").doc(uidToFind).get()}
            <h4>Loading</h4>
        {:then docData}
            <div>
                <h4 class="d-inline">{docData.data().displayName}'s Links</h4>
                <img src="{docData.data().photoURL}" width="40" alt="photoURL" class="rounded-3" />
            </div>
        {/await}
        {#each $documents as document}
            <ListItem id="{null}" linkText="{document.linkText}" linkHref="{document.linkHref}" isLinkOwner="{false}" />
        {/each}
        {#if $documents.length == 0}
            <h1>No links ¯\_(ツ)_/¯</h1>
        {/if}
    </div>
</div>