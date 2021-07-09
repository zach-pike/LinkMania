<script lang="ts">
    import { Toast, ToastBody, ToastHeader, Input, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "sveltestrap"
    import Listitem from "./listitem.svelte";

    import { onMount } from "svelte";

    export let uid: string;

    //firebase stuff
    import { db } from "../firebase"
    import { collectionData, doc } from "rxfire/firestore";
    import { dematerialize, startWith } from "rxjs/operators";
    import type { Observable } from "rxjs";

    let query = db.collection("users").doc(uid).collection("links").orderBy("created")

    interface Link {
        created: number;
        linkText: string;
        linkHref: string;
        id: string;
    }

    let links = collectionData(query, "id").pipe(startWith([])) as Observable<Link[]>;

    //for debugging remove in prod
    onMount(() => {
        links.subscribe((data) => console.log(data))
    })

    let editText: string
    let editHref: string

    //text input binds
    let addText: string
    let addHref: string

    function remove(id: string) {
        db.collection("users").doc(uid).collection("links").doc(id).delete()
    }

    let activeEditID = ""

    //edit functions
    async function edit(id: string) {
        open = true;
        activeEditID = id

        let doc = await db.collection("users").doc(uid).collection("links").doc(id).get()

        editText = doc.data().linkText
        editHref = doc.data().linkHref
    }

    function setEdit() {
        open = false;
        db.collection("users").doc(uid).collection("links").doc(activeEditID).set({ linkText: editText, linkHref: editHref, created: Date.now() })
    }

    //add a link to the db
    function AddLink() {
        db.collection("users").doc(uid).collection("links").add({ linkText: addText, linkHref: addHref, created: Date.now() })
        addHref = ""
        addText = ""
    }

    let open = false;
    const toggle = () => (open = !open);
</script>

<h4 class="text-center mt-4">Add a Link</h4>

<Modal isOpen={open} {toggle}>
    <ModalHeader {toggle}>Edit Link</ModalHeader>
    <ModalBody>
            <Label for="EditLinkName">Link Title</Label>
            <Input type="text" id="EditLinkName" bind:value="{editText}" />
    
            <Label for="EditLinkPath">Link path</Label>
            <Input type="text" id="EditLinkPath" bind:value="{editHref}" />
    </ModalBody>
    <ModalFooter>
      <Button color="primary" on:click={setEdit}>Set</Button>
      <Button color="secondary" on:click={toggle}>Cancel</Button>
    </ModalFooter>
</Modal>

<div class="d-flex justify-content-center">
    <Toast>
        <ToastHeader>
            Add Link Item
        </ToastHeader>
        <ToastBody>
            <Label for="LinkName">Link Title</Label>
            <Input type="text" id="LinkName" bind:value="{addText}" />
    
            <Label for="LinkPath">Link path</Label>
            <Input type="text" id="LinkPath" bind:value="{addHref}" />
            
            <Button outline color="primary" class="mt-2" on:click="{AddLink}">Add</Button>
        </ToastBody>
    </Toast>
    
</div>

<h5 class="text-center mt-4">Public links</h5>

<div class="d-flex mt-4 justify-content-center">
    <div class="LinkList">
        {#each $links as link}
            <Listitem isLinkOwner 
                      linkText="{link.linkText}" 
                      linkHref="{link.linkHref}" 
                      id="{link.id}" 
                      on:delete="{ (data) => remove(data.detail.id) }"
                      on:edit="{ (data) => edit(data.detail.id) }" 
            />
        {/each}
    </div>
</div>

<style>
    .LinkList {
        display: flex;
        flex-direction: column;
    }
</style>