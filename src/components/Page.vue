<template>
  <div>
      <ul>
         <com-up>
             <li slot="pre" slot-scope="stData">{{stData.pre}}</li>
         </com-up>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <com-down>
              <li slot="next" slot-scope="stData">{{stData.next}}</li>
          </com-down>
      </ul>
  </div>
</template>

<script>
import ComUp from './Up'
import ComDown from './Down'
export default {
  components: {
    'com-up': ComUp,
    'com-down': ComDown
  }
}
</script>

<style lang="less" scoped>
</style>
