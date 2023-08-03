app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true,
        }
    },
    template:
        `
          <div class="product-display">
            <div class="product-container">
              <div class="product-image">
                <img :src="image" alt="socks image">
              </div>
              <div class="product-info">
                <h1>{{ title }}</h1>
                <p>{{ description }}</p>
                <p>{{ inStock }}</p>
                <p v-if="inStock > 10">In stock</p>
                <p v-else-if="inStock  <= 10 && inStock > 0">Almost sold out</p>
                <p v-else>Out of stock</p>
                <p>Shipping: {{ shipping }}</p>
                <ul>
                  <li v-for="detail in details">{{ detail }}</li>
                </ul>
                <div class="color-circle"
                     :style="{ backgroundColor: variant.color}"
                     v-for="(variant, index) in variants"
                     :key="variant.id"
                     v-on:mouseover="updateVariant(index)">
                </div>
                <button
                    class="button"
                    v-on:click="addToCart"
                    :class="{ disabledButton: inStock < 1 }"
                >
                  Add to Cart
                </button>
                <button class="button" v-on:click="removeFromCart">Remove</button>
              </div>
            </div>
            <review-list v-if="reviews.length" :reviews="reviews"></review-list>
            <review-form @review-submitted="addReview"></review-form>
          </div>
        `,
    data() {
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
            selectedVariant: 0,
            description: 'Some warm socks',
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                {id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50},
                {id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg ', quantity: 0},
            ],
            reviews: []
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)

        },
        removeFromCart() {
            if (this.cart > 0) {
                this.cart -= 1
            }
        },
        updateVariant(index) {
            this.selectedVariant = index
        },
        addReview(review) {
            this.reviews.push(review)
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            } else {
                return '2.99'
            }
        }
    }
})
