<!-- src/routes/Lamps.svelte -->
<script>
	import { onMount } from 'svelte';
	import Lamp from './Lamp.svelte';
	import { getLamps, createLamp, deleteLamp } from './api.js';

	let lamps = [];
	let newLampName = '';

	onMount(async () => {
		lamps = await getLamps();
	});

	async function addLamp() {
		if (newLampName.trim()) {
			const newLamp = await createLamp({
				name: newLampName,
				state: false,
				color: '#FFFFFF',
				brightness: 50
			});
			lamps = [...lamps, newLamp];
			newLampName = '';
		}
	}

	async function removeLamp(id) {
		await deleteLamp(id);
		lamps = lamps.filter(lamp => lamp._id !== id);
	}
</script>

<main>
	<h1>Philips RGB Lamps Dashboard</h1>
	<div class="add-lamp">
		<input type="text" bind:value={newLampName} placeholder="New Lamp Name">
		<button on:click={addLamp}>Add Lamp</button>
	</div>
	{#if lamps.length === 0}
		<p>Loading...</p>
	{:else}
		<div class="lamps-container">
			{#each lamps as lamp}
				<Lamp {lamp} on:remove={() => removeLamp(lamp._id)} />
			{/each}
		</div>
	{/if}
</main>

<style>
	main {
		padding: 2em;
		font-family: Arial, sans-serif;
		text-align: center;
	}

	.add-lamp {
		margin-bottom: 2em;
	}

	.lamps-container {
		display: flex;
		flex-wrap: wrap;
		gap: 1em;
		justify-content: center;
	}
</style>