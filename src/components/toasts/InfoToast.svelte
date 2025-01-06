<script>
    export let statusMessage='';
</script>
{#if statusMessage}
<div class="mb-6 p-4 rounded-lg bg-blue-50 backdrop-blur-sm border border-blue-200">
    <p class="text-blue-700">{statusMessage}</p>
</div>
{/if}