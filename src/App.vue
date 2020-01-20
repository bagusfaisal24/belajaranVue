<template>
  <div class="app">
    <nav class="navbar navbar-expand-md navbar-light" style="background-color: #4db5fa;">
      <a class="navbar-brand fa fa-home" href="#"></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item">
            <router-link to="/"><a class="navbar-brand" href="#"> Repos</a></router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about"><a class="navbar-brand" href="#"> Profile</a></router-link>
          </li>
        </ul>
        <a class="navbar-brand fa fa-sign-out" href="#"> Sign out</a>
      </div>
    </nav>
      <div class="footer-copyright text-center py-3" style="color: #ffffff; background-color: #000000; position: fixed; bottom: 0; width: 100%">© 2020 Copyright:
        <a href="#" style="color: #ffffff"> Lazizmu</a>
      </div>
    <router-view>
    </router-view>
  </div>
</template>
