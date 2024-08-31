<template>
  <v-sheet style="width: 680px; margin: 6rem auto" class="text-center">
    <h1 class="text-uppercase text-colors">
      <p class="text-h4 mb-3">Welcome to</p>
      <p class="text-h3 font-weight-bold">Tasks Manager App! 👋🏻</p>
    </h1>
    <v-btn class="mt-16" color="secondary" variant="tonal" to="tasks">Get Started</v-btn>
  </v-sheet>
</template>

<style scoped lang="scss">
.text-colors {
  font-size: 100px;
  animation: Color 4s linear infinite;
  -webkit-animation: Color 4s ease-in-out infinite;
  text-shadow: 10px 10px #f0f0f0;
}

@keyframes Color {
  0% {
    color: #a0d468;
  }

  20% {
    color: #4fc1e9;
  }

  40% {
    color: #ffce54;
  }

  60% {
    color: #fc6e51;
  }

  80% {
    color: #ed5565;
  }

  100% {
    color: #ac92ec;
  }
}

@-moz-keyframes Color {
  0% {
    color: #a0d468;
  }

  20% {
    color: #4fc1e9;
  }

  40% {
    color: #ffce54;
  }

  60% {
    color: #fc6e51;
  }

  80% {
    color: #ed5565;
  }

  100% {
    color: #ac92ec;
  }
}

@-webkit-keyframes Color {
  0% {
    color: #a0d468;
  }

  20% {
    color: #4fc1e9;
  }

  40% {
    color: #ffce54;
  }

  60% {
    color: #fc6e51;
  }

  80% {
    color: #ed5565;
  }

  100% {
    color: #ac92ec;
  }
}
</style>
