<template>
  <div>
    <el-row class="sys-header" type="flex" align="middle" justify="space-between">
      <p>{{ $t('HealthEducation') }}</p>
      <el-button size="small" type="primary">{{ $t('create') }}</el-button>
    </el-row>
    <div class="sys-main">
      <div class="main-inside">
        <el-row class="mb-8 mr-auto" type="flex">
          <el-input size="small" :placeholder="$t('keyword')"></el-input>
          <el-button class="ml-16" type="warning" size="small">{{ $t('search') }}</el-button>
          <el-button class="ml-16" type="info" size="small">{{ $t('reset') }}</el-button>
        </el-row>
        <el-table :data="data.list">
          <el-table-column label="Health Education Category" width="250">
            <template slot-scope="scope">
              <span>{{ scope.row.typeName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Health Education Name" min-width="250">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Enable" width="125" align="center">
            <template slot-scope="scope">
              <i class="el-icon-check" v-if="scope.row.isEnable"></i>
              <i class="el-icon-close" v-if="!scope.row.isEnable"></i>
            </template>
          </el-table-column>
          <el-table-column label="Use in lobby" width="125" align="center">
            <template slot-scope="scope">
              <i class="el-icon-check" v-if="scope.row.lobbyUse"></i>
              <i class="el-icon-close" v-if="!scope.row.lobbyUse"></i>
            </template>
          </el-table-column>
          <el-table-column width="100" align="right">
            <template slot-scope="scope">
              <el-button size="mini">{{ $t('edit') }}</el-button>
            </template>
          </el-table-column>
          <el-table-column width="100" align="right">
            <template slot-scope="scope">
              <el-button size="mini" type="danger">{{ $t('delete') }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      search: {
        typeId: '',
        isEnable: null,
        lobbyUse: null,
        keyword: '',
        orderBy: 'typeName',
        orderByDesc: true,
      },
      currentPage: 1,
    };
  },
  computed: {
    domain() {
      return this.$store.state.domain;
    },
  },
  methods: {
    getList() {
      const api = `http://${this.domain}.upis.info/Api/HealthEdu/List/${this.currentPage}`;
      const dataJS = JSON.stringify(this.search);
      this.$http.post(api, dataJS).then((res) => {
        this.data = res.data.content;
      });
    },
  },
  created() {
    this.$store.commit('VERIFY');
    this.getList();
  },
};
</script>


<style lang="scss" scoped>
@import "../../../assets/styles/helpers.scss";

.el-icon-check {
  color: #67c23a;
  font-size: 1.25rem;
  font-weight: bold;
}

.el-icon-close {
  color: #f56c6c;
  font-size: 1.25rem;
  font-weight: bold;
}
</style>
