// 放 寶可夢卡片 元件
// 放 寶可夢卡片 元件
// prop IN, emit OUT
export default {
    props: {
      pokemon: {
        type: Object,
        required: true
      }
    },
    methods: {
      showPokemon() {
        this.$emit('show-modal')
      }
    },
    template: `
    <div class="col-6 col-md-4 col-lg-3 my-3">
    <div class="card bg-light">
      <div class="card-body p-0">
        <div class="card-img">
          <img
            :src="pokemon.img"
            class="card-img-top"
          />
        </div>
        <h5
          class="card-title rounded bg-dark text-light d-flex p-1 mx-3"
        >
          <span class="pokemon-id pl-2">{{ pokemon.id }}</span>
          <span>．</span>
          <span class="pokemon-name">{{ pokemon.name }}</span>
        </h5>
      </div>
      <div class="card-footer text-center bg-light border-0">
        <a
          @click="showPokemon"
          href="#"
          data-toggle="modal"
          data-target=".modal"
          class="btn btn-secondary"
          >詳細資訊</a
        >
      </div>
    </div>
  </div>
    `
  }