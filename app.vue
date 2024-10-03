<template>
  <v-theme-provider theme="dark">
    <v-locale-provider locale="de">
      <v-app>
        <v-main height="100vh">
          <NuxtLayout>
            <NuxtPage />
          </NuxtLayout>
          <confirmation-dialog />
        </v-main>
      </v-app>
    </v-locale-provider>
  </v-theme-provider>
</template>
