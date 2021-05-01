<template>
    <div>
        <div v-if="account.user"> 
        <h4 class='text-center'>Welcome to URL shortener, {{account.user.firstName}}!</h4>
        <h5 class='text-center'>Your shortcuts:</h5>
        <em v-if="shortcuts.loading">Loading shortcuts...</em>
        <span v-if="shortcuts.error" class="text-danger">{{shortcuts.error}}</span>
        <div v-if="shortcuts.items">
            <div class="media border p-2"  v-for="shortcut in shortcuts.items" :key="shortcut.id" >
                <div class="media-body">
                    <h6>
                        <a >{{  shortcut.sk }}</a> <small><i>  {{ "ID:" + shortcut.id }}</i></small>
                        <span v-if="account.user && account.user.id === shortcut.user" class="badge badge-warning badge-pill float-right"> 
                        <a @click="deleteShortcut(shortcut.id)">Delete</a>
                        </span> 
                    </h6>
                    <p>
                        <a :href= "shortcut.link" target="_blank">{{shortcut.link}}</a> 
                    </p>
                    <span v-if="shortcut.deleting"><em> - Deleting shortcut...</em></span>
                    <span v-else-if="shortcut.deleteError" class="text-danger"> - ERROR: {{shortcut.deleteError}}</span>
                </div>
            </div>
        </div>
        <div><router-link to="/add" class="btn btn-success">Create URL shortcut</router-link></div>
        </div>
        <div v-else>
            <h4 class='text-center'>Welcome to URL shortener!</h4>
            <h5 class='text-center'>To access your shortcuts or create new ones please 
                <router-link to="/login">log in</router-link> or <router-link to="/register">sign up</router-link></h5>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            sav: '',
        }
    },
    computed: {
        ...mapState({
            account: state => state.account,
            shortcuts: state => state.shortcuts.all,
        })
    },
    created () {
        this.getUserShortcuts(this.account.user.id);
    },
    methods: {
        ...mapActions(
        'shortcuts', {
            getUserShortcuts: 'getUserShortcuts',
            deleteShortcut: 'delete',
        })

    }
};
</script>