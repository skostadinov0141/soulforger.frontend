<template>
  <v-theme-provider theme="light">
    <v-locale-provider locale="de">
      <v-app>
        <v-main>
          <NuxtLayout>
            <NuxtPage />
          </NuxtLayout>
        </v-main>
      </v-app>
    </v-locale-provider>
  </v-theme-provider>
</template>
