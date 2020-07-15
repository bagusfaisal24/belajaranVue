<template>
<div class="app">
  <div class="sidebar-container">
    <div class="sidebar-logo">
      Lazizmu System
    </div>
    <ul class="sidebar-navigation">
      <li>
        <a href="#">
          <i class="fa fa-tachometer" aria-hidden="true"></i> Dashboard
        </a>
      </li>
      <li class="header">Menu Utama</li>
      <li>
        <router-link to="/member">
          <i class="fa fa-users" aria-hidden="true"></i> Muzakki
        </router-link>
      </li>
      <li>
        <router-link to="/ranting">
          <i class="fa fa-list-alt" aria-hidden="true"></i> Ranting
        </router-link>
      </li>
      <li class="header">Master Data</li>
      <li>
        <router-link to="/type-zakat">
          <i class="fa fa-list-alt" aria-hidden="true"></i> Tipe Zakat
        </router-link>
      </li>
    </ul>
  </div>
  <div class="content-container">
      <nav class="navbar navbar-expand-md navbar-light">
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item">
            </li>
          </ul>
          <a class="navbar-brand fa fa-sign-out" href="#"> Keluar</a>
        </div>
      </nav>
        <router-view>
        </router-view>
  </div>
</div>
</template>

<script>
export default {
  data: () => ({
    menu: [
      {
        header: true,
        title: 'RAMUS SMART X',
        hiddenOnCollapse: true,
        icon: 'fa fa-circle-o',
        href: '/',
        class: 'text-center mb-3'
      },
      {
        href: '/',
        title: 'Home',
        icon: 'fa fa-home'
      },
      {
        href: '/group',
        title: 'Group',
        icon: 'fa fa-users'
      }
    ]
  })
}
</script>

<style>
  .navbar {
    background-color: #FFFDF4;
  }
  .sidebar-container {
    position: fixed;
    width: 220px;
    height: 100%;
    left: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background: #1a1a1a;
    color: #fff;
  }

  .content-container {
    padding-top: 0;
  }

  .sidebar-logo {
    padding: 10px 15px 10px 30px;
    font-size: 20px;
    background-color: #2574A9;
  }

  .sidebar-navigation {
    padding: 0;
    margin: 0;
    list-style-type: none;
    position: relative;
  }

  .sidebar-navigation li {
    background-color: transparent;
    position: relative;
    display: inline-block;
    width: 100%;
    line-height: 20px;
  }

  .sidebar-navigation li a {
    padding: 10px 15px 10px 30px;
    display: block;
    color: #fff;
  }

  .sidebar-navigation li .fa {
    margin-right: 10px;
  }

  .sidebar-navigation li a:active,
  .sidebar-navigation li a:hover,
  .sidebar-navigation li a:focus {
    text-decoration: none;
    outline: none;
  }

  .sidebar-navigation li::before {
    background-color: #2574A9;
    position: absolute;
    content: '';
    height: 100%;
    left: 0;
    top: 0;
    -webkit-transition: width 0.2s ease-in;
    transition: width 0.2s ease-in;
    width: 3px;
    z-index: -1;
  }

  .sidebar-navigation li:hover::before {
    width: 100%;
  }

  .sidebar-navigation .header {
    font-size: 12px;
    text-transform: uppercase;
    background-color: #151515;
    padding: 10px 15px 10px 30px;
  }

  .sidebar-navigation .header::before {
    background-color: transparent;
  }

  .content-container {
    padding-left: 220px;
  }
</style>
