<template>
    <v-app-bar
            app
            dark
    >
        <v-toolbar-title class="name-app mx-6"><h3>{{getUser.name}} - контакты</h3></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="logout()">
            Выход
        </v-btn>
    </v-app-bar>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "Navbar",
        data: () => ({
            endExamination: false,
            version: ''
        }),
        computed: mapGetters(['getUser']),
        methods: {
            ...mapActions(['setAuth']),
            logout () {
                this.setAuth(false);
                this.$router.push('/');
            }
        }
    }
</script>

<style lang="scss" scoped>


</style>
