<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="hover" placement="bottom">
        <div class="avatar-wrapper">
          <img
            src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3806311023,739217486&fm=26&gp=0.jpg"
            class="user-avatar"
          />
          <span class="username">{{userinfo.username}}</span>
        </div>
        <div>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/">
              <el-dropdown-item>Home</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">Log Out</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </div>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Hamburger from "@/components/Hamburger";

export default {
  components: {
    Hamburger
  },
  computed: {
    ...mapGetters(["sidebar", "userinfo"])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    logout() {
      this.$confirm("Are you sure you want to log out?", "Tips", {
        confirmButtonText: "Sure",
        cancelButtonText: "Cancel",
        type: "warning"
      })
        .then(async () => {
          await this.$store.dispatch("user/logout");
          this.$router.push(`/login?redirect=${this.$route.fullPath}`);
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.01), 0 10px 30px rgba(0, 0, 0, 0.08);

  .hamburger-container {
    line-height: 60px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;
        margin-top: 10px;
        .username {
          position: relative;
          bottom: 10px;
          left: 5px;
        }

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
