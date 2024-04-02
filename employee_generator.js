
// Example dtoIn
const dtoIn = {
  count: 5,
  age: {min: 18, max: 65}
};
const firstNameMale = ["Jaroslav", "Vladimír", "Petr", "Tomáš", "Lukáš", "Martin", "Michal", "Jakub", "Pavel", "Josef", "František", "Jiří", "David", "Miroslav", "Václav", "Karel", "Robert", "Zdeněk", "Radek", "Vladimír", "Milan", "Ondřej", "Aleš", "Patrik", "Vojtěch", "Štěpán", "Filip", "Marek", "Adam", "Richard", "Daniel", "Petr", "Jiří", "Josef", "Jan", "Martin", "Lukáš", "Michal", "Jakub", "Tomáš", "Miroslav", "David", "Karel", "Václav", "Robert", "Pavel", "Ondřej", "Jan",];
const lastNameMale = ["Němec", "Marek", "Pospíšil", "Pražák", "Svoboda", "Kocábek", "Hynek", "Komárek", "Horák", "Novák", "Svoboda", "Novotný", "Hájek", "Král", "Růžička", "Beneš", "Fiala", "Sedláček", "Kříž", "Jelínek", "Kolář", "Vaněk", "Šimek", "Bartoš", "Konečný", "Holub", "Matějka", "Urban", "Blažek", "Hlaváček", "Novák", "Svoboda", "Novotný", "Dvořák", "Černý", "Procházka", "Kučera", "Veselý", "Horák", "Němec", "Marek", "Pospíšil", "Hájek", "Král", "Růžička", "Beneš", "Fiala", "Sedláček", "Kříž", "Jelínek"];
const firstNameFemale = ["Kamila", "Petra", "Martina", "Hana", "Alena", "Jana", "Jitka", "Eva", "Lucie", "Anna", "Gaetana", "Karolína", "Ivana", "Marta", "Zuzana", "Veronika", "Tereza", "Michaela", "Barbora", "Markéta", "Simona", "Nela", "Kateřina", "Šárka", "Jitka", "Nikola", "Monika", "Kristýna", "Lada", "Kamila", "Věra", "Jarmila", "Libuše", "Dana", "Iveta", "Renata", "Jindra", "Linda", "Radka", "Aneta", "Romana", "Lenka", "Karolína", "Alena", "Marta", "Zuzana", "Veronika", "Tereza", "Michaela"];
const lastNameFemale = ["Procházková", "Pražáková", "Tichá", "Karousková", "Zemanová", "Suchá", "Dlouhá", "Veselá", "Fagone", "Němcová", "Marková", "Pospíšilová", "Hájková", "Králová", "Růžičková", "Benešová", "Fialová", "Sedláčková", "Křížová", "Jelínková", "Kolářová", "Vaněková", "Šimková", "Bartošová", "Konečná", "Holubová", "Matějková", "Urbanová", "Blažková", "Hlaváčková", "Nováková", "Svobodová", "Novotná", "Dvořáková", "Černá", "Procházková", "Kučerová", "Veselá", "Horáková", "Němcová", "Marková", "Pospíšilová", "Hájková", "Králová", "Růžičková", "Benešová", "Fialová", "Sedláčková", "Křížová", "Jelínková"];




function getAge(birth){
  const birthDate = new Date(birth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())){
    age--;
  }
  return age;
}

function getMedianAge(ages) {
  ages.sort((a, b) => a - b);
  const mid = Math.floor(ages.length / 2);
  return ages.length % 2 !== 0 ? ages[mid] : (ages[mid - 1] + ages[mid]) / 2;
}

function getWorkloadCounts(employees) {
  const workloads = {
    workload10: 0,
    workload20: 0,
    workload30: 0,
    workload40: 0 };
  // Iterace přes zaměstnance a inkrementace příslušného klíče
  employees.forEach(emp => {
    if(workloads.hasOwnProperty(`workload${emp.workload}`)) {
      workloads[`workload${emp.workload}`]++;
    }
  });
  return workloads;
}

function getMedianWorkload(workloads) {
  const sortedWorkloads = workloads.slice().sort((a, b) => a - b);
  return getMedianAge(sortedWorkloads); // Použijeme již existující funkci pro výpočet mediánu
}

function getAverageWorkloadForWomen(employees) {
  const femaleWorkloads = employees.filter(emp => emp.gender === 'female').map(emp => emp.workload);
  if (femaleWorkloads.length === 0) return 0;
  const average = femaleWorkloads.reduce((acc, wl) => acc + wl, 0) / femaleWorkloads.length;
  return Number(average.toFixed(1));
}

function getRandomBirthdate(minAge, maxAge) {
  const currentYear = new Date().getFullYear();
  const year = currentYear - Math.floor(Math.random() * (maxAge - minAge + 1)) - minAge;
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1;
  return new Date(year, month - 1, day).toISOString();
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomWorkload() {
  const workloads = [10, 20, 30, 40];
  return getRandomElement(workloads);
}

function getEmployeeStatistics(employees) {
  const ages = employees.map(emp => getAge(emp.birthdate));
  //const totalWorkload = employees.reduce((acc, emp) => acc + emp.workload, 0);
  const workloads = employees.map(emp => emp.workload);

  const statistics = {
    total: employees.length,
    workloadsCounts: getWorkloadCounts(employees),
    averageAge: ages.reduce((acc, age) => acc + age, 0) / employees.length,
    minAge: Math.min(...ages),
    maxAge: Math.max(...ages),
    medianAge: getMedianAge(ages),
    medianWorkload: getMedianWorkload(workloads),
    //averageWorkload: totalWorkload / employees.length,
    averageWomenWorkload: getAverageWorkloadForWomen(employees)
  };
  console.log(typeof statistics + "--------")

  // Seřazení zaměstnanců podle úvazku od nejmenšího po největší
  employees.sort((a, b) => a.workload - b.workload);

  return statistics;
}

function main(dtoIn) {
  const dtoOut = [];
  let gender = '';

  for (let i = 0; i < dtoIn.count; i++) {
    if (Math.random() > 0.5) {
      gender = 'male';
    } else {
      gender = 'female';
    }
    if (gender === 'male') {
      firstName = getRandomElement(firstNameMale);
      lastName = getRandomElement(lastNameMale);
    } else{
      firstName = getRandomElement(firstNameFemale);
      lastName = getRandomElement(lastNameFemale);
    }
    const birthdate = getRandomBirthdate(dtoIn.age.min, dtoIn.age.max);
    const workload = getRandomWorkload();

    dtoOut.push({gender, birthdate, firstName, lastName, workload});
  }

  const statistics = getEmployeeStatistics(dtoOut);

  return{
    statistics: statistics,
    sortedByWorkload: dtoOut
  };
}


//const colors = require('colors');
//console.log(colors.blue(JSON.stringify(main(dtoIn), null, 2)));
console.log((main(dtoIn)));