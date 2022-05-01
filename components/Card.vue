<template>
  <div class="card">
    <div class="inner" :class="[!film?.hidden && 'flip']">
      <div class="back" @click="flip"></div>
      <img
        class="front"
        :class="[film?.gray && 'grayed']"
        @click="open"
        :src="film?.src"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    film: Object,
    i: Number,
  },

  methods: {
    flip() {
      this.$emit("flip", this.i);
      this.film["hidden"] = false;
    },

    open() {
      window.open('https://letterboxd.com/film/'+this.film.href, '_blank').focus();
    },
  },
};
</script>

<style scoped>
.card {
  min-width: auto;
  min-height: auto;
  aspect-ratio: 460/690;
  background-color: transparent;
  perspective: 1000px;
  filter: drop-shadow(4px 4px 4px #00000064);
}

.inner {
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 1s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.front,
.back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 8px;
}

.front,
.flip {
  transform: rotateY(180deg);
}

.front {
  background-color: #fff;
  transition: filter 1s;
}

.back {
  background-color: #000000;
  opacity: 0.8;
  background-image: linear-gradient(135deg, #0d0d0e 25%, transparent 25%),
    linear-gradient(225deg, #0d0d0e 25%, transparent 25%),
    linear-gradient(45deg, #0d0d0e 25%, transparent 25%),
    linear-gradient(315deg, #0d0d0e 25%, #000000 25%);
  background-position: 10px 0, 10px 0, 0 0, 0 0;
  background-size: 20px 20px;
  background-repeat: repeat;
}

.grayed {
  filter: grayscale(1);
}
</style>
