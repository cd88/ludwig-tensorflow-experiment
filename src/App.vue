<template>
  <div id="app">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <FileUploader @fileUploaded="handleUpload($event)"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import FileUploader from './components/FileUploader.vue'

export default {
  name: 'App',
  components: {
  HelloWorld,
  FileUploader
  },
  data () {
    return {
      columns:  ["Pclass", "Sex", "SibSp", "Parch", "Embarked"],
      dictionary: null,
    }
  },
  computed: {
    dataset () {
      return { columns: this.columns, dataset: this.dictionary }
    }
  },
  methods: {
    handleUpload($event) {
      console.log($event);
      let vm = this
      this.$papa.parse($event, {
        header: true,
        download: true,
        skipEmptyLines: true,
        complete: function (results) {
          const { data } = results
          vm.dictionary = data.map(function (el) {
            return vm.columns.reduce((arr, col) => {
              arr.push(el[col])
              return arr
            }, [])
          })
          vm.runModels()
        }
      })
    },
    async runModels() {
      try {
        const data = this.dataset
        const url = 'http://0.0.0.0:8002/batch_predict'

        await this.axios.post(url, {
          data,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data'
          }
        }).then(function(response) {
          console.log('axios response: ', response);
        })
      } catch (error) {
        console.error('Post error: ', error, '\n data sent: ', this.dataset)
      }
      // eslint-disable-next-line no-console
      // return this.csv
      // this.axios.get(api).then((response) => {
      //   console.log(response.data)
      // })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
