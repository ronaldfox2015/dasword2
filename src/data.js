window.computeUsersStats = (users, progress, courses) => {
  listProgress.setProgres(progress)
  for (var intro in courses) {
      listProgress.setIdCourse(intro)
  }
  const allUsers = users.map(usersWithStats => {
      listProgress.setUserId(usersWithStats.id)
      usersWithStats.stats = {
          percent: listProgress.getIntroById(usersWithStats.id).percent,
          exercises: listProgress.getExersicesById(usersWithStats.id),
          reads: listProgress.getReadsById(usersWithStats.id),
          quizzes: listProgress.getQuizzesById(usersWithStats.id),
      };
      return usersWithStats
  });
  sortUsers(allUsers, 'stats.exercises.total', 'desc')
  console.log(allUsers)
  return allUsers;
};
window.sortUsers = (users, orderBy, orderDireccion) => {
  listUser.setUsers(users)
  if (orderBy == 'stats.percent') {
      var res = orderBy.split(".");

      listUser.sort(res[1], orderDireccion, 2)

  }else if(orderBy == 'stats.exercises.total' ||
      orderBy == 'stats.exercises.completed' ||
      orderBy == 'stats.exercises.percent') {
        var res = orderBy.split(".");
      listUser.sort(res[2], orderDireccion, 3)
  }else if(orderBy == 'stats.reads.total' ||
      orderBy == 'stats.reads.completed' ||
      orderBy == 'stats.reads.percent') {
        var res = orderBy.split(".");
      listUser.sort(res[2], orderDireccion, 4)
  }else if(orderBy == 'stats.quizzes.total' ||
      orderBy == 'stats.quizzes.completed' ||
      orderBy == 'stats.quizzes.percent') {
        var res = orderBy.split(".");

      listUser.sort(res[2], orderDireccion, 5)
  } else {
      listUser.sort(orderBy, orderDireccion)

  }
  // este ordena solo nombres

  // este ordena stats
  // listUser.sortStats('percent','asc')   
}

window.filterUsers = (users, search) => {
    let lista =[];
    let result =  users.find(function (user) { 
            
            return user.name.search(search)+1
     });
     lista.push(result)
     return lista;
}