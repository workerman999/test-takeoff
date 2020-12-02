<template>
    <v-card v-if="contact.name"
            class="mx-auto"
    >
        <v-toolbar
                color="info"
                dark
        >
            <v-toolbar-title>Данные контакта - {{this.contact.name}}</v-toolbar-title>
        </v-toolbar>

        <v-card-title>Электронная почта</v-card-title>
        <v-card-text>
            {{this.contact.email}}
        </v-card-text>

        <v-card-title>Телефон</v-card-title>
        <v-card-text>
            {{this.contact.phone}}
        </v-card-text>

        <v-card-actions>
            <v-btn
                    color="deep-purple"
                    text
                    @click="updateContact()"
            >
                Изменить контакт
            </v-btn>
            <v-btn
                    color="red"
                    text
                    @click="showDeleteContact = true"
            >
                Удалить контакт
            </v-btn>
        </v-card-actions>
        <UpdateContact :dialog="showUpdateContact" :title="title" :contact="contact"
                       @close="showUpdateContact = false" @save="save"></UpdateContact>
        <ConfirmModal :dialog="showDeleteContact" @close="close" @delete="delContact"></ConfirmModal>
    </v-card>
</template>

<script>
    import UpdateContact from './UpdateContact'
    import ConfirmModal from './ConfirmModal'

    export default {
        name: "InfoContact",
        components: {
            UpdateContact,
            ConfirmModal
        },
        data: () => ({
            showUpdateContact: false,
            showDeleteContact: false,
            title: ''
        }),
        props: {
            contact: Object
        },
        methods: {
            updateContact() {
                this.title = 'Изменить контакт';
                this.showUpdateContact = true;
            },
            close() {
                this.showDeleteContact = false;
            },
            save(data) {
                this.showUpdateContact = false;
                this.$emit('save', data);
            },
            delContact() {
                this.showDeleteContact = false;
                this.$emit('delete', this.contact.id);
            }
        }
    }
</script>

<style scoped>

</style>