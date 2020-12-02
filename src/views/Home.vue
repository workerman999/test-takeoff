<template>
    <div>
        <Navbar/>
        <Contacts/>
    </div>
</template>

<script>
    import Navbar from "../components/Navbar";
    import Contacts from "../components/Contacts";

    export default {
        name: "Home",
        components: {
            Navbar,
            Contacts
        }
    }
</script>

<style scoped>

</style>