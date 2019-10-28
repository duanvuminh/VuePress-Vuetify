---
title: VuePress with Vuetify
lang: vn
createdDate: 2019/10/28 10:00
---
# Giới thiệu

Trong bài viết này mình sẽ giới thiệu tích hợp Vuetify vào VuePress.VuePress là framework dựa trên vue để làm việc với site có nội dung tĩnh.Vuetify là UI framework trên vue.

# Cài đặt VuePress

Cài đặt VuePress trên một folder có sẵn [VuePress Office](https://vuepress.vuejs.org/guide/getting-started.html#inside-an-existing-project)

``` bash
# install as a local dependency
yarn add -D vuepress # OR npm install -D vuepress

# create a docs directory
mkdir docs
# create a markdown file
# you should manual create file on window for properly font problems
echo '# Hello VuePress' > docs/README.md
```

# Cài đặt Vuetify

Dựa trên [Vuetify offical](https://vuetifyjs.com/en/getting-started/quick-start#existing-applications)

``` bash
$ yarn add vuetify
// OR
$ npm install vuetify
```

Sau đó cấu hình VuePress như bên dưới.

``` js
# config.js

module.exports = {
    head: [
        ['link', { rel: 'stylesheet', href: `https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900` }],
        ['link', { rel: 'stylesheet', href: `https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css` }]
    ],
    plugins: [
        ['@vuepress/search', {
            searchMaxSuggestions: 10
        }]
    ]
}
```

``` js
# enhanceApp.js

import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import 'material-design-icons-iconfont/dist/material-design-icons.css';

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  Vue.use(Vuetify);
  options.vuetify = new Vuetify({
    icons: {
      iconfont: 'mdi', // default - only for display purposes
    }
  })
};
```

# Style theme default

Khi tiến hành sửa đổi theme, style của theme mặc định sẽ không được load ra chính vì vậy mà mình sẽ lấy toàn bộ theme mặc định về sau đó chỉnh sửa để giữ nguyên style mặc định cho markdown.

``` bash
# download default theme to docs
vuepress eject docs
```

# Chỉnh sửa Layout dùng vuetify

``` vue
# Layout.vue

<template>
  <v-app id="keep">
    <v-app-bar app clipped-left color="amber">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <span class="title ml-3 mr-5">OBOE</span>
      <v-spacer></v-spacer>
      <SearchBox />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped color="grey lighten-4">
      <v-list dense class="grey lighten-4">
        <template v-for="(item, i) in items">
          <v-row v-if="item.heading" :key="i" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-col>
            <v-col cols="6" class="text-right">
              <v-btn small text>edit</v-btn>
            </v-col>
          </v-row>
          <v-divider v-else-if="item.divider" :key="i" dark class="my-4"></v-divider>
          <v-list-item v-else :key="i" @click>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container fluid class="grey lighten-4 fill-height">
        <v-layout pa-5 class="customcss">
          <Content />
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import SearchBox from "@SearchBox";

export default {
  components: { SearchBox },
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    items: [
      { icon: "lightbulb_outline", text: "Notes" },
      { icon: "touch_app", text: "Reminders" },
      { divider: true },
      { heading: "Labels" },
      { icon: "add", text: "Create new label" },
      { divider: true },
      { icon: "archive", text: "Archive" },
      { icon: "delete", text: "Trash" },
      { divider: true },
      { icon: "settings", text: "Settings" },
      { icon: "chat_bubble", text: "Trash" },
      { icon: "help", text: "Help" },
      { icon: "phonelink", text: "App downloads" },
      { icon: "keyboard", text: "Keyboard shortcuts" }
    ]
  })
};
</script>
<style lang="scss">
.customcss {
  code {
    background-color: unset;
    color: inherit;
    box-shadow: none;
  }
}
</style>
```
# Chạy thử trên trình duyệt thôi
``` bash
# start writing
vuepress dev

# build
vuepress build
```