const urlCohort = "../data/cohorts.json"
const urlUser = "../data/cohorts/lim-2018-03-pre-core-pw/users.json"
const urlProgress = "../data/cohorts/lim-2018-03-pre-core-pw/progress.json"
//funcion para obtener datos json
const ServiceApiRequest =(url,callback)=>{
  const xhr = new XMLHttpRequest();
     xhr.open("GET", url);
     xhr.onload = callback;
     xhr.send(); 
}

const getCohortsUsers = () => {
  return JSON.parse(event.target.responseText);
}
const getProgress = () => {
  let data3 = JSON.parse(event.target.responseText);
     return data3
}

const listCohort = {
  cohorts :{},
  setCohort:(cohorts)=>{
    listCohort.cohorts = cohorts
  },
  getCohorts:()=>{
    return listCohort.cohorts
  },
  getCourses:(id)=>{
    let cohortObj = {};
    let courses = listCohort.cohorts.map(cohort => {
      if(cohort.id == id){
        cohortObj = cohort.coursesIndex
      }
    })
    return cohortObj
  }
}

const listUser = {
  users : {},
  setUsers:(list)=>{
    listUser.users = list
  },
  getUsers:()=>{
    return listUser.users
  },
  sortStats:(OrderBy,OrderDirection)=>{
    listUser.users.sort(function (a, b) {
      let labelOne = a.stats[OrderBy]
      let labelTwo = b.stats[OrderBy]
      let nombre1 = labelOne
      let nombre2 = labelTwo
      if(OrderDirection == 'asc'){
        if (nombre1 > nombre2) {
          return 1;
        }
        if (nombre1 <  nombre2) {
          return -1;
        } 
      }
      if(OrderDirection=='desc'){
        if (nombre1 < nombre2) {
          return 1;
        }
        if (nombre1 >  nombre2) {
          return -1;
        } 
      }
  });
  },
  exercisesExercises:(OrderBy,OrderDirection)=>{
    listUser.users.sort(function (a, b) {
      let labelOne = a.stats.exercises[OrderBy]
      let labelTwo = b.stats.exercises[OrderBy]
      let nombre1 = labelOne
      let nombre2 = labelTwo
      if(OrderDirection == 'asc'){
        if (nombre1 > nombre2) {
          return 1;
        }
        if (nombre1 <  nombre2) {
          return -1;
        } 
      }
      if(OrderDirection=='desc'){
        if (nombre1 < nombre2) {
          return 1;
        }
        if (nombre1 >  nombre2) {
          return -1;
        } 
      }
  });
  },
  sortAtribu:(atribu,OrderBy,OrderDirection)=>{


    return 0
  },
  sort:(OrderBy,OrderDirection,level = 1)=>{
    listUser.users.sort(function (a, b) {     
      let nombre1 = ''
        let nombre2 = ''
      if(level == 1){
        let labelOne = a[OrderBy]
        let labelTwo = b[OrderBy]
        nombre1 = labelOne.toLowerCase()
        nombre2 = labelTwo.toLowerCase()
        
      }
      if(level == 2){
        nombre1 = a.stats[OrderBy]
        nombre2 = b.stats[OrderBy]
      }

      if(level == 3){
        nombre1 = a.stats.exercises
        if(a["stats"]["exercises"]){
          nombre1 = a["stats"]["exercises"]
        }

        if(b["stats"]["exercises"]){
          nombre2 = b['stats']['exercises'][OrderBy]
        }
        

        
      }

      if(level == 4){
        nombre1 = a.stats.reads[OrderBy]
        nombre2 = b.stats.reads[OrderBy]
      }

      if(level == 5){
        nombre1 = a.stats.quizzes[OrderBy]
        nombre2 = b.stats.quizzes[OrderBy]
      }

      if(OrderDirection == 'asc'){
        if (nombre1 > nombre2) {
          return 1;
        }
        if (nombre1 <  nombre2) {
          return -1;
        } 
      }
      if(OrderDirection=='desc'){
        if (nombre1 < nombre2) {
          return 1;
        }
        if (nombre1 >  nombre2) {
          return -1;
        } 
      }


    })
  },
  asc:(nombre1,nombre2)=>{
    if (nombre1 > nombre2) {
      return 1;
    }
    if (nombre1 <  nombre2) {
      return -1;
    } 
  },
  desc:(nombre1,nombre2)=>{
    if (nombre1 < nombre2) {
      return 1;
    }
    if (nombre1 >  nombre2) {
      return -1;
    }
  }
}

