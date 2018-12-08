<template>
    <div id="app">
        <Menu />
        <div class="container">
            <div class="columns">
                <div class="column is-3">
                    <Nav />
                </div>
                <div class="column is-9">
                    <router-view/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Menu from '@/components/Menu.vue'
import Nav from '@/components/Nav.vue'
export default {
  name: 'App',
    components:{
        Menu,
        Nav
    }
}
</script>
