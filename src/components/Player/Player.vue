<template>
  <div class="player">
    <!-- Top Info -->
    <div id="title">
      <span ref="track" id="track"></span>
      <div ref="timer" id="timer">0:00</div>
      <div ref="duration" id="duration">0:00</div>
    </div>

    <!-- Controls -->
    <div class="controlsOuter">
      <div class="controlsInner">
        <div ref="loading" id="loading"></div>
        <div ref="playBtn" @click="play" class="btn" id="playBtn"></div>
        <div ref="pauseBtn" @click="pause" class="btn" id="pauseBtn"></div>
      </div>
      <div class="btn" @click="toggleVolume" id="volumeBtn"></div>
    </div>

    <!-- Progress -->
    <div ref="waveform" id="waveform"></div>
    <div ref="bar" id="bar"></div>
    <div ref="progress" @click="seek" id="progress"></div>
    <div ref="seekPanel" @click="seek" id="seekPanel"></div>

    <!-- Volume -->
    <div ref="volume" @click="volume" id="volume" class="">
      <div ref="barFull" id="barFull" class="bar"></div>
      <div ref="barEmpty" id="barEmpty" class="bar"></div>
      <div ref="sliderBtn" id="sliderBtn"></div>
    </div>
    `
  </div>
</template>

<script src="./Player.js"></script>
