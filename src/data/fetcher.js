import { ProductStore } from "./ProductStore";

export const fetchData = async () => {

    const json = ["new.json", "chicken.json", "veggie.json", "burgers.json", "sides.json", "drinks.json", "kids.json"];

    var products = [];

    json.forEach( async category => {

        products = await fetchProducts(category);

		products.forEach(product => {

			product.price = `£${ (Math.floor(Math.random() * (10 - 4 + 1))).toFixed(2) }`;
		});

        let categoryName = category.replace(".json", "");
        categoryName = categoryName.replaceAll("_", " ");
        categoryName = uppercaseWords(categoryName);

        const foodCategory = {

            name: categoryName,
            slug: category.replace(".json", ""),
            cover: products[1].image,
            products
        };

        ProductStore.update(s => { s.products = [ ...s.products, foodCategory ]; });
    });

    return products;
}

const fetchProducts = async category => {

    const response = await fetch(`categories/${ category }`);
    const data = await response.json();

    //  Set a category id
    await data.forEach((d, i) => {

        d.id = i + 1;
    });

    return data;
}

const uppercaseWords = words => {

    words = words.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');

    return words;
}