<template>
  <div class="app">
    <nav class="navbar navbar-expand-md navbar-light" style="background-color: #4db5fa;">
      <a class="navbar-brand fa fa-home" href="#"></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item">
            <router-link to="/"><a class="navbar-brand" href="#"> Home</a></router-link>
          </li>
          <li class="nav-item">
            <router-link to="/member"><a class="navbar-brand" href="#"> Muzakki</a></router-link>
          </li>
          <li class="nav-item">
            <router-link to="/ranting"><a class="navbar-brand" href="#"> Ranting</a></router-link>
          </li>
        </ul>
        <a class="navbar-brand fa fa-sign-out" href="#"> Keluar</a>
      </div>
    </nav>
    <router-view>
    </router-view>
  </div>
</template>
