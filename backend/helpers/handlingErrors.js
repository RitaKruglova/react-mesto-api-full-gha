module.exports.handleThen = (data, res, status = 200) => {
  if (data === null) {
    res.status(404).send({ messege: 'Объект не найден' });
  } else {
    res.set({
      'Content-Security-Policy': 'default-src "self"',
    }).status(status).send({ data });
  }
};
