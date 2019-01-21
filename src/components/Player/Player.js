import './Player.scss'
import { Howl, Howler } from 'howler'
// import { once, throttle } from 'lodash'

const { requestAnimationFrame } = window

export default {
  name: 'Player',
  data () {
    return {
      player: null,
      track: {
        title: 'SJ Homer - Blitz Rock',
        files: ['/static/audio/blitz.mp3'],
        seek: 0,
        duration: '',
        progress: 0,
      },
      status: {
        paused: true,
        playing: false,
      },
    }
  },
  mounted () {
    this.player = new Howl({
      src: this.track.files,
      html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
      onplay: this.onPlay,
      onload: this.onLoad,
      onend: this.onEnd,
      onpause: this.onPause,
      onstop: this.onStop,
      onseek: this.onSeek,
    })
  },
  methods: {
    onPlay () {
      // Display the duration.
      this.track.duration = this.formatTime(Math.round(this.player.duration()))

      // Start updating the progress of the track.
      requestAnimationFrame(this.step.bind(this))

      // Start the wave animation if we have already loaded
      // wave.container.style.display = 'block'
      this.status.playing = true
      this.status.paused = false
    },
    onLoad () {
      const { loading } = this.$refs

      loading.style.display = 'none'
    },
    onEnd () {
      const { status, track, player } = this

      status.playing = false
      status.paused = true

      track.seek = 0
      track.duration = ''
      track.progress = 0

      player.stop()
    },
    onPause () {
      const { status } = this

      // Show the play button.
      status.playing = false
      status.paused = true
    },
    onStop () {
    },
    onSeek () {
      // Start upating the progress of the track.
      requestAnimationFrame(this.step.bind(this))
    },
    play () {
      // Pause the sound.
      this.player.play()
    },
    pause () {
      // Pause the sound.
      this.player.pause()
    },
    step () {
      // const { timer, progress } = this.$refs
      // Get the Howl we want to manipulate.
      const { player, track } = this

      // Determine our current seek position.
      let seek = player.seek() || 0
      track.seek = this.formatTime(Math.round(seek))
      track.progress = (((seek / player.duration()) * 100) || 0)

      // If the sound is still playing, continue stepping.
      if (player.playing()) {
        requestAnimationFrame(this.step.bind(this))
      }
    },
    seek (e) {
      // Get the Howl we want to manipulate.
      const { player } = this

      // Convert the percent into a seek position.
      if (player.playing()) {
        player.seek(player.duration() * (e.clientX / window.innerWidth))
      }

      this.step()
    },
    volume (e) {
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
      const slidingIn = volume.classList.contains('slideIn')

      setTimeout(() => {
        volume.classList.toggle('slideIn', !slidingIn)
      }, 100)
    },
    formatTime: function (secs) {
      let minutes = Math.floor(secs / 60) || 0
      let seconds = (secs - minutes * 60) || 0

      return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
    },
  },
  computed: {
    timer () {
      return this.track.seek || '0:00'
    },
    progress () {
      return {
        width: `${this.track.progress}%`,
      }
    },
  },
}
