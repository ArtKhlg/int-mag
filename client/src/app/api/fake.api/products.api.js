// import { categories } from "./categories.api";
const categories = {
    autos: {
        id: "1001",
        name: "Автомобили",
        type: {
            passengerCars: { id: "1001-1", name: "Легковые" },
            trucks: { id: "1001-2", name: "Грузовые" }
        }
    },
    animals: {
        id: "1002",
        name: "Животные",
        type: {
            home: { id: "1002-1", name: "Домашние" },
            birds: { id: "1002-2", name: "Птицы" },
            wild: { id: "1002-3", name: "Дикие" }
        }
    },
    electronics: {
        id: "1003",
        name: "Электроника",
        type: {
            phones: { id: "1003-1", name: "Телефоны" },
            tv: { id: "1003-2", name: "Телевизоры" }
        }
    },
    plants: {
        id: "1004",
        name: "Растения",
        type: {
            trees: { id: "1004-1", name: "Деревья" },
            flowers: { id: "1004-2", name: "Цветы" }
        }
    }
};
const products = [
    {
        _id: "67rdca3eeb7f6fgeed471801",
        name: "Белка Летяга",
        category: categories.animals,
        price: 15000,
        quantity: 20,
        image: "https://avatars.dzeninfra.ru/get-zen_doc/1908497/pub_601d0062a34fdb6f584eb06b_6053c26753791e021bc73229/scale_1200"
    },
    {
        _id: "67rdca3eeb7f6fgeed471802",
        name: "Белка Обыкновенная",
        category: categories.animals,
        price: 13000,
        quantity: 30,
        image: "https://funart.pro/uploads/posts/2021-04/1618144219_47-p-teleutka-zhivotnie-krasivo-foto-53.jpg"
    },
    {
        _id: "67rdca3eeb7f6fgeed471803",
        name: "Мерседес Гелендваген",
        category: categories.autos,
        price: 15000000,
        quantity: 3,
        image: "https://octane.club/upload/iblock/0e5/0e5c677a5193364213e02be3e7c836a1.jpg"
    },
    {
        _id: "67rdca3eeb7f6fgeed471804",
        name: "БМВ X7",
        category: categories.autos,
        price: 12000000,
        quantity: 5,
        image: "https://static.tildacdn.com/tild3062-6238-4061-b634-386133356264/X7-1.jpg"
    },
    {
        _id: "67rdca3eeb7f6fgeed471805",
        name: "IPhone 14",
        category: categories.electronics,
        price: 150000,
        quantity: 8,
        image: "https://www.superplanshet.ru/images/iPhone_14_Pro_7115a2.jpg"
    },
    {
        _id: "67rdca3eeb7f6fgeed471806",
        name: "Samsung S23",
        category: categories.electronics,
        price: 110000,
        quantity: 10,
        image: "https://www.sammyfans.com/wp-content/uploads/2022/07/Samsung-Galaxy-S23-Ultra-Bora-Purple-Unboxing-2.jpg"
    },
    {
        _id: "67rdca3eeb7f6fgeed471807",
        name: "Роза Чайная",
        category: categories.plants,
        price: 1500,
        quantity: 50,
        image: "https://mykaleidoscope.ru/uploads/posts/2021-10/1635273021_20-mykaleidoscope-ru-p-chainaya-kustovaya-roza-tsveti-25.jpg"
    },
    {
        _id: "67rdca3eeb7f6fgeed471808",
        name: "Ель Голубая",
        category: categories.plants,
        price: 30000,
        quantity: 15,
        image: "https://pro-dachnikov.com/uploads/posts/2021-11/1637279365_63-pro-dachnikov-com-p-yel-khupsi-v-landshafte-foto-64.jpg"
    }
];

if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(products));
}

const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(JSON.parse(localStorage.getItem("products")));
        }, 2000);
    });
const update = (id, data) =>
    new Promise((resolve) => {
        const products = JSON.parse(localStorage.getItem("products"));
        const productIndex = products.findIndex((u) => u._id === id);
        products[productIndex] = { ...products[productIndex], ...data };
        localStorage.setItem("products", JSON.stringify(products));
        resolve(products[productIndex]);
    });

const getById = (id) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(
                JSON.parse(localStorage.getItem("products")).find(
                    (product) => product._id === id
                )
            );
        }, 1000);
    });
export default {
    fetchAll,
    getById,
    update
};