const listProgress = {
  progress : {},
  idCourse:0,
  userId:0,
  setUserId:(userId)=>{
    listProgress.userId = userId
  },
  getUserId:()=>{
    return listProgress.userId
  },
  setProgres:(progress)=>{
    listProgress.progress = new Object(progress);
    
  },
  getProgress:()=>{
    return listProgress.progress;
  },
  setIdCourse:(id)=>{
      listProgress.idCourse = id
  },
  getIntroById:(id)=>{
    if (typeof listProgress.progress[id][listProgress.idCourse] !== "undefined"){
      return listProgress.progress[id].intro;
    }
    return {};
  },
  getParts:(id)=>{
    const intro = listProgress.getIntroById(id)
    const listado = [];
    if(intro){
      if(intro.units){
        for (var i in intro.units) {          
          if(intro.units[i].parts){
            listado.push(intro.units[i].parts)
          }
        }
      }
    }
    return listado
  },
  countElement:(list,value)=>{
    let count = 0
    for (let item in list) {
        if(list[item][value]){
            count++
        }
    }
    return count
  },
  getExersicesById:(id)=>{
    const object= {}
    const objectExercises = listProgress.getParts(id).map(parts => {
    const atribExercises = parts['06-exercises'];
      if(atribExercises){
        object.exercises = {
          total : Object.keys(atribExercises.exercises).length,
          completed : listProgress.countElement(atribExercises.exercises,'completed'),
          percent: (Math.round(listProgress.countElement(atribExercises.exercises,'completed')/Object.keys(atribExercises.exercises).length))*100
        };
        return parts.object
      }  
      return {
        total:0,
        completed:0,
        percent:0
      }   
    })
    return object.exercises
  },
  division:(numerador,denominador)=>{
    let total = 0
    if(numerador !== 0 && denominador !== 0){
        total = numerador / denominador
    }
    return total
  },
  getReadsById:(id)=>{
    let contadorTotalReads = 0;
    let contadorCompletedReads = 0;
    const parts = listProgress.getParts(id);
    for (let elemOfParts in parts) {
        for (let atribOfPart in parts[elemOfParts]) {
            if (parts[elemOfParts][atribOfPart].type === "read") {
              contadorTotalReads++;
              if (parts[elemOfParts][atribOfPart].completed === 1){
                contadorCompletedReads++;
              }
            }
         }
    }  
    const reads = new Object ();
    reads.total = contadorTotalReads;
    reads.completed = contadorCompletedReads;
    reads.percent = Math.round((contadorCompletedReads/contadorTotalReads)*100)
  return reads;
  },
  getQuizzesById:(id)=>{
    let totalQuizzes = 0;
    let completedQuizzes = 0;
    let scoreSumQuizzes = 0;
    const parts = listProgress.getParts(id).map(part => {
      for (let atribOfPart in part) {
        if(part[atribOfPart].type ==='quiz'){
          totalQuizzes++;
          if (part[atribOfPart].completed === 1){
            completedQuizzes++;               
            } 
            if((part[atribOfPart]).hasOwnProperty("score")){
              scoreSumQuizzes += part[atribOfPart].score;
            }       
        }
      }
    })    
    const quizzes = new Object ();
    quizzes.total = totalQuizzes;
    quizzes.completed = completedQuizzes;
    quizzes.percent = Math.round( listProgress.division(completedQuizzes,totalQuizzes)*100);
    quizzes.scoreSum = scoreSumQuizzes;
    quizzes.scoreAvg = Math.round(listProgress.division(scoreSumQuizzes,completedQuizzes));
   return quizzes;
  }
}