<template>
  <nav class="navbar">
    <ul>
      <li>
        <RouterLink to="/" class="router-link" activeClass="active-link">Home</RouterLink>
      </li>

      <li>
        <RouterLink to="/about" class="router-link" activeClass="active-link">About</RouterLink>
      </li>

      <li>
        <RouterLink to="/assignments" class="router-link" activeClass="active-link">
          Assignments
        </RouterLink>
      </li>

      <li>
        <RouterLink to="/users" class="router-link" activeClass="active-link"> Users </RouterLink>
      </li>
    </ul>

    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="50" height="50" />
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 2rem;
  background-color: #2f5634;
}

ul {
  list-style-type: none;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0;
}

.router-link {
  font-size: 1.5rem;
  font-weight: 500;
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
  border-radius: 0.2rem;
  padding: 0.5rem 1rem;
}

.active-link {
  background-color: hsla(160, 100%, 37%, 0.2);
}

.router-link:hover {
  background-color: hsla(160, 100%, 37%, 0.2);
}

.logo {
  rotate: 60deg;
}
</style>
