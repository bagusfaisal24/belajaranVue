<template>
  <div class="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item" >
            <router-link to="/"><a>Home</a></router-link>
          </a>

          <a class="navbar-item">
            <router-link to="/about"><a>About</a></router-link>
          </a>

          <div class="navbar-item has-dropdown is-hoverable">
            <div class="navbar-dropdown">
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
          </div>
        </div>
      </div>
    </nav>
    <router-view>
    </router-view>
  </div>
</template>
