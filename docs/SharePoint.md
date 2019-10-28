---
title: Vue SPA với Sharepoint 
lang: en-US
createdDate: 2019/10/28 9:02
---
# Hướng dẫn viết webpart cho sharepoint online với Vue

Cài đặt vue cho Sharepoint Online [Offical Installation](https://pnp.github.io/generator-spfx/#installation), [Video tutorial](https://pnp.github.io/generator-spfx/#watch-it-in-action)

``` bash
npm install -g @pnp/generator-spfx
# init project
yo @pnp/spfx
```

# Cấu hình single page cho sharepoint

Cài đặt vue router

``` bash
npm install vue-router
```
Cấu hình router tương ứng các component cho vue.

``` vue
# ***webPart.ts
// Importing Vue.js SFC
import PdetailComponent from './components/Pdetail.vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

let el = new Vue({
      el: `#${id}`,
      vuetify: new Vuetify(),
      router: new VueRouter({
        mode: 'history',
        base: "/sites/dev1/SitePages/wgpeople.aspx",
        routes: [
          {
            path: '/',
            name: 'home',
            component: PeopleSearch,
            children: [{
              path: '/search',
              component: PeopleSearch
            }]
          },
          {
            path: '/Detail/:pid',
            name: 'detail',
            component: PeopleDetail
          }
        ]
      }),
      render: h => h(PdetailComponent, {
        props: {
          description: this.properties.description
        }
      })
    });
  }
```
``` vue
# Pdetail.vue

<template>
  <v-app :id="$style.keep">
    <v-content app>
      <v-container>
        <v-layout align-center justify-center>
          <router-view />
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

```
# source code

[Git Hub Source]()