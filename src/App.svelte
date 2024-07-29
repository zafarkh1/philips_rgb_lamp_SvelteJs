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
		console.log('Initial values',lamps)
		if (newLampName.trim()) {
			const newLamp = await createLamp({
				name: newLampName,
				state: false,
				color: '#FFFFFF',
				brightness: 50
			});
			lamps = [...lamps, newLamp];
			newLampName = '';
			console.log('Final values', lamps)
		}
	}

	async function removeLamp(id) {
		await deleteLamp(id);
		lamps = lamps.filter(lamp => lamp.id !== id);
	}

</script>

<main>
	<h1>Philips RGB Lamps Dashboard</h1>
	<div class="add-lamp">
		<input type="text" bind:value={newLampName} placeholder="New Lamp Name" class="input-field">
		<button on:click={addLamp} class="add-button">Add Lamp</button>
	</div>
	{#if lamps.length === 0}
		<p>Loading...</p>
	{:else}
		<div class="lamps-grid">
			{#each lamps as lamp (lamp.id)}
				<Lamp {lamp} on:remove={() => removeLamp(lamp.id)} />
			{/each}
		</div>
	{/if}
</main>

<style>
	main {
		padding: 2em;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		text-align: center;
		background-color: #f3f6f9;
	}

	h1 {
		color: #444;
		margin-bottom: 1em;
		font-size: 2em;
	}

	.add-lamp {
		margin-bottom: 2em;
		display: flex;
		justify-content: center;
		gap: 0.5em;
	}

	.input-field {
		padding: 0.7em;
		border: 2px solid #bbb;
		border-radius: 30px;
		width: 240px;
		outline: none;
		transition: border-color 0.3s;
	}

	.input-field:focus {
		border-color: #2196f3;
	}

	.add-button {
		padding: 0.7em 1.5em;
		border: none;
		border-radius: 30px;
		background-color: #00bcd4;
		color: white;
		font-weight: bold;
		cursor: pointer;
		transition: background-color 0.3s;
	}

	.add-button:hover {
		background-color: #0097a7;
	}

	.lamps-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5em;
		justify-items: center;
		padding: 0 2em;
	}
</style>
