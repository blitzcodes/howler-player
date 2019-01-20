import './Player.css'
import { Howl, Howler } from 'howler'
// import { once, throttle } from 'lodash'

const { requestAnimationFrame } = window

export default {
  name: 'Player',
  data () {
    return {
      sound: null,
    }
  },
  mounted: function () {
    const { duration, bar, loading, pauseBtn, track } = this.$refs
    track.innerHTML = 'SJ Homer - Blitz Rock'

    this.sound = new Howl({
      src: ['/static/audio/blitz.mp3'],
      html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
      onplay: () => {
        // Display the duration.
        duration.innerHTML = this.formatTime(Math.round(this.sound.duration()))

        // Start updating the progress of the track.
        requestAnimationFrame(this.step.bind(this))

        // Start the wave animation if we have already loaded
        // wave.container.style.display = 'block'
        bar.style.display = 'none'
        pauseBtn.style.display = 'block'
      },
      onload: () => {
        // Start the wave animation.
        // wave.container.style.display = 'block'
        bar.style.display = 'none'
        loading.style.display = 'none'
      },
      onend: () => {
        // Stop the wave animation.
        // wave.container.style.display = 'none'
        bar.style.display = 'block'
        self.skip('next')
      },
      onpause: () => {
        // Stop the wave animation.
        // wave.container.style.display = 'none'
        bar.style.display = 'block'
      },
      onstop: () => {
        // Stop the wave animation.
        // wave.container.style.display = 'none'
        bar.style.display = 'block'
      },
      onseek: () => {
        // Start upating the progress of the track.
        requestAnimationFrame(this.step.bind(this))
      },
    })
  },
  methods: {
    play: function () {
      const { pauseBtn, playBtn } = this.$refs

      // Pause the sound.
      this.sound.play()

      // Show the play button.
      playBtn.style.display = 'none'
      pauseBtn.style.display = 'block'
    },
    pause: function () {
      const { pauseBtn, playBtn } = this.$refs

      // Pause the sound.
      this.sound.pause()

      // Show the play button.
      playBtn.style.display = 'block'
      pauseBtn.style.display = 'none'
    },
    step: function () {
      const { timer, progress } = this.$refs
      // Get the Howl we want to manipulate.
      const { sound } = this

      // Determine our current seek position.
      let seek = sound.seek() || 0
      timer.innerHTML = this.formatTime(Math.round(seek))
      progress.style.width = (((seek / sound.duration()) * 100) || 0) + '%'

      // If the sound is still playing, continue stepping.
      if (sound.playing()) {
        requestAnimationFrame(this.step.bind(this))
      }
    },
    seek: function (e) {
      // Get the Howl we want to manipulate.
      const { sound } = this

      // Convert the percent into a seek position.
      if (sound.playing()) {
        sound.seek(sound.duration() * (e.clientX / window.innerWidth))
      }

      this.step()
    },
    volume: function (e) {
      const { barFull, sliderBtn, barEmpty } = this.$refs

      const x = e.clientX || e.touches[0].clientX
      const startX = window.innerWidth * 0.05
      const layerX = x - startX
      const val = Math.min(1, Math.max(0, layerX / parseFloat(barEmpty.scrollWidth)))

      // Update the global volume (affecting all Howls).
      Howler.volume(val)

      // Update the display on the slider.
      const barWidth = (val * 90) / 100
      barFull.style.width = (barWidth * 100) + '%'
      sliderBtn.style.left = (window.innerWidth * barWidth + window.innerWidth * 0.05 - 25) + 'px'

      setTimeout(() => {
        this.toggleVolume()
      }, 200)
    },
    toggleVolume: function () {
      const { volume } = this.$refs
      const display = (volume.style.display === 'block') ? 'none' : 'block'

      volume.className = (display === 'block') ? 'fadein' : 'fadeout'
      setTimeout(function () {
        volume.style.display = display
      }, (display === 'block') ? 0 : 500)
    },
    formatTime: function (secs) {
      let minutes = Math.floor(secs / 60) || 0
      let seconds = (secs - minutes * 60) || 0

      return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
    },
  },
}
