function makeFriendsList(friends) {
  let result = document.createElement('ul');

  for (const friend of friends) {
    const { firstName, lastName } = friend;
    result.insertAdjacentHTML('beforeend', `<li>${firstName} ${lastName}</li>`);
  }

  return result;
}