const persons = [
    {name: "stephen"},
    {name: "suvi"},
    {name: "monchi"},
    {name: "joseph"},
];

const filtered = persons.filter((person) => {
    return person["name"].includes("stephen");
});

console.log(filtered);