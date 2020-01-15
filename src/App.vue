<template>
  <div class="app">
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #5ee689;">
      <a class="navbar-brand fa fa-home" href="#"></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item">
            <a class="navbar-brand" href="#">Menu 1</a>
          </li>
          <li class="nav-item">
            <a class="navbar-brand" href="#">Menu 2</a>
          </li>
        </ul>
        <a class="navbar-brand fa fa-sign-out" href="#"></a>
      </div>
    </nav>
    <router-view>
    </router-view>
  </div>
</template>
