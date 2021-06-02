function namify(users) {
  if (users && users.length) {
    let result = [];

    for (const user of users) {
      result.push(user.name);
    }
    return result;
  }
}