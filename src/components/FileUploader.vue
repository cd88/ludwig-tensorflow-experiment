<template>
    <div id="app">
    <h2>Select an file</h2>
      <div v-if="!inputFile">
        <input type="file" @change="onFileChange">
      </div>
      <div v-else>
        <button @click="removeFile">Remove file</button>
    </div>
    {{inputFile}}
    </div>
</template>

<script>

export default {
  name: 'FileUploader',
  components: {
  },
  data () {
      return {
          inputFile: null
      }
  },
  props: {
    // inputFile: String
  },
  watch: {
      inputFile (val) {
          if (val) {
              this.$emit('fileUploaded', this.inputFile)
          }
      }
  },
  methods: {
  onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createFile(files[0]);
      console.log();
    },
    createFile(inputFile) {
      const reader = new FileReader();
      const vm = this;

      reader.onload = (e) => {
        vm.inputFile = e.target.result;
      };
      reader.readAsDataURL(inputFile)

    },
    removeFile: function () {
      this.inputFile = '';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
