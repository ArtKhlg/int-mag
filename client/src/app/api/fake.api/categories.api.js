const categories = [
    {
        id: "1001",
        name: "Автомобили",
        type: {
            passengerCars: { id: "1001-1", name: "Легковые" },
            trucks: { id: "1001-2", name: "Грузовые" }
        }
    },
    {
        id: "1002",
        name: "Животные",
        type: {
            home: { id: "1002-1", name: "Домашние" },
            birds: { id: "1002-2", name: "Птицы" },
            wild: { id: "1002-3", name: "Животные/Дикие" }
        }
    },
    {
        id: "1003",
        name: "Электроника",
        type: {
            phones: { id: "1003-1", name: "Телефоны" },
            tv: { id: "1003-2", name: "Телевизоры" }
        }
    },
    {
        id: "1004",
        name: "Растения",
        type: {
            trees: { id: "1004-1", name: "Деревья" },
            flowers: { id: "1004-2", name: "Цветы" }
        }
    }
];

const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(categories);
        }, 2000);
    });
export default {
    fetchAll
};
