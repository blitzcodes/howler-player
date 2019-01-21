<template>
  <div class="player">
    <!-- Top Info -->
    <div id="title">
      <span ref="track" id="track">{{ track.title }}</span>
      <div ref="timer" id="timer">{{ timer }}</div>
      <div ref="duration" id="duration">{{ track.duration }}</div>
    </div>

    <!-- Controls -->
    <div class="controlsOuter">
      <div class="controlsInner">
        <div ref="loading" id="loading"></div>
        <div v-show="status.paused" ref="playBtn" @click="play" class="btn" id="playBtn"></div>
        <div v-show="status.playing" ref="pauseBtn" @click="pause" class="btn" id="pauseBtn"></div>
      </div>
      <div class="btn" @click="toggleVolume" id="volumeBtn"></div>
    </div>

    <!-- Progress -->
    <div ref="waveform" id="waveform"></div>
    <div :style="progress" ref="progress" @click="seek" id="progress"></div>
    <div ref="seekPanel" @click="seek" id="seekPanel"></div>

    <!-- Volume -->
    <div ref="volume" @click="volume" id="volume" class="">
      <div ref="barFull" id="barFull" class="bar"></div>
      <div ref="barEmpty" id="barEmpty" class="bar"></div>
      <div ref="sliderBtn" id="sliderBtn"></div>
    </div>

  </div>
</template>

<script src="./Player.js"></script>
