const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue( {
    el: '#app',
    data: {
        isVisibleCart: false,
        searchLine: '',
        catalogUrl: `/catalogData.json`,
        products: [],
        cartItems: [],
        isCartFull: false,
        cartProductsCount: 0,
        cartProductsSum: 0,
        imgCatalog: `https://placehold.it/200x150`,
        imgCart: `https://placehold.it/50x70`,
    },
    computed: {
    
    },
    methods: {
        getJson( url ) {
            return fetch( url )
                .then( result => result.json() )
                .catch( error => console.log( error ) )
        },
        addProduct( product ) {
            this.getJson( `${ API }/addToBasket.json` )
                .then( data => {
                    if ( data.result ) {
                        let find = this.cartItems.find( el => el.id_product === product.id_product );
                        this.cartProductsCount++;
                        this.cartProductsSum += product.price;
                        if ( find ) {
                            find.quantity++;
                            
                        
                        } else {
                            let prod = Object.assign( { quantity: 1 }, product );
                            this.cartItems.push( prod );
                            
                            
                        }
                        this.isCartFull = !!this.cartItems.length;
                       
                        
                    } else {
                        console.log( 'Error!' );
                    }
                } )
        },
        removeProduct( product ) {
            this.getJson( `${ API }/deleteFromBasket.json` )
                .then( data => {
                    if ( data.result ) {
                        let id = +product.id_product;
                        
                        let find = this.cartItems.find( el => el.id_product === id );
                        this.cartProductsCount--;
                        this.cartProductsSum -= product.price;
                        if ( find.quantity > 1 ) {
                            find.quantity--;
                        } else {
                            this.cartItems.splice( this.cartItems.indexOf( find ), 1 );
                        }
                        this.isCartFull = !!this.cartItems.length;
                        
                        
                    } else {
                        console.log( 'Error!' );
                    }
                } )
        },
        FilterGoods( value ) {
            const regexp = new RegExp( value, 'i' );
            this.filtered = this.products.filter( el => regexp.test( el.product_name ) );
            this.products.forEach( el => {
                const block = document.querySelector( `.product-item[data-id="${ el.id_product }"]` );
                if ( this.filtered.includes( el ) ) {
                    block.classList.remove( 'invisible' )
                } else {
                    block.classList.add( 'invisible' )
                }
            } )
        },
        init() {
            document.querySelector( '.search-form' ).addEventListener( 'submit', e => {
                e.preventDefault();
            } );
            if ( this.cartItems.length ) {
                this.isCartFull = true;
            }
        },
        correctWord( value, words ) {
            let cases = [ 2, 0, 1, 1, 1, 2 ];
            return words[ ( value % 100 > 4 && value % 100 < 20 ) ? 2 : cases[ ( value % 10 < 5 ) ? value % 10 : 5 ] ];
        },
    },
    mounted() {
        this.init();
        this.getJson( `${ API + this.catalogUrl }` )
            .then( data => {
                for ( let el of data ) {
                    this.products.push( el )
                }
            } );
        this.getJson( `getProducts.json` )
            .then( data => {
                for ( let el of data ) {
                    this.products.push( el )
                }
            } );
        
    }
} );