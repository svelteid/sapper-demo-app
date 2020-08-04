<script>
  import { onMount } from 'svelte';

  let Moveable;

  onMount(async () => {
    const module = await import('svelte-moveable');
    Moveable = module.default;
  });

  let target;
  let frame = {
    translate: [0, 0],
    rotate: 0,
    transformOrigin: '50% 50%'
  };

  function handleDragOriginStart({ detail }) {
    const { dragStart } = detail;

    dragStart && dragStart.set(frame.translate);
  }

  function handleDragOrigin({ detail }) {
    const { target, drag, transformOrigin } = detail;

    frame.translate = drag.beforeTranslate;
    frame.transformOrigin = transformOrigin;
  }

  function handleDragStart({ detail }) {
    const { set } = detail;

    set(frame.translate);
  }

  function handleDrag({ detail }) {
    const { target, beforeTranslate } = detail;

    frame.translate = beforeTranslate;
  }

  function handleRotateStart({ detail }) {
    const { set } = detail;

    set(frame.rotate);
  }

  function handleRotate({ detail }) {
    const { beforeRotate } = detail;

    frame.rotate = beforeRotate;
  }

  function handleRender({ detail }) {
    const { target } = detail;
    const { translate, rotate, transformOrigin } = frame;

    target.style.transformOrigin = transformOrigin;
    target.style.transform = `translate(${translate[0]}px, ${translate[1]}px)` + ` rotate(${rotate}deg)`;
  }
</script>

<style lang="scss">
  @import '../styles/variables.scss';

  .target {
    $color: white;

    position: absolute;
    width: 100px;
    height: 100px;
    top: 250px;
    left: 50%;
    line-height: 100px;
    text-align: center;
    background: $primary-color;
    color: $color;
    font-weight: bold;
    border: 1px solid $color;
    box-sizing: border-box;
  }
</style>

<svelte:head>
  <title>About</title>
</svelte:head>

<h1>About this site</h1>

<p>
  This site is for Sapper demo app for meetup VuejsID x ReactID x SvelteID and here is an example using of using a
  plugin (non SSR)
</p>

<div class="target" bind:this={target}>Target</div>

<svelte:component
  this={Moveable}
  {target}
  originDraggable
  originRelative
  draggable
  origin
  rotatable
  on:dragOriginStart={handleDragOriginStart}
  on:dragOrigin={handleDragOrigin}
  on:dragStart={handleDragStart}
  on:drag={handleDrag}
  on:rotateStart={handleRotateStart}
  on:rotate={handleRotate}
  on:render={handleRender} />
