<script>
  export let lamp;
  import {createEventDispatcher} from 'svelte';
  import {updateLamp} from './api.js';

  const dispatch = createEventDispatcher();

  async function toggleLamp() {
    lamp.state = !lamp.state;
    await updateLamp(lamp.id, {state: lamp.state});
  }

  async function changeColor(event) {
    lamp.color = event.target.value;
    await updateLamp(lamp.id, {color: lamp.color});
  }

  async function changeBrightness(event) {
    lamp.brightness = event.target.value;
    await updateLamp(lamp.id, {brightness: lamp.brightness});
  }

  function removeLamp() {
    dispatch('remove');
  }
</script>

<div class="lamp-card">
    <h3>{lamp.name}</h3>
    <div class="lamp-state">
        <button on:click={toggleLamp} class:active={lamp.state}>
            {lamp.state ? 'Turn Off' : 'Turn On'}
        </button>
    </div>
    <div class="controls">
        <label>
            <span>Color:</span>
            <input type="color" value={lamp.color} on:input={changeColor} class="color-picker">
        </label>
        <label>
            <span>Brightness:</span>
            <input type="range" min="0" max="100" value={lamp.brightness} on:input={changeBrightness}
                   class="brightness-slider">
        </label>
    </div>
    <button on:click={removeLamp} class="delete">Delete</button>
</div>

<style>
  .lamp-card {
    background-color: #ffffff;
    border-radius: 15px;
    padding: 1.5em;
    width: 250px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .lamp-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }

  .lamp-card h3 {
    font-size: 1.5em;
    color: #333;
    margin-bottom: 1em;
  }

  .lamp-state {
    margin-bottom: 1em;
  }

  .lamp-state button {
    padding: 0.5em 1.2em;
    border: none;
    border-radius: 25px;
    background-color: #007bff; /* Blue for 'Turn On' */
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .lamp-state button.active {
    background-color: #28a745; /* Green for 'Turn Off' */
    color: white;
  }

  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1em;
  }

  .controls label {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.9em;
    color: #555;
  }

  .color-picker {
    margin-top: 0.5em;
    cursor: pointer;
  }

  .brightness-slider {
    margin-top: 0.5em;
    width: 100%;
  }

  .delete {
    background-color: #e53935;
    color: white;
    border: none;
    border-radius: 25px;
    padding: 0.5em 1em;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .delete:hover {
    background-color: #d32f2f;
  }
</style>
