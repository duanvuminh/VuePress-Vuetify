<template>
  <v-app id="keep">
    <v-app-bar app clipped-left color="amber">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <a class="title ml-3 mr-5" href="/blog">OBOE</a>
      <v-spacer></v-spacer>
      <SearchBox />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped color="grey lighten-4">
      <v-list dense class="grey lighten-4">
        <template v-for="(item, i) in items">
          <v-divider v-if="item.divider" :key="i" dark class="my-4"></v-divider>
          <a v-else :key="i" :href="`/blog${item.href}`">
          <v-list-item >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          </a>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container fluid class="grey lighten-4 fill-height">
        <v-row justify="center" align="center" class="customcss pa-10">
          <Content />
        </v-row>
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
    items: []
  }),
  mounted() {
    // console.log(this.$site);
    // console.log(this.$page);
    this.items = [
      { icon: "lightbulb_outline", text: "About Me", href: "/Aboutme.html" },
      { divider: true }
    ];
    let top2 = this.$site.pages
      .filter(x => {
        return (
          new Date(x.frontmatter.createdDate) <=
            new Date(this.$page.frontmatter.createdDate) &&
          x.path != "/Aboutme.html" &&
          x.key != this.$page.key
        );
      })
      .map(x => {
        return { text: x.title, href: x.path };
      })
      .slice(0, 5);
    if (top2 != null) {
      this.items = this.items.concat(top2);
    }
  }
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