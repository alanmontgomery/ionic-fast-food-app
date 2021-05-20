import { useState } from 'react';
import { IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardSubtitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonSlide, IonSlides, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewWillLeave } from '@ionic/react';

import styles from "./Home.module.scss";
import { cart, heart } from 'ionicons/icons';

import { ProductStore } from '../data/ProductStore';
import { FavouritesStore } from '../data/FavouritesStore';
import { CartStore } from '../data/CartStore';
import { Link } from 'react-router-dom';
import { CategorySlide } from '../components/CategorySlide';

const Home = () => {

  	const products = ProductStore.useState(s => s.products);
  	const favourites = FavouritesStore.useState(s => s.product_ids);
	const shopCart = CartStore.useState(s => s.product_ids);

	useIonViewWillLeave(() => {

        document.querySelector("#slider").stopAutoplay();
    });

    useIonViewDidEnter(() => {
        
        document.querySelector("#slider") && document.querySelector("#slider").startAutoplay();
        document.querySelector("#slider") && document.querySelector("#slider").update();
    });

	return (
		<IonPage id="home-page" className={ styles.homePage }>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Popular</IonTitle>

					<IonButtons slot="start" className="ion-padding-start">
						<IonCardSubtitle className={ styles.logo }>Ionic Food</IonCardSubtitle>
					</IonButtons>

					<IonButtons slot="end">
						<IonBadge color="danger">
                            { favourites.length }
                        </IonBadge>
						<IonButton color="danger" routerLink="/favourites">
							<IonIcon icon={ heart } />
						</IonButton>

						<IonBadge color="dark">
                            { shopCart.length }
                        </IonBadge>
						<IonButton color="dark" routerLink="/cart">
							<IonIcon icon={ cart } />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			
			<IonContent fullscreen>

				<IonGrid>
					<IonRow className={ `ion-align-items-center ${ styles.offerSection }` }>
						<IonCol size="4">
							<img src="/assets/offer.png" alt="order method" />
						</IonCol>

						<IonCol size="8">
							<h4>Kids eat free on any orders over £20.00</h4>
							<IonCardSubtitle>Valid until July &rarr;</IonCardSubtitle>
						</IonCol>
					</IonRow>
				</IonGrid>

				<IonHeader collapse="condense">
					<IonToolbar>
					<IonTitle size="large">
						Let's eat
					</IonTitle>
					</IonToolbar>
				</IonHeader>

				<IonSlides id="slider" options={{ slidesPerView: "auto", zoom: true, grabCursor: true }} className={ `${ styles.categorySlider }` }>
					<CategorySlide name="Burgers" path="/category/burgers" image="/assets/burgers.webp" />
					<CategorySlide name="Sides" path="/category/sides" image="/assets/sides.png" />
					<CategorySlide name="Chicken" path="/category/chicken" image="/assets/chicken2.jpeg" />
					<CategorySlide name="Drinks" path="/category/drinks" image="/assets/drink.webp" />
					<CategorySlide name="Veggie" path="/category/veggie" image="/assets/veggie3.png" />
					<CategorySlide name="Kids" path="/category/kids" image="/assets/kids.png" />
				</IonSlides>

				<IonGrid>
					<IonRow className={ `ion-align-items-center ${ styles.orderSection }` }>
						<IonCol size="4">
							<img src="/assets/van.png" alt="order method" />
						</IonCol>

						<IonCol size="8">
							<h4>Order for a collection or get a local delivery</h4>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Home;