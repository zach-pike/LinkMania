<script lang="ts">
    import Listitem from "./listitem.svelte";
    import { db } from "../firebase"
    import { onMount } from "svelte";

    import { Toast, ToastBody, ToastHeader, Input, Label, Button } from "sveltestrap"
    import { collectionData } from "rxfire/firestore";
    import { startWith } from "rxjs/operators";
    import type { Observable } from "rxjs";
    export let uid: string;

    let query = db.collection("users").doc(uid).collection("links").orderBy("created")

    interface Link {
        created: number;
        linkText: string;
        linkHref: string;
        id: string;
    }

    let links = collectionData(query, "id").pipe(startWith([])) as Observable<Link[]>;

    onMount(() => {
        links.subscribe((data) => console.log(data))
    })

    function remove(id: string) {
        db.collection("users").doc(uid).collection("links").doc(id).delete()
    }

</script>

<h4 class="text-center mt-4">Add a Link</h4>

<div class="d-flex justify-content-center">
    <Toast>
        <ToastHeader>
            Add Link Item
        </ToastHeader>
        <ToastBody>
            <Label for="LinkName">Link Title</Label>
            <Input type="text" id="LinkName" />
    
            <Label for="LinkPath">Link path</Label>
            <Input type="text" id="LinkPath" />
            
            <Button outline color="primary" class="mt-2">Add</Button>
        </ToastBody>
    </Toast>
    
</div>

<h5 class="text-center mt-4">Public links</h5>

<div class="d-flex mt-4 justify-content-center">
    <div class="LinkList">
        {#each $links as link}
            <Listitem isLinkOwner linkText="{link.linkText}" linkHref="{link.linkHref}" id="{link.id}" on:delete="{ (data) => remove(data.detail.id) }" />
        {/each}
    </div>
</div>

<style>
    .LinkList {
        display: flex;
        flex-direction: column;
    }
</style>