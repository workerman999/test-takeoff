<template>
    <v-container class="custom-container">
        <v-row>
            <v-col>
                <ListContacts @setSelectedContact="setContact" @save="save"></ListContacts>
            </v-col>
            <v-col>
                <InfoContact :contact="contact" @save="save" @delete="delContact"></InfoContact>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import ListContacts from "./ListContacts";
    import InfoContact from "./InfoContact";
    import Contact from '../models/Contact'
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "Contacts",
        components: {
            ListContacts,
            InfoContact
        },
        data: () => ({
            contact: new Contact()
        }),
        computed: mapGetters(['getIdOfLastContact']),
        methods: {
            ...mapActions(['saveContact', 'deleteContact']),
            setContact(data) {
                this.contact = data;
            },
            save(data) {
                if (!data.id) {
                    data.id = this.getIdOfLastContact + 1;
                }
                this.saveContact(data);
            },
            delContact(id) {
                this.deleteContact(id);
                this.contact = new Contact();
            }
        }
    }
</script>

<style scoped>
    .custom-container {
        padding-top: 64px;
    }
</style>