<template>
  <v-main class="content-body">
    <v-container fill-height>
      <v-layout
              align-center
              justify-center
      >
        <LoginForm/>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
  import LoginForm from "../components/LoginForm";

  export default {
    name: 'Login',
    components: {
      LoginForm
    }
  };
</script>
