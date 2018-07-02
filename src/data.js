window.computeUsersStats = (users,progress,courses)=>{
  listProgress.setProgres(progress)
  for (var intro in courses) { 
    listProgress.setIdCourse(intro)
  }
  const allUsers= users.map(usersWithStats => {

    usersWithStats.stats = {
      percent : listProgress.getIntroById(usersWithStats.id).percent,
      exercises : listProgress.getExersicesById(usersWithStats.id),
      reads: listProgress.getReadsById(usersWithStats.id),
      quizzes: listProgress.getQuizzesById(usersWithStats.id),
    };
    return usersWithStats
  });
  sortUsers(allUsers,'name','desc')
  console.log(allUsers)
  return allUsers;
};
window.sortUsers=(users,orderBy,orderDireccion)=>{
listUser.setUsers(users)

// este ordena solo nombres
listUser.sort(orderBy,orderDireccion)
// este ordena stats
// listUser.sortStats('percent','asc')   
}

window.filterUsers=(users, search) =>{

}
