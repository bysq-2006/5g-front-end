<template>
  <div class="operator-information">
    <!-- 运营商信息内容 -->
    <h3>运营商信息</h3>
    <div class="identification">
      <img :src="imgSrc" alt="" class="logo">
      <div class="details">
        <p><span>SIM/运营商:</span> <span>{{ operator }}</span></p>
        <p><span>MCC:</span> <span>{{ mcc }}</span></p>
        <p><span>MNC:</span> <span>{{ mnc }}</span></p>
      </div>
    </div>
  </div>
</template>

<script setup name="OperatorInformation">
const props = defineProps({
  imgSrc: {
    type: String,
    default: ''
  },
  operator: {
    type: String,
    default: ''
  },
  mcc: {
    type: String,
    default: ''
  },
  mnc: {
    type: String,
    default: ''
  }
});

</script>

<style scoped lang="scss">
.operator-information {
  width: 450px;
  height: 200px;

  .identification {
    display: flex;
    margin-top: 16px;
    gap: 12px;

    .logo {
      width: 200px;
      height: 100px;
      object-fit: contain;
      border-radius: 4px;
    }

    .details {
      flex: 1;

      p {
        display: flex;
        border-bottom: 1px solid var(--border-color);
        justify-content: space-between;
        padding: 4px;
        font-size: 16px;
        color: var(--text-secondary);

        span:last-child {
          color: var(--text-primary);
        }
      }

      p:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>