<template>
  <div>
    <v-navigation-drawer
      elevation="2"
      :disable-resize-watcher="true"
      permanent
      color="surface"
    >
      <v-list nav>
        <div
          v-for="route in routeElements"
          :key="`${route.title}-route`"
        >
          <v-list-item
            v-if="!route.children || route.children.length == 0"
            :title="route.title"
            :prepend-icon="route.icon"
            :to="route.to || undefined"
          />
        </div>
      </v-list>
    </v-navigation-drawer>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { type RouteElement, routes } from '~/layouts/routes';

const routeElements: RouteElement[] = routes;
</script>

<style scoped>

</style>
