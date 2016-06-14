import DataLoader from 'dataloader';

export default function createEntityLoader(Model) {
  return new DataLoader(ids => new Promise((resolve, reject) => {
    Model
      .findAll({ where: { id: ids } })
      .then((rows) => {
        resolve(ids.map((id) =>
          rows.find((row) => row.id === id) || new Error(`Row not found ${id}`)
        ));
      })
      .catch((error) => {
        reject(error);
      });
  }));
}
