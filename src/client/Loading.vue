<template>
  <div class="loading-container">
    <div class="loading">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'loading'
   }
</script>

<style lang="scss" scoped>

  $d-max: 50px;
  $d-min: 12px;
  $width: 20px;
  $height: 20px;
  $radius: $width / 2;
  $color: #9880ff;
  $bgColor: $color;
  $dotBeforeColor: $color;
  $dotAfterColor: $color;

  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    overflow-x: hidden;
  }
  
  .loading {
    position: relative;

    width: $width;
    height: $height;
    border-radius: $radius;
    background-color: $bgColor;
    color: $color;

    animation: dotFloating 3s infinite cubic-bezier(.15, .6, .9, .1);

    &::before,
    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      top: 0;
    }

    &::before {
      left: - $d-min;

      width: $width;
      height: $height;
      border-radius: $radius;
      background-color: $bgColor;
      color: $color;

      animation: dotFloatingBefore 3s infinite ease-in-out;
    }

    &::after {
      left: - $d-min * 2;

      width: $width;
      height: $height;
      border-radius: $radius;
      background-color: $bgColor;
      color: $color;

      animation: dotFloatingAfter 3s infinite cubic-bezier(.4, 0, 1, 1);
    }
  }

  @keyframes dotFloating {
    0% {
      left: calc(-50% - #{$width / 2});
    }

    75% {
      left: calc(50% + #{$d-max * 2 + $width / 2});
    }

    100% {
      left: calc(50% + #{$d-max * 2 + $width / 2});
    }
  }

  @keyframes dotFloatingBefore {
    0% {
      left: - $d-max;
    }

    50% {
      left: - $d-min;
    }

    75% {
      left: - $d-max;
    }

    100% {
      left: - $d-max;
    }
  }

  @keyframes dotFloatingAfter {
    0% {
      left: - $d-max * 2;
    }

    50% {
      left: - $d-min * 2;
    }

    75% {
      left: - $d-max * 2;
    }

    100% {
      left: - $d-max * 2;
    }
  }

</style>