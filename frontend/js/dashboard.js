console.log("Carregou o Dashboard");

const systemName = "Sistema de Controle de Manuteção";

let activeEquipaments = 48;
let manutenceEquipaments = 5;
// let preventiveMaintenance = 10;

console.log("Nome do Sistema ",systemName);
console.info("Em Manutenção ",manutenceEquipaments);

const equipaments = [
    {id:1,
    name: "Compressor",
    local: "Oficina",
    status: "active",
    patriminy: "12-PP"
},{id:2,
    name: "Gerador",
    local: "Casa de Máquina",
    status: "Oficina",
    patriminy: "65-PP"
},{id:3,
    name: "Torno",
    local: "Oficina",
    status: "Oficina",
    patriminy: "1-PP"
},{id:4,
    name: "teste",
    local: "teste",
    status: "Oficina",
    patriminy: "1-PP"
}];

console.table(equipaments);
console.log(equipaments[0].name);

const activeTotal = document.querySelector("#activesTotal");
const preventiveTotal = document.querySelector("preventiveTotal");
const equipamentsTable = document.querySelector("#equipamentsTable");
const searchInput = document.getElementById("searchInput")
const btnNewEquipament = document.getElementById("btnNewEquipament")


console.log("activeTotal: ",activeTotal.textContent)

function dashboardRefresh() {
    const actives = equipaments.filter(equipament => equipament.status === "active").length;
    
    const inMaintence = equipaments.filter(equipament => equipament.status === "maintence").length;

    activeTotal.textContent = actives;
    maintenceEquipamentsTotal.textContent = inMaintence;

    console.log("Dashboard Atualizado!")
}
activeTotal.textContent = activeEquipaments;

dashboardRefresh();

function equipamentsTableRender(list) {
    equipamentsTable.innerHTML = "";

    list.forEach(equipament => {

        const row = document.createElement("tr");

        row.innerHTML = `<td>${equipament.name}</td>
        <td>${equipament.local}</td>
        <td>${equipament.status}</td>`

        equipamentsTable.appendChild(row);
        
    });
    
}

equipamentsTableRender(equipaments);

searchInput.addEventListener("input", function (){
    const term = searchInput.value.toLowerCase();

    const result = equipaments.filter(equipaments =>
        equipaments.name.toLowerCase().includes(term));

    equipamentsTableRender(result);    
});

btnNewEquipament.addEventListener("click", function(){

})

