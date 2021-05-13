<template>
  <header>
    <!-- Navbar -->
    <MDBNavbar expand="lg" light bg="white" container position="sticky">
      <MDBNavbarToggler target="#navbarExample01"></MDBNavbarToggler>
      <MDBNavbarNav collapse="navbarExample01" class="mb-2 mb-lg-0">
        <MDBNavbarItem :to="{ name: 'Home' }"> Home </MDBNavbarItem>
        <MDBNavbarItem :to="{ name: 'User' }"> User</MDBNavbarItem>
        <MDBNavbarItem :to="{ name: 'About' }"> About</MDBNavbarItem>
        <!-- <router-link v-bind:to="{ name: 'About' }"> About </router-link> -->
      </MDBNavbarNav>
    </MDBNavbar>
    <!-- Navbar -->
  </header>
</template>

<script>
import {
  MDBNavbar,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
} from "mdb-vue-ui-kit";

export default {
  setup() {},
  components: {
    MDBNavbar,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
  },
};
</script>