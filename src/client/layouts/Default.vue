<template>
  <div id="root">
    <header class="header">
      <router-link class="header__text" to="/">{{name}}</router-link>
      <div v-if="$route.params.board">
        <router-link class="header__board" :to="'/' + $route.params.board">{{$route.params.board}}</router-link>
      </div>
    </header>
    <div class="content">
      <slot/>  
    </div>
    <footer class="footer">
        <div>
          {{footer}}
        </div>
        <div class="footer__social">
          <a class="footer__socialIcon" href="https://github.com/Jozefpodlecki"><font-awesome-icon :icon="['fab', 'github']" size="1x" /></a>
          <a class="footer__socialIcon" href="https://www.linkedin.com/in/jozef-witold-podlecki"><font-awesome-icon :icon="['fab', 'linkedin']" size="1x"/></a>
          <a class="footer__socialIcon" href="https://jozefpodlecki.github.io"><font-awesome-icon :icon="['fa', 'globe']" size="1x"/></a>
        </div>
    </footer>
  </div>
</template>

<script>
  
  export default {
    name: 'default',
    data() {
      return {
        name: "Anonymous Message Board",
        footer: `@ Józef Podlecki ${new Date().getFullYear()}`
      }
    },
    mounted() {
    }
  }
</script>

<style lang="scss">
  #root {
    display: flex;
    flex-direction: column;
    height: inherit;
  }
  
  .content {
    flex: 1 1 auto;
  }
  
  .header {
    flex: 0 0 auto;
    text-align: center;
    background: black;
    color: white;
    padding: 10px;
    font-family: 'Sigmar One', cursive;
    font-size: 20px;
    
    &__text {
      margin: 0;
      text-shadow: 3px -15px 8px darkblue, 5px 12px 8px darkblue;
      font-size: 50px;
      text-decoration: none;
      color: currentColor;
    }
    
    &__board {
      text-decoration: none;
      color: white;
    }
  }
  
  .footer {
    flex: 0 0 auto;
    text-align: center;
    background: black;
    color: white;
    padding: 10px;
    font-size: 20px;
    
    &__social {
        margin-top: 10px;
    }
    
    &__socialIcon {
        color: white;
        margin: 0 2px;
    }
  }
</style>