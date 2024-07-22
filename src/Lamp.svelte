<!-- src/components/Lamp.svelte -->
<script>
  export let lamp;
  import { createEventDispatcher } from 'svelte';
  import { updateLamp } from './api.js';

  const dispatch = createEventDispatcher();

  async function toggleLamp() {
    lamp.state = !lamp.state;
    await updateLamp(lamp.id, { state: lamp.state });
  }

  async function changeColor(event) {
    lamp.color = event.target.value;
    await updateLamp(lamp.id, { color: lamp.color });
  }

  async function changeBrightness(event) {
    lamp.brightness = event.target.value;
    await updateLamp(lamp.id, { brightness: lamp.brightness });
  }

  function removeLamp() {
    dispatch('remove');
  }
</script>

<div class="lamp">
    <h3>{lamp.name}</h3>
    <button on:click={toggleLamp} class:active={lamp.state}>
        {lamp.state ? 'Turn Off' : 'Turn On'}
    </button>
    <input type="color" value={lamp.color} on:input={changeColor}>
    <input type="range" min="0" max="100" value={lamp.brightness} on:input={changeBrightness}>
    <button on:click={removeLamp} class="delete">Delete</button>
</div>

<style>
  .lamp {
    border: 1px solid #ddd;
    padding: 1em;
    border-radius: 0.5em;
    text-align: center;
    width: 200px;
  }

  .lamp h3 {
    margin-bottom: 1em;
  }

  .lamp button {
    margin-bottom: 1em;
    padding: 0.5em 1em;
    border: none;
    border-radius: 0.5em;
    cursor: pointer;
  }

  .lamp button.active {
    background-color: #4caf50;
    color: white;
  }

  .lamp input[type="color"] {
    display: block;
    margin: 0.5em auto;
  }

  .lamp input[type="range"] {
    display: block;
    margin: 0.5em auto;
    width: 100%;
  }

  .lamp button.delete {
    background-color: #f44336;
    color: white;
  }
</style>