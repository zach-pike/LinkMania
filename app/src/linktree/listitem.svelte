<script lang="ts">
    import { createEventDispatcher } from "svelte"
    import { Button } from "sveltestrap"

    //create event dispatcher
    let dispatch = createEventDispatcher()

    //arguments
    export let isLinkOwner: boolean;
    export let linkText: string;
    export let linkHref: string;
    export let id: string;
</script>

<div class="LinkItem">
    <div class="LinkLink">
        <a href="{linkHref}">{linkText}</a>
    </div>
    {#if isLinkOwner}
        <div class="LinkOptions">
            <Button outline on:click="{() => dispatch("edit", { id })}">✏️</Button>
            <Button outline on:click="{() => dispatch("delete", { id })}">❌</Button>
        </div>
    {/if}
</div>

<style>
    .LinkItem {
        width: 17em;
        height: 3.5em;

        display: flex;
        flex-direction: row;


        border-style: solid;
        border-color: black;
        border-width: 1px;

        margin: 3px;
    }

    .LinkLink {
        height: 100%;
        display: flex;
        align-items: center;
        margin-left: 6px;
    }

    .LinkOptions > :global(button) {
        margin: 2px;
    }

    .LinkOptions {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;

        padding-right: 4px;
    }
</style>