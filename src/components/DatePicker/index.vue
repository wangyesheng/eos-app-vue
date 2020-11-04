<template>
  <div
    class="date-picker-wrap"
    v-click-outside
  >
    <input
      type="text"
      :value="formatDate"
    >
    <div
      class="pannel"
      v-if="isVisible"
    >
      <div class="pannel-nav">
        <span>&lt;</span>
        <span>&lt;&lt;</span>
        <span>xxx年</span>
        <span>xxx月</span>
        <span>&gt;</span>
        <span>&gt;&gt;</span>
      </div>

      <div class="pannel-content">
        <div>
          <span
            class="cell"
            v-for="item in weekdays"
            :key="item"
          >{{item}}</span>
        </div>
        <div
          v-for="i in 6"
          :key="i"
        >
          <span
            class="cell draw"
            v-for="j in 7"
            :key="j"
            :class="[
                {notCurMonth:!isCurMonth(i,j)},
                {isToday: isToday(i,j)}
            ]"
            @click="chooseDate(i,j)"
          >{{curLoopDay(i,j).getDate()}}</span>
        </div>
      </div>
      <div class="pannel-footer">今天</div>
    </div>
  </div>
</template>

<script>
import * as timeUtil from '../../utils/time';
export default {
  props: {
    value: {
      type: Date,
      default: () => new Date(),
    },
  },
  computed: {
    visibleDays() {
      const { year, month } = timeUtil.getYearMonthDay(this.value);
      // 每月第一天
      const curMonthFirstDay = timeUtil.getDate(year, month, 1);
      // 每月第一天是周几
      const curWeekday = curMonthFirstDay.getDay();
      // 一天的毫秒数
      const oneDayMilliSeconds = 60 * 60 * 1000 * 24;
      // 当前是周几就将天数向前移动几天
      const startDay = curMonthFirstDay - curWeekday * oneDayMilliSeconds;
      const dates = [];
      for (let i = 0; i < 42; i++) {
        dates.push(new Date(startDay + i * oneDayMilliSeconds));
      }
      return dates;
    },
    formatDate() {
      const { year, month, day } = timeUtil.getYearMonthDay(this.value);
      return `${year}-${month + 1}-${day}`;
    },
  },
  directives: {
    clickOutside: {
      bind(el, bingings, vnode) {
        const handler = (e) => {
          if (el.contains(e.target)) {
            if (!vnode.context.isVisible) {
              vnode.context.focus();
            }
          } else {
            if (vnode.context.isVisible) {
              vnode.context.blur();
            }
          }
        };
        el.handler = handler;
        document.addEventListener('click', handler);
      },
      unbind(el) {
        document.removeEventListener('click', el.handler);
      },
    },
  },
  data() {
    return {
      weekdays: ['日', '一', '二', '三', '四', '五', '六'],
      isVisible: false,
    };
  },
  methods: {
    focus() {
      this.isVisible = true;
    },
    blur() {
      this.isVisible = false;
    },
    curLoopDay(i, j) {
      return this.visibleDays[(i - 1) * 7 + (j - 1)];
    },
    isCurMonth(i, j) {
      const curDate = this.curLoopDay(i, j);
      const { year, month } = timeUtil.getYearMonthDay(this.value);
      const { year: y, month: m } = timeUtil.getYearMonthDay(curDate);
      return year == y && month == m;
    },
    isToday(i, j) {
      const curDate = this.curLoopDay(i, j);
      const { year, month, day } = timeUtil.getYearMonthDay(new Date());
      const { year: y, month: m, day: d } = timeUtil.getYearMonthDay(curDate);
      return year == y && month == m && day == d;
    },
    chooseDate(i, j) {
      const curDate = this.curLoopDay(i, j);
      this.$emit('input', curDate);
    },
  },
};
</script>

<style lang="scss" scoped>
.date-picker-wrap {
  .pannel {
    width: 32 * 7px;
    background: #fff;
    .pannel-nav {
      height: 30px;
      display: flex;
      justify-content: space-around;
    }
    .pannel-content {
      .cell {
        display: inline-flex;
        justify-content: center;
        align-content: center;
        width: 32px;
        height: 32px;
        line-height: 32px;
      }
      .draw {
        cursor: pointer;
        &:hover {
          background: #fff1f0;
        }
      }
      .notCurMonth {
        color: #ccc;
      }
      .isToday {
        background: #ff0000;
        border-radius: 50%;
        color: #fff;
      }
    }
    .pannel-footer {
      height: 30px;
      text-align: center;
    }
  }
}
</style>