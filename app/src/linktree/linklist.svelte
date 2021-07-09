<script lang="ts">
    import ListItem from "./listitem.svelte"
    export let uidToFind: string;

    import { collectionData } from 'rxfire/firestore';
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
        {#each $documents as document}
            <ListItem id="{null}" linkText="{document.linkText}" linkHref="{document.linkHref}" isLinkOwner="{false}" />
        {/each}
        {#if $documents.length == 0}
            <h1>No links ¯\_(ツ)_/¯</h1>
        {/if}
    </div>
</div>