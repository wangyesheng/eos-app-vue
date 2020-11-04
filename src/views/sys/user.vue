<template>
  <div>
    <!-- <date-picker
      :value="now"
      @input="val=>now=val"
    /> -->
    <date-picker v-model="now" />
    哈哈哈哈
  </div>
</template>

<script>
import DatePicker from '@/components/DatePicker';
export default {
  components: {
    'date-picker': DatePicker,
  },
  data() {
    return {
      now: new Date(),
    };
  },
};
</script>