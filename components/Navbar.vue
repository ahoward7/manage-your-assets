<template>
  <nav class="flex justify-between items-center px-4 py-2 shadow-md bg-gray-50">
    <NuxtLink to="/" class="text-xl font-bold text-blue-500 cursor-pointer">
      Manage Your Assets
    </NuxtLink>
    <div>
      <NuxtLink to="/login">
        <ButtonPrimary>
          Login
        </ButtonPrimary>
      </NuxtLink>
    </div>
  </nav>
</template>
